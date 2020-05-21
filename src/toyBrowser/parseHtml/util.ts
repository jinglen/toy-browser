type CheckChar = (char: string) => boolean

export const lastItem = (array: any[]) => array[array.length - 1]

export const isASCIIAlpha: CheckChar = (char) => /^[A-Za-z]$/.test(char)

export const isUpper: CheckChar = (char) => /^[A-Z]$/.test(char)

export const isSpace: CheckChar = (char) => /^[\n\t\f ]$/.test(char)

export const isEOF: CheckChar = (char) => char === 'EOF'

const isAllSpace: CheckChar = (char) => /^[\n\t\f ]*$/.test(char)
export function trimDOMTree(tree: any): any {
  // 注意没有深克隆原对象
  const children = []

  // eslint-disable-next-line no-restricted-syntax
  for (const node of tree.children) {
    if (node.type === 'element') {
      children.push(trimDOMTree(node))
    } else if (node.type === 'text') {
      if (!isAllSpace(node.content)) {
        children.push(node)
      }
    }
  }
  return {
    ...tree,
    children,
  }
}
