var { exec, escape } = require('../db/mysql')
var { genPassword } = require('../utils/cryp')
var login = (username, password) => {
    username = escape(username)
    password = genPassword(password)
    password = escape(password)
    console.log(password)
    let sql = `
        select username, realname from users where username=${username} and password=${password};
    `
    return exec(sql).then(result => {
        return result[0] || {}
    })
}

module.exports = {
    login
}