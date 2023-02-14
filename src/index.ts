import http from 'http'
import app from './app'
import * as config from './config'

const server = http.createServer(app)
server.listen(config.port)
server.on('listening', () => { console.log(`The web server is listening on port`, config.port) })