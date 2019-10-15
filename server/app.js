var querystring = require('querystring')
var handleBlogRouter = require('./src/router/blog')
var handleUserRouter = require('./src/router/user')

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

var serverHandle = (req, res) => {
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
    getPostData(req).then(postData => {
        req.body = postData

        var blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return
        }

        var userResult = handleUserRouter(req, res)
        if (userResult) {
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
