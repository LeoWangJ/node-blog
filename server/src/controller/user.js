var { exec } = require('../db/mysql')

var login = (username, password) => {
    let sql = `
        select username, realname from users where username='${username}' and password='${password}';
    `
    return exec(sql).then(result => {
        return result[0] || {}
    })
}

module.exports = {
    login
}