import React, { useEffect, useState } from 'react'
import { createGraph } from './G6Graph'

function simplifyTree(item: any, hasStyle: boolean = false) {
  if (item.type === 'document') {
    // eslint-disable-next-line no-param-reassign
    // eslint-disable-next-line no-param-reassign
    return {
      name: 'document',
      children: item.children.map((c: any) => simplifyTree(c, hasStyle)),
    }
  } else if (item.type === 'element') {
    const raw = {
      name: item.tagName,
      children: item.children.map((c: any) => simplifyTree(c, hasStyle)),
    }
    if (hasStyle) {
      return {
        ...raw,
        computedStyle: item.computedStyle,
      }
    } else {
      return raw
    }
  } else {
    return {
      name: `[text]:\n${item.content.trim().replace('\n', ' ').slice(0, 20)}${
        item.content.length > 20 ? '...' : ''
      }`,
    }
  }
}

interface Props {
  tree: any
  hasStyle?: boolean
}

// eslint-disable-next-line react/prop-types
const DomTreeGraph: React.FC<Props> = ({ tree, hasStyle = false }) => {
  const ref = React.useRef(null)
  const [graph, setGraph]: [any, any] = useState()

  useEffect(() => {}, [])

  useEffect(() => {
    if (!graph) {
      setGraph(createGraph(ref.current))
      // 此处需要规避反复渲染
    } else {
      const data = simplifyTree(tree, hasStyle)
      graph.data(data)
      graph.render()
      graph.fitView()
    }
  }, [tree, graph, hasStyle])

  return <div ref={ref} style={{ background: '#fff0f6' }} />
}

export default DomTreeGraph
