var http = require('http')
var serverHandle = require('../app')
var PORT = 8000
var server = http.createServer(serverHandle)

server.listen(PORT)
