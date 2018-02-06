import Base from '@/model/base'

/**
 * @class Platform
 * @classdesc 平台账号
 * */
class Platform extends Base {
  constructor(data) {
    data = !!data ? data : {}
    super(data)

    this.add_url = `${process.env.API.DICT}/v1/admin/dict/platformbank`
    this.get_list_url = `${process.env.API.DICT}/v1/admin/dict/platformbank`
    this.update_url = `${process.env.API.DICT}/v1/admin/dict/platformbank`
    this.delete_url = `${process.env.API.DICT}/v1/admin/dict/platformbank`
    this.id = data.id || ''
    this.current_model = Platform

    /** 开户名称 */
    this.name = data.name || ''       //  开户名称
    /** 开户银行 */
    this.bank = data.bank || ''       //  开户银行
    /** 账号 */
    this.number = data.number || ''   //  账号
    /** 关键词搜索标识 */
    this.sessionkey_search = 'dictplatform'
    /** 在vuex中的标识 */
    this.$storeList = 'DictPlatform'
    /** 权限配置 */
    this.config = {
      add: this.api_rights.dict[`v1,dict,admin,platformbank,post`],
      edit: this.api_rights.dict[`v1,dict,admin,platformbank,put`],
      del: this.api_rights.dict[`v1,dict,admin,platformbank,delete`]
    }
    this.config.notools = !this.config.edit && !this.config.del
  }

  /**
   * @function
   * @description 设置表单发送数据 */
  setPostParam () {
    return {
      name: this.name,
      bank: this.bank,
      number: this.number
    }
  }
}

export default Platform
