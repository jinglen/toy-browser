/* eslint-disable no-param-reassign */
type Spec = number[]

export function getSpecificity(selectors: string[]): Spec {
  return selectors.reduce(
    (prev, c) => {
      if (c.startsWith('#')) {
        prev[2] += 1
      } else if (c.startsWith('.')) {
        prev[1] += 1
      } else {
        prev[0] += 1
      }

      return prev
    },
    [0, 0, 0, 0]
  )
}

export function isGreaterOrEqual(a: Spec, b: Spec): boolean {
  for (let i = 3; i >= 0; i -= 1) {
    if (a[i] > b[i]) {
      return true
    } else if (a[i] < b[i]) {
      return false
    }
  }
  return true // 所有均相等
}
