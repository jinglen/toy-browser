
const net = require('net')

const TYPE_FORM = 'application/x-www-form-urlencoded'
const TYPE_JSON = 'application/json'



class Request {
  constructor ({
    method = 'GET',
    host,
    port = 80,
    path = '/',
    body = {},
    headers = {}
  }) {
    this.method = method
    this.host = host
    this.port = port
    this.path = path
    this.body = body
    this.headers = headers

    if (!this.headers['content-type']) {
      this.headers['content-type'] = TYPE_FORM
    }

    if (this.headers['content-type'] === TYPE_JSON) {
      this.bodyText = JSON.stringify(body)
    } else if (this.headers['content-type'] === TYPE_FORM) {
      this.bodyText = Object.entries(body).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&')
    }

    this.headers['content-length'] = this.bodyText.length

  }

  toString () {
    const headerStr = Object.entries(this.headers).map(([key, value]) => `${key}: ${value}\r\n`).join('')
    return [
      `${this.method} ${this.path} HTTP/1.1\r\n`,
      headerStr,
      '\r\n',
      this.bodyText,
      '\r\n',
    ].join('')
  }

  send () {
    return new Promise((resolve, reject) => {
      const connection = net.createConnection({
          host: this.host,
          port: this.port,
        },
        () => {
          connection.write(this.toString());
        },
      )

      connection.on('data', (data) => {
        // new Response(data)
        console.log('client的63行,into');
        console.log(data.toString())
        connection.end()
      })

      connection.on('end', () => {
        console.log('disconnected from server')
      })

      connection.on('error', (err) => {
        console.log(err)
        connection.end()
      })
    })
  }
}

const request = new Request({
  host: '127.0.0.1',
  port: 8088,
  body: {
    name: 'jinchi'
  }  
})



request.send()


