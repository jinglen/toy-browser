// import { exmapleHtml } from '../data'

import createStateMachine from './createStateMachine'
import { parseCssRules, creatTagSelectors, bindCssRules } from '../computeCss'

/**
 * 尝试通过 emit(type, char) 仅发送单个字符，
 * 由emit方法拼接字符串和生成节点
 * 并不实用，增加了一层中间状态，增加理解成本
 *
 *  数据表示状态机？
 * [{
 *    data: [
 *       { name: 'text-end', cond: c => c === '<', end: tagOpen  },
 *       { name: 'text', cond: else, end: data }
 *    ],
 *    tagOpen: [
 *       { name: '...', cond: c => c === '\', end: 'text',  },
 *       { name: 'new-tag', cond: isTagName, end: tagName, reconsume: true }
 *    ]
 * }]
 */

import { lastItem } from './util'

function createEmit(stack: any[]) {
  const cssRules: any[] = []
  let currentTextNode: any = null

  return function emit(token: any) {
    const top = lastItem(stack)
    if (token.type === 'text') {
      if (currentTextNode === null) {
        currentTextNode = {
          type: 'text',
          content: '',
        }
        top.children.push(currentTextNode)
      }
      currentTextNode.content += token.char
    } else if (token.type === 'element') {
      currentTextNode = null
      if (token.tagType === 'start' || token.tagType === 'selfClosing') {
        // eslint-disable-next-line no-param-reassign
        token.selectors = creatTagSelectors(token)
        bindCssRules(cssRules, token, stack.slice(1))

        top.children.push(token)
        if (token.tagType === 'start') {
          stack.push(token)
        }
      } else if (token.tagType === 'end') {
        if (top.tagName === token.tagName) {
          if (token.tagName === 'style') {
            cssRules.push(...parseCssRules(top.children[0].content))
          }
          stack.pop()
        } else {
          throw new Error(`lose end tag ${top.tagName}`)
        }
      } else {
        // 未归类
      }
    } else {
      currentTextNode = null
    }
  }
}

export { trimDOMTree } from './util'

export default function parseHtml(html: string): any {
  const stack = [{ type: 'document', children: [] }]
  const emit = createEmit(stack)
  let state: any = createStateMachine(emit)
  // eslint-disable-next-line no-restricted-syntax
  for (const char of html) {
    state = state(char)
  }

  state('EOF')
  return stack[0]
}
