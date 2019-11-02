let fs = require('fs')
let path = require('path')
let readline = require('readline')

let fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')

let readStram = fs.createReadStream(fileName)

let rl = readline.createInterface({
    input: readStram
})

let chromeNum = 0
let sum = 0

rl.on('line', (lineData) => {
    if (!lineData) {
        return
    }

    sum++

    const arr = lineData.split(' -- ')
    if (arr[2] && arr[2].indexOf('Chrome') !== -1) {
        chromeNum++
    }
})
rl.on('close', () => {
    console.log('chrome 占比:', ((chromeNum / sum) * 100) + '%')
})

