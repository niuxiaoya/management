import Vue from 'vue'
import Router from 'vue-router'

/** 导入所有路由 */
import menu from '@/router/menu'

/** 导入所有路由对应的component */
import dict from '@/router/path/dict'
import finance from '@/router/path/finance'
import friends from '@/router/path/friends'
import market from '@/router/path/market'
import news from '@/router/path/news'
import system from '@/router/path/system'
import user from '@/router/path/user'
import vip from '@/router/path/vip'

let path = {}
let routes = []

let cache = {}

if(process.env.NODE_ENV === 'production') {
  /** 根据当前所处项目更换为对应的component */
  cache = {market}
}else {
  /**  开发环境  */
  cache = {dict, finance, friends, market, news, system, user, vip}
}

/** 重组component */
for(let k in cache) {
  let c = cache[k]
  for(let q in c) {
    path[q] = c[q]
  }
}
/** 将component 与路由对应（路由path与component名称命名一致，去除反斜杠 "/"）*/
for(let k in menu) {
  for(let q in menu[k]) {
    let key = menu[k][q].path
    let component = path[key.replace(/\//g, '')]
    if(key === '/' && !!path[menu[k][q].redirect.replace(/\//g, '')]) {
      routes.push(menu[k][q])
    }else if(key !== '/' && !!component) {
      menu[k][q].component = component
      routes.push(menu[k][q])
    }
  }
}

/** 开发环境下，引入login ,方便token使用 */
/*
import login from '@/pages/login/login'
import logout from '@/pages/login/logout'
routes.push({path: '/', redirect: '/user/list', notmenu: true})
routes.push({path: '/login', name: 'login', component: login, notmenu: true})
routes.push({path: '/logout', name: 'logout', component: logout, notmenu: true})
*/


Vue.use(Router)
export default new Router({
  routes:  routes
})
