const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)

redisClient.on('error', err => {
    console.error(err)
})

function set(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, value) => {
            if (err) {
                reject(err)
                return
            }
            if (value === null) {
                resolve(null)
            }
            try {
                resolve(
                    JSON.parse(value)
                )
            } catch (err) {
                resolve(value)
            }
        })
    })
    return promise
}

module.exports = {
    get,
    set
}