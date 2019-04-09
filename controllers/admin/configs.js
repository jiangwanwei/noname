const Base = require('../base')
const SiteConfigsModel = require('../../models/siteConfig')
class Configs extends Base {
  constructor () {
    super()
    this.getCfg = this.getCfg.bind(this)
    this.setCfg = this.setCfg.bind(this)
  }
  /**
   * 根据名称获取配置
   */
  getCfg(req, res) {
    let { name } = req.query
    if (this.configs_field.indexOf(name) === -1) return res.tools.setJson(1, '配置名称不存在.')
    SiteConfigsModel
      .findByName(name)
      .then(result => {
        res.tools.setJson(0, '', result.content)
      })
  }
  /**
   * 根据名称更新配置
   */
  setCfg(req, res) {
    let { name, content } = req.body
    if (this.configs_field.indexOf(name) === -1) return res.tools.setJson(1, '配置名称不存在.')
    if (!content) return res.tools.setJson(1, '配置不能为空.')
    SiteConfigsModel
      .update(name, content)
      .then(result => {
        res.tools.setJson(0, '更新成功.')
      })
  }
}
module.exports = new Configs()