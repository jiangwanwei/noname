class JwtAuth {
  /**
 * 获取 token        
 */
  getToken(headers) {
    if (headers && headers.authorization) {
      const authorization = headers.authorization
      const part = authorization.split(' ')

      if (part.length == 2) {
        return part[1]
      }
    }

    return null
  }
  /**
 * 验证 token      
 */
  verifyToken(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('Unauthorized')
      return
    }
    next()
  }
}
module.exports = JwtAuth