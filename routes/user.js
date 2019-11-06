var express = require('express')
var router = express.Router()
var { login } = require('../controller/user')
var { SuccessModel, ErrorModel } = require('../model/resModel')


router.post('/login', (req, res, next) => {
    var { username, password } = req.body
    var result = login(username, password)
    return result.then(data => {
        if (data.username) {
            req.session.username = data.username
            req.session.realname = data.realname
            res.json(new SuccessModel())
            return
        } else {
            res.json(new ErrorModel('登入失敗'))
        }
    })
})

module.exports = router