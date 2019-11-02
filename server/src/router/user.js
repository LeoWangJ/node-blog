var { login } = require('../controller/user')
var { SuccessModel, ErrorModel } = require('../model/resModel')
var { set } = require('../db/redis')
var handleUserRouter = (req, res) => {
    var method = req.method

    // 登入
    if (method === 'POST' && req.path === '/api/user/login') {
        var { username, password } = req.body
        var result = login(username, password)
        return result.then(data => {
            if (data.username) {
                req.session.username = data.username
                req.session.realname = data.realname
                set(req.sessionId, req.session)
                return new SuccessModel()
            } else {
                return new ErrorModel('登入失敗')
            }
        })
    }
}

module.exports = handleUserRouter