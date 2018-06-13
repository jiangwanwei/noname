class Base {
    constructor() {
        this.configs_field = ['site', 'picture']
    }
    /**
     * try-catch
     * @param {*} fn 
     * @param {*} res 
     */
    _try(fn, res) {
        try {
            fn && fn()
        } catch (error) {
            res.tools.setJson(1, error.message)
        }
    }
}
module.exports = Base