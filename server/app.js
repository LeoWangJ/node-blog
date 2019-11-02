var querystring = require('querystring')
var handleBlogRouter = require('./src/router/blog')
var { access } = require('./src/utils/log')
var handleUserRouter = require('./src/router/user')
var { set, get } = require('./src/db/redis')
var getPostData = (req) => {
    const promise = new Promise((reslove, reject) => {
        if (req.method !== 'POST') {
            reslove({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            reslove({})
            return
        }
        let postData = ''

        req.on('data', (chunk) => {
            postData += chunk.toString()
        })

        req.on('end', () => {
            if (!postData) {
                reslove({})
                return
            }
            reslove(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

var getCookieExpires = () => {
    var d = new Date()
    d.setTime(d.getTime + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const SESSION_DATA = {}
var serverHandle = (req, res) => {
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
    res.setHeader('Content-type', 'application/json')
    var url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    req.cookie = {}
    const cookieString = req.headers.cookie || ''
    cookieString.split(';').forEach(item => {
        if (!item) {
            return
        }
        var arr = item.split('=')
        var key = arr[0].trim()
        var value = arr[1].trim()
        req.cookie[key] = value
    })

    let needSetCookieId = false
    let userId = req.cookie.userId
    if (!userId) {
        needSetCookieId = true
        userId = `${Date.now()}_${Math.random()}`
        set(userId, {})
    }
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            set(req.sessionId, {})
            req.session = {}
        } else {
            req.session = sessionData
        }
        return getPostData(req)
    }).then(postData => {
        req.body = postData

        var blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            if (needSetCookieId) {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()} `)
            }
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return
        }

        var userResult = handleUserRouter(req, res)
        if (userResult) {
            if (needSetCookieId) {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()} `)
            }
            userResult.then(userData => {
                res.end(JSON.stringify(userData))
            })
            return
        }


        res.writeHead('404', { 'Content-type': 'text/plain' })
        res.write('404 not found')
        res.end()
    })
}


module.exports = serverHandle
