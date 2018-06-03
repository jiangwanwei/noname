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
        if (err.name === 'UnauthorizedError') return res.tools.setJson(1, err.message)
        next()
    }
}
module.exports = JwtAuth