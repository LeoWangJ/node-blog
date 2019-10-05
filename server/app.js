var handleBlogRouter = require('./src/router/blog')
var handleUserRouter = require('./src/router/user')

var serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    req.path = req.url.split('?')[0]
    var blogData = handleBlogRouter(req, res)
    // 處理blog router
    if (blogData) {
        res.end(JSON.stringify(blogData))
        return
    }

    var userData = handleUserRouter(req, res)
    // 處理user router
    if (userData) {
        res.end(JSON.stringify(userData))
        return
    }

    res.writeHead('404', { 'Content-type': 'text/plain' })
    res.write('404 not found')
    res.end()
}


module.exports = serverHandle
