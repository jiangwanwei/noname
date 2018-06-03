/**
 * 新闻模块
 */
class Marketing {
    constructor() {

    }
    /**
     * 会员列表
     */
    list(req, res) {
        res.json({
            path: '/admin/member get'
        })
    }
    /**
     * 创建
     */
    create(req, res) {
        res.json({
            path: '/admin/member post'
        })
    }
    /**
     * 删除
     */
    delete(req, res) {
        res.json({
            path: '/admin/member delete'
        })
    }
    /**
     * 更新
     */
    update(req, res) {
        res.json({
            path: '/admin/member update'
        })
    }
}

module.exports = new Marketing()