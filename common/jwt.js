const jwt = require('jsonwebtoken')
const {secret} = require('../config')
const crypto = require('crypto')
module.exports = {
    TOKEN_SECRET: secret,
    setToken(data) {
        return jwt.sign(data, this.TOKEN_SECRET, {
            expiresIn: 60 * 60 * 2,    // 单位 s
        })
    },
    setMD5(value) {
        return crypto.createHash('md5').update(value).digest('hex')
    }
}