const router = require('express').Router()

const SystemAdminController = require('./systemAdmin')
const ConfigController = require('./configs')
const MarketingController = require('./marketing')

const SystemAdminModel = require('../../models/systemUser')
const ConfigModel = require('../../models/siteConfig')
const {superAdmin} = require('../../config')
const Base = require('../base')

class Admin extends Base{
    constructor(app, authMiddleware, path) {
        super()
        app.use(path, router)
        // router.use(...authMiddleware)
        Object.assign(this, { app, path, authMiddleware, })
        this.initRouter()
        this.createSuperAdmin()
        this.createConfig()
    }
    /**
     * 注册路由
     */
    initRouter() {        
        // 登陆
        router.post('/sign-in', this.signIn)
        // 管理员
        router.get('/system-admin',    ...this.authMiddleware, SystemAdminController.list)
              .post('/system-admin',   ...this.authMiddleware, SystemAdminController.create)
              .put('/system-admin/:_id',    ...this.authMiddleware, SystemAdminController.update)
              .delete('/system-admin/:_id', ...this.authMiddleware, SystemAdminController.delete)
        // 网站配置
        router.get('/system-set-cfg', ...this.authMiddleware, ConfigController.getCfg)
              .put('/system-set-cfg', ...this.authMiddleware, ConfigController.setCfg)
        // 营销
        router.get('/marketing', MarketingController.list)
    }
    /**
     * 创建超级管理员
     */
    async createSuperAdmin() {
        let u = await SystemAdminModel.findByUsername(superAdmin.username)
        if (!u) {
            SystemAdminModel.create(superAdmin)
            console.log('[MONGODB] 创建超级用户成功.')
        }
    }
    /**
     * 初始化配置（网站基本配置...）
     */
    createConfig() {
        this.configs_field.forEach(async name => {
            let result = await ConfigModel.findByName(name)
            if (!result) {
                ConfigModel.create({ name, content: '{}'})
                console.log(`[MONGODB] 创建网站配置 ${name} 成功.`)
            }
        })
    }
    /**
     * 
     * @api {post} /admin/sign-in 登陆
     * @apiName 登陆接口
     * @apiGroup admin
     * @apiVersion  0.1.0
     * 
     * 
     * @apiParam  {String} username 用户名
     * @apiParam  {String} password 密码
     * 
     * @apiSuccess (200) {type} name description
     * 
     * @apiParamExample  {type} Request-Example:
     * {
     *     username : 'admin',
     *     password : 'admin'
     * }
     * 
     * 
     * @apiSuccessExample {type} Success-Response:
     * {
     *     property : value
     * }
     * 
     * 
     */
    signIn(req, res) {
        let user = {
            username: req.body.username,
            password: req.body.password,
        }
        if (!user.password || !user.username) return res.tools.setJson(1, '请输入用户名密码.')
        SystemAdminModel.findByUsername(user.username)
            .then(u => {
                if (!u) return res.tools.setJson(1, '用户不存在.')
                if (u.password !== res.jwt.setMD5(user.password)) return res.tools.setJson(1, '用户名密码有误.')
                delete u.password
                delete u.token
                let token = res.jwt.setToken(u)
                SystemAdminModel.updateById(u._id, { token })
                    .then(result => {
                        res.tools.setJson(0, null, { token: 'Bearer ' + token })
                    })                
            })
    }
}
module.exports = Admin