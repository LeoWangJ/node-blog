var express = require('express')
var router = express.Router()
var { getList, getDetail, addBlog, updateBlog, deleteBlog } = require('../controller/blog')
var { SuccessModel, ErrorModel } = require('../model/resModel')
var loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {
    var { author = '', keyword = '' } = req.query
    console.log(req.session.username)
    if (req.query.isadmin) {
        if (req.session.username === undefined) {
            res.json(new ErrorModel('未登入'))
            return
        }
        author = req.session.username
    }
    var result = getList(author, keyword)
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
})

router.get('/detail', (req, res, next) => {
    var { id } = req.query
    var result = getDetail(id)
    return result.then(detailData => {
        res.json(new SuccessModel(detailData))
    })
})

router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    var bodyData = req.body
    var result = addBlog(bodyData)
    return result.then(blogData => {
        res.json(new SuccessModel(blogData))
    })
})

router.post('/update', loginCheck, (req, res, next) => {
    var { id } = req.query
    var result = updateBlog(id, req.body)

    return result.then(status => {
        if (status) {
            res.json(new SuccessModel())
        } else {
            res.json(new ErrorModel('更新博客失敗'))
        }
    })
})

router.post('/del', loginCheck, (req, res, next) => {
    var { id } = req.query
    var author = req.session.username
    var result = deleteBlog(id, author)
    return result.then(status => {
        if (status) {
            res.json(new SuccessModel())
        } else {
            res.json(new ErrorModel('刪除博客失敗'))
        }
    })
})
module.exports = router