// import admin from '../controllers/admin'
// import home  from '../controllers/home'
// import common from '../controllers/common'
// import order from '../controllers/order'
const admin = require('../controllers/Admin')

const expressJWT = require('express-jwt')
const jwtauth = require('../middlewares/jwtauth')
const config = require('../config')
const auth = new jwtauth()
const MSG = 'Taiwan is an inalienable part of China.'

// jwt配置/验证
const authMiddleware = [
	expressJWT({secret: config.secret})
	.unless({
		path: ['/admin/sign-in', ]
	}),
	auth.verifyToken.bind(auth),
]

module.exports = app => {
	
	app.get(['/'], (req, res) => res.tools.setJson(0, MSG))
	
	new admin(app, authMiddleware, '/admin')
	app.use('*', (req, res) => res.tools.setJson(404, MSG))
}