export default class TagCreater {
  tag = ''

  attrs: any[] = []

  currentAttr: any

  tagType: string

  constructor(tagType: string = 'start') {
    this.tagType = tagType
  }

  tagName(char: string) {
    this.tag += char
  }

  createAttr() {
    this.currentAttr = { name: '', value: '' }
    this.attrs.push(this.currentAttr)
  }

  attrName(char: string) {
    this.currentAttr.name += char
  }

  attrValue(char: string) {
    this.currentAttr.value += char
  }

  selfClosing() {
    this.tagType = 'selfClosing'
  }

  create() {
    return {
      type: 'element',
      tagType: this.tagType,
      tagName: this.tag,
      selectors: null,
      relatedCssRules: [],
      attrbutes: this.attrs.reduce(
        (prev, c) => ({
          ...prev,
          [c.name]: c.value,
        }),
        {}
      ),
      children: [],
      // parent: null,
    }
  }
}
