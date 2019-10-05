var handleBlogRouter = (req, res) => {
    var method = req.method

    // 獲取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        return {
            message: 'get blog list'
        }
    }

    // 獲取博客詳情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        return {
            message: 'get blog detail'
        }
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