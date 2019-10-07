var { getList } = require('../controller/blog')
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
    }

    // 新增博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        return {
            message: 'add blog'
        }
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            message: 'update blog'
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