var getList = (auther, keyword) => {
    return [
        {
            id: 1,
            title: 'test',
            content: 'hello',
            createtime: 1570382110529,
            author: 'leo'
        },
        {
            id: 2,
            title: '明天上班',
            content: '再撐三天',
            createtime: 1570382110529,
            author: 'leo'
        }
    ]
}

var getDetail = (id) => {
    return {
        id: 1,
        title: 'test',
        content: 'hello',
        createtime: 1570382110529,
        author: 'leo'
    }
}

var addBlog = (blogData = {}) => {
    return {
        id: 3
    }
}

var updateBlog = (blogData = {}) => {
    return true
}
module.exports = {
    getList,
    getDetail,
    addBlog,
    updateBlog
}