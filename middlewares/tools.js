const { tools, paginate, jwt, } = require('../common')

module.exports = (req, res, next) => {
    res.tools = new tools(req, res)
    res.jwt   = jwt
    res.paginate = (...args) => new paginate(...args).init()
    next()
}