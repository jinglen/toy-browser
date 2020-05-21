import React, { FC, useState } from 'react'

import { Typography, Layout, Row, Col, Steps } from 'antd'

import { exmapleHtml } from '../../toyBrowser/data'
import { parseHtml } from '../../toyBrowser'
import { trimDOMTree } from '../../toyBrowser/parseHtml'
import DomTreeGraph from './components/DomTreeGraph'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography
const { Step } = Steps

const Home: FC = () => {
  const [html, setHtml] = useState(exmapleHtml)
  const DOMTree = trimDOMTree(parseHtml(html))
  // eslint-disable-next-line no-console
  console.log('%c解析结果', 'font-size: 1.8em')
  // eslint-disable-next-line no-console
  console.log(DOMTree)

  return (
    <Layout>
      <Content style={{ padding: '40px' }}>
        <Row justify="center" align="top">
          <Col
            span={18}
            style={{ maxWidth: '750px', background: '#fff', padding: '24px' }}
          >
            <Title level={2}>玩具浏览器</Title>

            <Steps
              progressDot
              current={Infinity}
              direction="vertical"
              size="default"
            >
              <Step
                title={<Title level={3}>HTML</Title>}
                style={{ width: '100%' }}
                description={
                  <div
                    style={{
                      padding: '.5em',
                      border: '1px solid #f0f2f6',
                      boxSizing: 'border-box',
                    }}
                  >
                    <Paragraph
                      editable={{
                        onChange: setHtml,
                      }}
                      style={{
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {html}
                    </Paragraph>
                  </div>
                }
              />
              <Step
                title={<Title level={3}>DOM tree</Title>}
                style={{ width: '100%' }}
                description={
                  <>
                    <Text>
                      <Text strong>注意</Text>{' '}
                      展示的结果省略了只有空白的文本节点
                    </Text>
                    <DomTreeGraph tree={DOMTree} />
                  </>
                }
              />
              <Step
                title={<Title level={3}>DOM tree with CSS</Title>}
                style={{ width: '100%' }}
                description={<DomTreeGraph tree={DOMTree} hasStyle />}
              />
            </Steps>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default Home
