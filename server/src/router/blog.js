var { getList, getDetail, addBlog, updateBlog } = require('../controller/blog')
var { SuccessModel, ErrorModel } = require('../model/resModel')
var handleBlogRouter = (req, res) => {
    var method = req.method
    // 獲取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        var { author = '', keyword = '' } = req.query
        var listData = getList(author, keyword)
        return new SuccessModel(listData)
    }

    // 獲取博客詳情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        var { id } = req.query
        var detailData = getDetail(id)
        return new SuccessModel(detailData)
    }

    // 新增博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        var bodyData = req.body
        var blogData = addBlog(bodyData)
        return new SuccessModel(blogData)
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        var { id } = req.query
        var result = updateBlog(id, req.body)

        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('更新博客失敗')
        }
    }

    // 刪除博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        return {
            message: 'delete blog'
        }
    }
}

module.exports = handleBlogRouter