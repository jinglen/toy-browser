import G6 from '@antv/g6'

const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
  return [
    ['M', x, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x + 2, y],
    ['L', x + 2 * r - 2, y],
  ]
}
const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [
    ['M', x, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x + 2, y],
    ['L', x + 2 * r - 2, y],
    ['M', x + r, y - r + 2],
    ['L', x + r, y + r - 2],
  ]
}

G6.registerNode(
  'tree-node',
  {
    drawShape: function drawShape(cfg, group) {
      const rect = group.addShape('rect', {
        attrs: {
          fill: '#ffadd2',
          stroke: '#ffadd2',
          width: 80,
        },
        name: 'rect-shape',
      })
      // const content = cfg.name.replace(/(.{19})/g, '$1\n')
      let content
      let noStyleContent
      if (cfg.computedStyle) {
        const styleItems = Object.entries(cfg.computedStyle)
        content = `${cfg.name}${
          styleItems.length
            ? styleItems.reduce((prev, c) => {
                return `${prev}\n${c[0]}:${c[1]}`
              }, '')
            : ''
        }`

        noStyleContent = `${cfg.name}${
          styleItems.length ? styleItems.reduce((prev) => `${prev}\n`, '') : ''
        }`
      } else {
        content = cfg.name
        noStyleContent = content
      }

      const text = group.addShape('text', {
        attrs: {
          text: content,
          x: 0,
          y: 0,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: '#c41d7f',
        },
        name: 'rect-shape',
      })
      group.addShape('text', {
        attrs: {
          text: noStyleContent,
          x: 0,
          y: 0,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: '#0a0a0a',
        },
        name: 'rect-shape',
      })

      const bbox = text.getBBox()
      const hasChildren = cfg.children && cfg.children.length > 0
      if (hasChildren) {
        group.addShape('marker', {
          attrs: {
            x: bbox.maxX + 6,
            y: bbox.minX + bbox.height / 2 - 6,
            r: 6,
            symbol: COLLAPSE_ICON,
            stroke: '#666',
            lineWidth: 2,
          },
          name: 'collapse-icon',
        })
      }
      rect.attr({
        x: bbox.minX - 4,
        y: bbox.minY - 6,
        width: bbox.width + (hasChildren ? 26 : 10),
        height: bbox.height + 12,
      })
      return rect
    },
  },
  'single-node'
)

export function createGraph(container) {
  const graph = new G6.TreeGraph({
    container,
    width: 675,
    height: 675 * 0.618,
    modes: {
      default: [
        {
          type: 'collapse-expand',
          onChange: function onChange(item, collapsed) {
            const data = item.get('model')
            const icon = item
              .get('group')
              .find((element) => element.get('name') === 'collapse-icon')
            if (collapsed) {
              icon.attr('symbol', EXPAND_ICON)
            } else {
              icon.attr('symbol', COLLAPSE_ICON)
            }
            data.collapsed = collapsed
            return true
          },
        },
        'drag-canvas',
        'zoom-canvas',
      ],
    },
    defaultNode: {
      type: 'tree-node',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    defaultEdge: {
      type: 'cubic-horizontal',
      style: {
        stroke: '#A3B1BF',
      },
    },
    layout: {
      type: 'compactBox',
      direction: 'LR',
      getId: function getId(d) {
        return d.id
      },
      getHeight: function getHeight() {
        return 16
      },
      getWidth: function getWidth() {
        return 16
      },
      getVGap: function getVGap() {
        return 20
      },
      getHGap: function getHGap() {
        return 80
      },
    },
  })

  return graph
}
