/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { isASCIIAlpha, isUpper, isSpace, isEOF } from './util'
import TagCreater from './TagCreater'

type Word = string

export default function createStateMachine(emit: any) {
  let tagCreater = new TagCreater()

  function data(char: Word) {
    if (char === '<') {
      return tagOpen
    } else if (isEOF(char)) {
      emit({ type: 'EOF' })
    } else if (char === '\u0000') {
      // throw new Error('parse error')
      return data
    } else {
      emit({
        type: 'text',
        char,
      })
      return data
    }
  }

  function tagOpen(char: Word) {
    if (char === '/') {
      return endTagOpen
    } else if (isASCIIAlpha(char)) {
      tagCreater = new TagCreater('start')
      return tagName(char)
    } else {
      // throw new Error('parse error')
      return data
    }
  }

  function endTagOpen(char: Word) {
    if (isASCIIAlpha(char)) {
      tagCreater = new TagCreater('end')
      return tagName(char)
    } else if (char === '>') {
      // throw new Error('parse error')
      return data
    } else if (isEOF(char)) {
      emit({ type: 'EOF' })
      return data
    } else {
      // throw new Error('parse error')
      return data
    }
  }

  function tagName(char: Word) {
    if (isSpace(char)) {
      return beforeAttrName
    } else if (char === '/') {
      return selfClosingStartTag
    } else if (char === '>') {
      emit(tagCreater.create())
      return data
    } else if (isUpper(char)) {
      tagCreater.tagName(char.toLowerCase())
      return tagName
    } else if (isEOF(char)) {
      emit({ type: 'EOF' })
      return data
    } else {
      tagCreater.tagName(char)
      return tagName
    }
  }

  function selfClosingStartTag(char: Word) {
    if (char === '>') {
      tagCreater.selfClosing()
      emit(tagCreater.create())
      return data
    } else if (isEOF(char)) {
      emit({ type: 'EOF' })
    } else {
      throw new Error('parse error')
    }
  }

  function beforeAttrName(char: Word) {
    if (isSpace(char)) {
      return beforeAttrName
    } else if (char === '/' || char === '>' || isEOF(char)) {
      return afterAttrName(char)
    } else if (char === '=') {
      throw new Error('parse error')
    } else {
      tagCreater.createAttr()
      return attrName(char)
    }
  }

  function attrName(char: Word) {
    if (isSpace(char) || char === '/' || char === '>' || isEOF(char)) {
      return afterAttrName(char)
    } else if (char === '=') {
      return beforeAttrValue
    } else if (isUpper(char)) {
      tagCreater.attrName(char.toLowerCase())
      return attrName
    } else if (['"', "'", '<', '\u0000'].includes(char)) {
      // throw new Error('parse error')
      return data
    } else {
      tagCreater.attrName(char)
      return attrName
    }
  }

  function afterAttrName(char: Word): any {
    if (isSpace(char)) {
      return afterAttrName
    } else if (char === '/') {
      return selfClosingStartTag
    } else if (char === '=') {
      return beforeAttrValue
    } else if (char === '>') {
      emit(tagCreater.create())
      return data
    } else if (isEOF(char)) {
      emit({ type: 'EOF' })
      return data
    } else {
      tagCreater.createAttr()
      return attrName(char)
    }
  }

  function beforeAttrValue(char: Word) {
    if (isSpace(char)) {
      return beforeAttrValue
    } else if (char === '"') {
      return doubleAttrValue
    } else if (char === "'") {
      return singleAttrValue
    } else if (char === '>') {
      // throw new Error('parse error')
      return data
    } else {
      return unquotedAttrValue(char)
    }
  }

  function doubleAttrValue(char: Word) {
    if (char === '"') {
      return afterAttrValue
      // } else if (char === '&') {
      //   return charRefrence // 转义，暂不实现
      // } else if (char === '\u0000') {
      // throw new Error('parse error')
    } else if (isEOF(char)) {
      emit({ type: 'EOF' })
      return data
    } else {
      tagCreater.attrValue(char)
      return doubleAttrValue
    }
  }

  function singleAttrValue(char: Word) {
    if (char === "'") {
      return afterAttrValue
      // } else if (char === '&') {
      //   return charRefrence // 转义，暂不实现
      // } else if (char === '\u0000') {
      // throw new Error('parse error')
    } else if (isEOF(char)) {
      emit({ type: 'EOF' })
      return data
    } else {
      tagCreater.attrValue(char)
      return singleAttrValue
    }
  }

  function unquotedAttrValue(char: Word) {
    if (isSpace(char)) {
      return beforeAttrName
      // } else if (char === '&') {
      //   return charRefrence // 转义，暂不实现
      // } else if (char === '\u0000') {
      // throw new Error('parse error')
    } else if (char === '>') {
      emit(tagCreater.create())
      return data
    } else if (isEOF(char)) {
      emit({ type: 'EOF' })
      return data
    } else if (['"', "'", '<', '=', '`'].includes(char)) {
      // throw new Error('parse error')
      return data
    } else {
      tagCreater.attrValue(char)
      return unquotedAttrValue
    }
  }

  function afterAttrValue(char: Word) {
    if (isSpace(char)) {
      return beforeAttrName
    } else if (char === '/') {
      return selfClosingStartTag
    } else if (char === '>') {
      emit(tagCreater.create())
      return data
    } else if (isEOF(char)) {
      emit({ type: 'EOF' })
      return data
    } else {
      // throw new Error('parse error')
      return beforeAttrName(char)
    }
  }

  return data
}
