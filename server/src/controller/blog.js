var { exec } = require('../db/mysql')
var getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `

    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }

    sql += 'order by createtime desc;'
    return exec(sql)
}

var getDetail = (id) => {
    let sql = `select * from blogs where id='${id}';`
    return exec(sql).then(res => {
        return res[0]
    })
}

var addBlog = (blogData = {}) => {
    let { title, content, author } = blogData
    let createtime = Date.now()
    let sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}','${createtime}','${author}');`
    return exec(sql).then(data => {
        return {
            id: data.insertId
        }
    })
}

var updateBlog = (id, blogData = {}) => {
    let { title, content } = blogData
    let sql = `
       update blogs set title='${title}', content='${content}' where id=${id};
    `
    return exec(sql).then(result => {
        if (result.affectedRows > 0) {
            return true
        }
        return false
    })
}

var deleteBlog = (id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}';`
    return exec(sql).then(result => {
        if (result.affectedRows > 0) {
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    addBlog,
    updateBlog,
    deleteBlog
}