var { getList, getDetail, addBlog, updateBlog, deleteBlog } = require('../controller/blog')
var { SuccessModel, ErrorModel } = require('../model/resModel')

var loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登入')
        )
    }
}
var handleBlogRouter = (req, res) => {
    var method = req.method
    // 獲取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        var { author = '', keyword = '' } = req.query
        if (req.query.isadmin) {
            var loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                return loginCheckResult
            }
            author = req.session.username
        }
        var result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 獲取博客詳情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        var { id } = req.query
        var result = getDetail(id)
        return result.then(detailData => {
            return new SuccessModel(detailData)
        })
    }

    // 新增博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        var loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        req.body.author = req.session.username
        var bodyData = req.body
        var result = addBlog(bodyData)
        return result.then(blogData => {
            return new SuccessModel(blogData)
        })
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        var loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        var { id } = req.query
        var result = updateBlog(id, req.body)

        return result.then(status => {
            if (status) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失敗')
            }
        })
    }

    // 刪除博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        var loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        var { id } = req.query
        var author = req.session.username
        var result = deleteBlog(id, author)
        return result.then(status => {
            if (status) {
                return new SuccessModel()
            } else {
                return new ErrorModel('刪除博客失敗')
            }
        })
    }
}

module.exports = handleBlogRouter