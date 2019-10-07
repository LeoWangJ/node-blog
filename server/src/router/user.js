var { login } = require('../controller/user')
var { SuccessModel, ErrorModel } = require('../model/resModel')
var handleUserRouter = (req, res) => {
    var method = req.method

    // 登入
    if (method === 'POST' && req.path === '/api/user/login') {
        var { username, password } = req.body
        var result = login(username, password)

        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('登入失敗')
        }
    }
}

module.exports = handleUserRouter