let fs = require('fs')
let path = require('path')

function writeLogs(writeStream, log) {
    writeStream.write(log + '\n')
}
function createWriteStream(fileName) {
    let fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    let writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}


function access(log) {
    let accessWriteStream = createWriteStream('access.log')
    writeLogs(accessWriteStream, log)
}

function error(log) {
    let errorWriteStream = createWriteStream('error.log')
    writeLogs(errorWriteStream, log)
}

function event(log) {
    let eventWriteStream = createWriteStream('event.log')
    writeLogs(eventWriteStream, log)
}

module.exports = {
    access,
    error,
    event
}