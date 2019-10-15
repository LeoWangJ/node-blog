var { login } = require('../controller/user')
var { SuccessModel, ErrorModel } = require('../model/resModel')

var getCookieExpires = () => {
    var d = new Date()
    d.setTime(d.getTime + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}
var handleUserRouter = (req, res) => {
    var method = req.method

    // 登入
    if (method === 'POST' && req.path === '/api/user/login') {
        var { username, password } = req.body
        var result = login(username, password)
        return result.then(data => {
            res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()} `)
            if (data.username) {
                return new SuccessModel()
            } else {
                return new ErrorModel('登入失敗')
            }
        })
    }
    // 登入驗證的測試
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie['username']) {
            return Promise.resolve(new SuccessModel())
        }
        return Promise.resolve(new ErrorModel('尚未登入'))
    }
}

module.exports = handleUserRouter