const env = process.env.NODE_ENV

let MYSQL_CONFIG

if (env === 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'aa1111',
        database: 'myblog'
    }
}
if (env === 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'aa1111',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONFIG
}