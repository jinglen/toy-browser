import * as css from 'css'
import { getSpecificity, isGreaterOrEqual } from './Specificity'
/**
 css 模块没有符合 typeScript 要求的 lib.d.ts
 故使用 js
 */

function splitSlector(text) {
  return text.split(' ').map((c) => c.split(/(?=[.#])/))
}

export function parseCssRules(text) {
  const rules = css
    .parse(text)
    .stylesheet.rules.map((c) => {
      return {
        selectors: c.selectors,
        declarations: c.declarations.map(({ property, value }) => ({
          property,
          value,
        })),
      }
    })
    .reduce((prev, c) => {
      const items = c.selectors.map((selector) => {
        const selectorItems = splitSlector(selector)

        return {
          selector,
          selectorItems,
          specificity: getSpecificity(selectorItems.flat()),
          declarations: c.declarations,
        }
      })
      prev.push(...items)

      return prev
    }, [])
  return rules
}

export function creatTagSelectors(tag) {
  const selectors = []
  selectors.push(tag.tagName)
  const className = tag.attrbutes.class
  if (className) {
    const classItems = className
      .trim()
      .split(/[ ]+/)
      .map((c) => `.${c}`)
    selectors.push(...classItems)
  }

  const { id } = tag.attrbutes
  if (id) {
    selectors.push(`#${id}`)
  }

  return selectors
}

function isMatchSelector(must, own) {
  return must.every((c) => own.includes(c))
}

function isMatchCss(nodeSelector, parentSelectors, selectorItems) {
  // 此段实现很糟糕
  const items = selectorItems.slice()
  const first = items.pop()
  const isMatchNode = isMatchSelector(first, nodeSelector)
  if (isMatchNode) {
    if (items.length === 0) {
      return true
    } else {
      const nodes = parentSelectors.slice().reverse()
      let current = items.pop()
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i]
        if (isMatchSelector(current, node)) {
          if (items.length === 0) {
            return true
          } else {
            current = items.pop()
          }
        }
      }
      return false
    }
  } else {
    return false
  }
}

function compute(rules) {
  const style = {}
  const styleSpecificity = {}
  rules.forEach((rule) => {
    const { specificity, declarations } = rule
    declarations.forEach(({ property, value }) => {
      if (style[property]) {
        if (isGreaterOrEqual(specificity, styleSpecificity[property])) {
          style[property] = value
          styleSpecificity[property] = specificity
        } else {
          // do nothing
        }
      } else {
        style[property] = value
        styleSpecificity[property] = specificity
      }
    })
  })

  return style
}

export function bindCssRules(rules, token, parents) {
  const parentSelectors = parents.map((c) => c.selectors)
  rules.forEach((rule) => {
    if (isMatchCss(token.selectors, parentSelectors, rule.selectorItems)) {
      token.relatedCssRules.push(rule)
    }
  }, [])

  // eslint-disable-next-line no-param-reassign
  token.computedStyle = compute(token.relatedCssRules)
}
