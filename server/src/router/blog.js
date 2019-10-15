var { getList, getDetail, addBlog, updateBlog, deleteBlog } = require('../controller/blog')
var { SuccessModel, ErrorModel } = require('../model/resModel')
var handleBlogRouter = (req, res) => {
    var method = req.method
    // 獲取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        var { author = '', keyword = '' } = req.query
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
        console.log(req.body)
        req.body.author = 'leo'
        var bodyData = req.body
        console.log(bodyData)
        var result = addBlog(bodyData)
        return result.then(blogData => {
            return new SuccessModel(blogData)
        })
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
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
        var { id } = req.query
        var author = 'leo'
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