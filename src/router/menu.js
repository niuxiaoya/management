
/** 获取当前登录用户权限信息 */
let v = 'v1'                                                 //  当前使用的api版本
let rights = localStorage.getItem('admin_rights_list')
if(!!rights) rights = JSON.parse(rights)

/** 定义几大版块 */
let user = []
let news = []
let vip = []
let dict = []
let finance = []
let exchange = []
let goods = []
let friends = []
let system = []

/** 根据权限列表分别设置各个版块对应的路由(没有设置component)  */
if(rights) {
  if(rights.user) {
    let u_list = rights.user[`v1,user,admin,userlist,get`]
    let c_list = rights.user[`v1,user,admin,identify,get`]
    if(u_list || c_list) user.push({path: '/', name: '用户管理', redirect: '/user/list', isTitle: true, icon: 'fa-users'})
    if(u_list) user.push({path: '/user/list', name: '用户列表'})
    if(c_list) user.push({path: '/user/certification', name: '实名认证'})
    if(rights.friends) {
      if(rights.friends[`v1,friends,admin,attentionlist,get`]) user.push({path: '/user/focus', name: 'useruserfocus', notmenu: true})
      if(rights.friends[`v1,friends,admin,fanslist,get`]) user.push({path: '/user/fans', name: 'useruserfans', notmenu: true})
    }
    user.push({path: '/user/use/detail', name: 'useruserdetail', notmenu: true})
    user.push({path: '/user/admin/detail', name: 'useradmindetail', notmenu: true})
    user.push({path: '/user/cerdetail', name: 'usercerdetail', notmenu: true})
    if(rights.user[`v1,user,admin,updatepwd,put`]) {
      user.push({path: '/user/updatepwd', name: 'updatepwd', notmenu: true})
    }
    for(let k in user) {
      user[k].base_url = `${process.env.URL.USER}/#`
    }
    if(user.length > 1) user[0].redirect = user[1].path
  }

  if(rights.news) {
    let cat_list = rights.news[`v1,news,admin,articlecate,get`]
    let sub_list = rights.news[`v1,news,admin,subject,get`]
    let art_list = rights.news[`v1,news,admin,article,get`]
    let art_com = rights.news[`v1,news,admin,comment,get`]
    let art_pri = rights.user && rights.user[`v1,user,admin,userlike,get`]
    let art_col = rights.user && rights.user[`v1,user,admin,collection,get`]

    if(cat_list || sub_list || art_list || art_com || art_pri || art_col) news.push({path: '/', name: '资讯管理', redirect: '/news/category', isTitle: true, icon: 'fa-newspaper-o'})
    if(cat_list) news.push({path: '/news/category', name: '资讯分类'})
    if(sub_list) news.push({path: '/news/subject', name: '专题管理'})
    if(art_list || art_com || art_pri || art_col) news.push({path: '/', name: '文章管理', redirect: '/news/list', hasThird: true})
    if(art_list) news.push({path: '/news/list', name: '文章列表', isThird: true})
    if(art_com) news.push({path: '/news/comment', name: '文章评论', isThird: true})
    if(art_pri) news.push({path: '/news/praise', name: '文章点赞', isThird: true})
    if(art_col) news.push({path: '/news/collect', name: '文章收藏', isThird: true})

    news.push({path: '/news/subject/detail', name: 'newssubjectdetail', notmenu: true})
    news.push({path: '/news/list/detail', name: 'newsnewsdetail', notmenu: true})
    news.push({path: '/news/commentreplay', name: 'newscommentreplay', notmenu: true})
    news.push({path: '/news/commentpraise', name: 'newscommentpraise', notmenu: true})

    for(let k in news) {
      news[k].base_url = `${process.env.URL.NEWS}/#`
    }
    if(news.length > 1) news[0].redirect = news[1].path
  }

  if(rights.vip) {
    let lev_list = rights.vip[`v1,vip,admin,level,get`]
    let ord_list = rights.vip[`v1,vip,admin,order,get`]
    let wat_list = rights.vip[`v1,vip,admin,watchlist,get`]
    let cha_list = rights.vip[`v1,vip,admin,change,get`]
    if(lev_list || ord_list || wat_list || cha_list) vip.push({path: '/', redirect: '/vip/kind', name: '会籍管理', isTitle: true, icon: 'fa-balance-scale'})
    if(lev_list) vip.push({path: '/vip/kind', name: '会籍等级'})
    if(ord_list) vip.push({path: '/vip/order', name: '会籍订单'})
    if(wat_list) vip.push({path: '/vip/market', name: '换戴产品'})
    if(cha_list) vip.push({path: '/vip/log', name: '换戴记录'})
    vip.push({path: '/vip/log/detail', name: 'kindlogdetail', notmenu: true})
    vip.push({path: '/vip/market/detail', name: 'kindmarketdetail', notmenu: true})
    vip.push({path: '/vip/kind/detail', name: 'kindkinddetail', notmenu: true})
    vip.push( {path: '/vip/order/detail', name: 'kindorderdetail', notmenu: true})
    for(let k in vip) {
      vip[k].base_url = `${process.env.URL.VIP}/#`
    }
    if(vip.length > 1) vip[0].redirect = vip[1].path
  }

  if(rights.dict) {
    let plat = rights.dict[`v1,dict,admin,platformbank,get`]
    let kind = rights.dict[`v1,dict,admin,goodskind,get`]
    let brand = rights.dict[`v1,dict,admin,brand,get`]
    let fine = rights.dict[`v1,dict,admin,fineness,get`]
    let mater = rights.dict[`v1,dict,admin,material,get`]
    let func = rights.dict[`v1,dict,admin,function,get`]
    let move = rights.dict[`v1,dict,admin,movement,get`]
    let shape = rights.dict[`v1,dict,admin,shape,get`]
    let country = rights.dict[`v1,dict,admin,country,get`]
    if(plat || kind || brand || fine || mater || func || move || shape || country) dict.push({path: '/', name: '字典管理', redirect: '/dict/platformbank', icon: 'fa-newspaper-o', isTitle: true})
    if(plat) dict.push({path: '/dict/platformbank', name: '平台账户 '})
    if(country) dict.push({path: '/dict/country', name: '国家管理 '})
    if(kind || brand || fine || mater || func || move || shape) dict.push({path: '/', name: '商品属性', redirect: '/dict/kind', hasThird: true})
    if(kind) dict.push({path: '/dict/kind', name: '商品品类', isThird: true})
    if(brand) dict.push({path: '/dict/brand', name: '商品品牌', isThird: true})
    if(fine) dict.push({path: '/dict/fineness', name: '成色管理', isThird: true})
    if(mater) dict.push({path: '/dict/material', name: '表壳材质', isThird: true})
    if(func) dict.push({path: '/dict/function', name: '复杂功能', isThird: true})
    if(move) dict.push({path: '/dict/movement', name: '机芯类型', isThird: true})
    if(shape) dict.push({path: '/dict/shape', name: '表盘形状', isThird: true})
    for(let k in dict) {
      dict[k].base_url = `${process.env.URL.DICT}/#`
    }
    if(dict.length > 1) dict[0].redirect = dict[1].path
  }

  if(rights.market) {
    let f_audit_watch = rights.market[`v2,market,admin,auditaccounts,get`]
    let f_audit_vip = rights.vip && rights.vip[`v1,vip,admin,audit,get`]
    let f_pay = rights.market[`v2,market,admin,payment,get`]
    if(f_audit_vip || f_audit_watch || f_pay) {
      finance.push({path: '/', redirect: '/finance/audit', name: '财务管理', isTitle: true, icon: 'fa-money'})
      if(f_audit_watch || f_audit_vip) finance.push({path: '/finance/audit', name: '查账申请'})
      if(f_pay) finance.push({path: '/finance/pay', name: '付款管理'})
    }
    finance.push({path: '/finance/audit/detail', name: 'financeauditdetail', notmenu: true})
    finance.push({path: '/finance/vip/detail', name: 'financevipdetail', notmenu: true})
    for(let k in finance) {
      finance[k].base_url = `${process.env.URL.FINANCE}/#`
    }
    if(finance.length > 1) finance[0].redirect = finance[1].path

    let e_watch_list = rights.market[`v2,market,admin,watchlist,get`]
    let e_order_list = rights.market[`v2,market,admin,orderlist,get`]
    let e_family_list = rights.market[`v2,admin,market,xbiao,get`] && rights.market[`v2,admin,market,xbiao,post`]    //  爬取腕表之家数据的权限
    if(e_watch_list || e_order_list || e_family_list) {
      exchange.push({path: '/', name: '交易管理', redirect: '/market/sell', isTitle: true, icon: 'fa-truck'})
      if(e_family_list) exchange.push({path: '/market/family', name: '腕表之家'})
      if(e_watch_list) exchange.push({path: '/market/sell', name: '卖表管理'})
      if(e_order_list) exchange.push({path: '/market/order', name: '订单管理'})
    }
    exchange.push({path: '/market/order/detail', name: 'exchangeorderdetail', notmenu: true})
    exchange.push({path: '/market/sell/detail', name: 'exchangeselldetail', notmenu: true})
    for(let k in exchange) {
      exchange[k].base_url = `${process.env.URL.EXCHANGE}/#`
    }
    if(exchange.length > 1) exchange[0].redirect = exchange[1].path

    let g_eva_list = rights.market[`v2,market,admin,certify,get`]
    let g_put_list = rights.market[`v2,market,admin,warehousein,get`]
    let g_pop_list = rights.market[`v2,market,admin,warehouseout,get`]
    if(g_eva_list || g_put_list || g_pop_list) {
      goods.push({path: '/', name: '商品管理', redirect: '/market/evaluation', isTitle: true, icon: 'fa-google-wallet'})
      if(g_eva_list) goods.push({path: '/market/evaluation', name: '鉴定申请'})
      if(g_put_list) goods.push({path: '/market/putstorage', name: '入库管理'})
      if(g_pop_list) goods.push({path: '/market/popstorage', name: '出库管理'})
    }
    goods.push({path: '/market/evaluation/detail', name: 'goodsevaluatedetail', notmenu: true})
    goods.push({path: '/market/popstorage/detail', name: 'goodspopstoragedetail', notmenu: true})
    goods.push({path: '/market/putstorage/detail', name: 'goodsputstoragedetail', notmenu: true})
    for(let k in goods) {
      goods[k].base_url = `${process.env.URL.EXCHANGE}/#`
    }
    if(goods.length > 1) goods[0].redirect = goods[1].path
  }

  if(rights.friends) {
    let act_list = !rights.friends[`v1,friends,admin,activity,get`]
    let cir_list = rights.friends[`v1,friends,admin,circles,get`]
    let com_list = rights.friends[`v1,friends,admin,comment,get`]
    let like_list = rights.user && rights.user[`v1,user,admin,userlike,get`]
    let col_list = rights.user && rights.user[`v1,user,admin,collection,get`]

    if(cir_list || com_list || like_list || col_list)  friends.push({path: '/', name: '圈子管理', redirect: '/friends/social', isTitle: true, icon: 'fa-life-buoy'})
    if(act_list) friends.push({path: '/friends/activity', name: '活动入口'})
    if(cir_list) friends.push({path: '/friends/social', name: '动态列表'})
    if(com_list) friends.push({path: '/friends/comment', name: '动态评论'})
    if(like_list) friends.push({path: '/friends/praise', name: '动态点赞'})
    if(col_list) friends.push({path: '/friends/collect', name: '动态收藏'})
    friends.push({path: '/friends/social/detail', name: 'friendssocialdetail', notmenu: true})
    friends.push({path: '/friends/commentpraise', name: 'friendscommentpraise', notmenu: true})
    friends.push({path: '/friends/commentreplay', name: 'friendscommentreplay', notmenu: true})
    friends.push({path: '/friends/activity/detail', name: 'friendsactivitydetail', notmenu: true})
    for(let k in friends) {
      friends[k].base_url = `${process.env.URL.FRIENDS}/#`
    }
    if(friends.length > 1) friends[0].redirect = friends[1].path
  }

  if(rights.system) {
    let sys_ad = rights.system[`v1,system,admin,ad,get`]
    let sys_about = rights.system[`v1,system,admin,aboutus,get`]
    let sys_ware = rights.market && rights.market[`v1,market,admin,warehouse,get`]
    let sys_pro = rights.news && rights.news[`v1,news,admin,protocol,get`]
    let sys_hall = rights.system[`v1,system,admin,hall,get`]
    let sys_group = rights.system[`v1,system,admin,usergroup,get`]
    let sys_ver = rights.system['version,system,update,version,post']
    let sys_ownact = rights.system['v1,system,admin,activity,get']
    let sys_act = rights.system['v1,system,admin,actcate,get']
    if(sys_ownact || sys_act || sys_ad  || sys_about || sys_ware || sys_pro || sys_hall || sys_group || sys_ver)  system.push({path: '/', name: '系统设置', redirect: '/system/adset', isTitle: true, icon: 'fa-gear'})
    if(sys_act) system.push({path: '/system/activities', name: '活动分类'})
    if(sys_ownact) system.push({path: '/system/ownactivity', name: '商品活动'})
    if(sys_ad) system.push({path: '/system/adset', name: '广告位设置'})
    if(sys_about) system.push({path: '/system/aboutus', name: '关于我们'})
    if(sys_ware) system.push({path: '/system/ware', name: '仓库管理'})
    if(sys_pro) system.push({path: '/system/protocol', name: '协议管理'})
    if(sys_hall) system.push({path: '/system/hall', name: '展厅管理'})
    if(sys_group) system.push({path: '/system/role', name: '权限管理'})
    if(sys_ver) system.push({path: '/system/version', name: '版本管理'})
    system.push({path: '/system/hall/detail', name: 'systemhalldetail', notmenu: true})
    system.push({path: '/system/protocol/detail', name: 'systemprotocoldetail', notmenu: true})
    for(let k in system) {
      system[k].base_url = `${process.env.URL.SYSTEM}/#`
    }
    if(system.length > 1) system[0].redirect = system[1].path
  }
}

/**  导出结构 供左侧菜单 与 生成路由 使用*/
export default {
  user,
  news,
  vip,
  dict,
  finance,
  exchange,
  goods,
  friends,
  system
}
