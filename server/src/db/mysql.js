const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

const con = mysql.createConnection(MYSQL_CONFIG)


function exec(sql) {
    let promise = new Promise((reslove, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            reslove(result)
        })
    })
    return promise
}

module.exports = {
    exec
}