var handleUserRouter = (req, res) => {
    var method = req.method

    // 登入
    if (method === 'POST' && req.path === '/api/user/login') {
        return {
            message: 'login'
        }
    }
}

module.exports = handleUserRouter