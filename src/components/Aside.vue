<template>
  <div class="slide-wrapper" :class="isCollapse ? 'close' : 'open'">
    <a href="#" class="logo">
      <img :src="isCollapse ? logo_mini : logo_lg" />
    </a>

    <ul class="menu" :class="isCollapse ? 'close' : 'open'">
      <li class="item" v-for="item,i in menu" :key="i" @click="handleMenu(item, i)" :class="{'open': i>=start && i<=end || item.isTitle}">
        <a class="text"
          :class="{'level1': item.isTitle, 'level2': !item.isTitle && !item.isThird, 'level3': item.isThird}"
          @click="jumpUrl(item)">
          <i v-if="item.icon" :class="`fa ${item.icon}`"></i>
          <span class="name">{{item.name}}</span>
          <i v-if="item.isTitle" class="fa icon-caret" :class="i>=start && i<=end ? 'fa-angle-down' : 'fa-angle-up'"></i>
          <i v-if="item.hasThird" class="fa icon-caret" :class="end !== i ? 'fa-angle-down' : 'fa-angle-up'"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import menu from '@/router/menu'
  /** @vue */
  export default {
    props: {
      isCollapse: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {
        start: -1,   //  打开菜单 开始地方索引
        end: -1,     //  打开菜单 关闭地方索引
        logo_lg: require('@/assets/logo3.png'),
        logo_mini: require('@/assets/logo3.png'),
        menu: []
      }
    },
    mounted () {
      let rights = localStorage.getItem('admin_rights')
      if(!rights) return false

      for(let k in menu) {
        if((k === 'finance' || k === 'exchange' || k === 'goods') && rights.match('market') !== null || rights.match(k) !== null) {
          for(let q in menu[k]) {
            if(!menu[k][q].notmenu)  this.menu.push(menu[k][q])
          }
        }
      }
      this.$nextTick(() => {
        let thirdTitle = 0
        let current = this.$router.currentRoute.fullPath
        for(let k in this.menu) {
          if(this.menu[k].isTitle) thirdTitle = k
          if(this.menu[k].path === current) {
            this.start = thirdTitle
          }
          if(this.start !== -1 && this.menu[k].isTitle) {
            this.end = k-1
            break;
          }
        }
        if(this.start !== -1 && this.end === -1) this.end = this.menu.length - 1
      })
    },
    methods: {
      /**
       * 设置菜单展开收缩
       * */
      handleMenu(item, i) {
        let len = this.menu.length
        if(item.isTitle || item.hasThird) {
          if(i > this.end || i < this.start) { //  是展开菜单
            this.start = i
            for(i = i+1; i<len; i++) {
              if(this.menu[i].isTitle) {
                this.end = i - 1
                break;
              }
            }
            if(this.end < this.start) {
              this.end = len
            }
          }else {
            if(item.hasThird) {
              if(i < this.end) {  //  要展开菜单
                this.end = i
              }else {
                for(i = i+1; i<len; i++) {
                  if (this.menu[i].isTitle) {
                    this.end = i - 1
                    break;
                  }
                }
                if(this.end < this.start) {
                  this.end = len
                }
              }
            }else {
              this.start = -1
              this.end = -1
            }
          }
        }
      },
      /** 跳转页面 */
      jumpUrl(item) {
        let href = window.location.href
        let url = item.base_url + item.path
        window.location.href = url
        if(href.match(url) !== null && !item.isTitle) {
          if(process.env.NODE_ENV === 'production') {
            window.location.reload()
          }
        }
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .logo {
    height: 50px;
    line-height: 50px;
    text-align: left;
    display: block;
    font-size: 16px;
    span {
      display: inline-block;
      vertical-align: middle;
    }
    img {
      max-height: 30px;
      vertical-align: middle;
      margin-left: 13px;
    }
  }

  .slide-wrapper {
    min-height: 100vh;
    background: #324157;

    &.close {
      //    width: 64px;
    }
    &.open {
      width: 160px;
    }
    a {
      color: #bfcbd9;
      text-decoration: none;
    }
  }

  .menu {
    &.open {
      width: 160px;
    }
    &.close {
      // width: 60px;
      .level1 .name {
        //   display: none;
      }
    }
    color: #bfcbd9;
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 14px;

    .item {
      cursor: pointer;
      height: 0;
      overflow: hidden;
      transition: all .4s ease-in-out;
      &.open {
        height: 40px;
      }
    }
    .text {
      line-height: 40px;
      display: block;
      &:hover {
        background: #48576a;
      }
      &.router-link-active {
        color: #20a0ff;
      }
      &.level1 {
        padding-left: 15px;
      }
      &.level2 {
        background: #1f2d3d;
        padding-left: 30px;
        &:hover {
          background: #48576a;
        }
      }
      &.level3 {
        background: #1f2d3d;
        padding-left: 45px;
        &:hover {
          background: #48576a;
        }
      }
      .icon-caret {
        float: right;
        line-height: 40px;
        margin-right: 20px;
        font-size: 20px;
      }
    }
  }
</style>

<!--
<template>
  <div class="slide-wrapper" :class="isCollapse ? 'close' : 'open'">
    <a href="#" class="logo">
      <img :src="isCollapse ? logo_mini : logo_lg" />
    </a>

    <el-menu :default-openeds="menu_open"
             unique-opened class="el-menu-vertical-demo" theme="dark" :collapse="isCollapse">
      <el-submenu v-for="el,i in menu" :key="i" :index="`'${i}'`">
        <template slot="title" v-if="el.path === '/'">
          <i class="fa" :class="el.icon"></i>
          <span class="menu-text">{{ el.name }}</span>
        </template>
        <div v-for="m,ii in el.route" :key="ii">
          <el-menu-item :index="`'${i}-${ii}'`" v-if="!m.children">
            <a :href="`${el.baseurl}${m.path}`">
              <span class="menu-text">{{ m.name }}</span>
            </a>
          </el-menu-item>
          <el-submenu :index="`'${i}-${ii}'`" v-else>
            <template slot="title">
              <span class="menu-text">{{ m.name }}</span>
            </template>
            <el-menu-item v-for="c,iii in m.children" :key="iii" :index="`'${i}-${ii}-${iii}'`">
              <a :href="`${el.baseurl}${c.path}`">
                <span class="menu-text">{{ c.name }}</span>
              </a>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import RoutMenu from '@/router/menu'
  export default {
    props: {
      isCollapse: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {
        logo_lg: require('@/assets/logo3.png'),
        logo_mini: require('@/assets/logo3.png'),
        menu: [],
        menu_open: [],
        white_list: [
          [`${process.env.URL.USER}/#/userdetail`, 0],
          [`${process.env.URL.USER}/#/userdetail`, 0],
          [`${process.env.URL.USER}/#/cerdetail`, 0],
          [`${process.env.URL.NEWS}/#/subjectdetail`, 1],
          [`${process.env.URL.NEWS}/#/newsdetail`, 1],
          [`${process.env.URL.NEWS}/#/commentreplay`, 1],
          [`${process.env.URL.NEWS}/#/commentprise`, 1],
          [`${process.env.URL.VIP}/#/kinddetail`, 2],
          [`${process.env.URL.VIP}/#/logdetail`, 2],
          [`${process.env.URL.VIP}/#/marketdetail`, 2],
          [`${process.env.URL.VIP}/#/orderdetail`, 2],
          [`${process.env.URL.FINANCE}/#/auditdetail`, 5],
          [`${process.env.URL.FINANCE}/#/vipdetail`, 5],
          [`${process.env.URL.EXCHANGE}/#/selldetail`, 6],
          [`${process.env.URL.EXCHANGE}/#/orderdetail`, 6],
          [`${process.env.URL.EXCHANGE}/#/evaluatedetail`, 7],
          [`${process.env.URL.EXCHANGE}/#/putstoragedetail`, 7],
          [`${process.env.URL.EXCHANGE}/#/popstoragedetail`, 7],
          [`${process.env.URL.FRIENDS}/#/socialdetail`, 8],
          [`${process.env.URL.SYSTEM}/#/aboutusdetail`, 9],
          [`${process.env.URL.SYSTEM}/#/protocoldetail`, 9],
          [`${process.env.URL.SYSTEM}/#/halldetail`, 9],
        ]
      }
    },
    mounted () {
      let that = this
      if(localStorage.getItem('admin_rights')) {
        let rolelist = ['', '', '', '', '', '', '', '', '']
        /* 运营管理菜单，暂时不显示 [OperationR, '', 'fa-newspaper-o']*/
        let val = localStorage.getItem('admin_rights')
        if (val) {
          let roles = val.split(',')

          for (let k in roles) {
            switch (roles[k]) {
              case 'user':
                rolelist.splice(0, 1, [RoutMenu.user, `${process.env.URL.USER}/#`, 'fa-users'])
                break
              case 'news':
                rolelist.splice(1, 1, [RoutMenu.news, `${process.env.URL.NEWS}/#`, 'fa-newspaper-o'])
                break
              case 'vip':
                rolelist.splice(2, 1, [RoutMenu.vip, `${process.env.URL.VIP}/#`, 'fa-balance-scale'])
                break
              case 'dict':
                rolelist.splice(3, 1, [RoutMenu.dict, `${process.env.URL.DICT}/#`, 'fa-newspaper-o'])
                break
              case 'market':
                rolelist.splice(4, 1, [RoutMenu.finance, `${process.env.URL.FINANCE}/#`, 'fa-money'])
                rolelist.splice(5, 1, [RoutMenu.exchange, `${process.env.URL.EXCHANGE}/#`, 'fa-truck'])
                rolelist.splice(6, 1, [RoutMenu.goods, `${process.env.URL.EXCHANGE}/#`, 'fa-google-wallet'])
                break
              case 'friends':
                rolelist.splice(7, 1, [RoutMenu.friends, `${process.env.URL.FRIENDS}/#`, 'fa-life-buoy'])
                break
              case 'system':
                rolelist.splice(8, 1, [RoutMenu.system, `${process.env.URL.SYSTEM}/#`, 'fa-gear'])
                break
              default:
                break
            }
          }

          let list = []
          for (let k in rolelist) {
            if (rolelist[k] !== '') {
              list.push(rolelist[k])
            }
          }

          that.setMenu(list)

        }
      }
    },
    methods: {
      setMenu (arr) {
        let total_menu = []
        let c_url = window.location.href
        this.menu_open = []

        /**
         * 生成菜单
         * */
        for(let m=0,mlen=arr.length; m<mlen; m++) {
          let ck = []
          let menu = {}
          let module = arr[m][0]
          let baseurl = arr[m][1]
          let icon = arr[m][2]

          for(let key in module) {
            if(module[key].notmenu) {   //  不是菜单
              continue
            }
            let url = module[key].path
            if(url !== '/' && (baseurl+url) === c_url) {
              this.menu_open = [`'${m}'`]
            }

            /**
             * 是否有父级菜单
             * */
            if(module[key].parentpos ) {
              let i = parseInt(module[key].parentpos)
              if(ck[i] && ck[i].children && ck[i].children.length) {
                ck[i].children.push(module[key])
              }else {
                ck.splice(i, 0, {
                  name: module[key].parentname,
                  children: [
                    module[key]
                  ]
                })
              }
            }else {
              if(module[key].path === '/') {
                menu = module[key]
              }else {
                ck.push(module[key])
              }
            }
          }

          menu.route = ck
          menu.baseurl = baseurl
          menu.icon = icon

          total_menu.push(menu)
        }

        this.menu = total_menu

        /**
         * 判断是否在白名单(一般为详情页）
         * */
        if(!this.menu_open.length) {
          let current_url = c_url.substr(0, c_url.indexOf('?'))
          for(let k in this.white_list) {
            if(this.white_list[k][0] === current_url) {
              this.menu_open = [`'${this.white_list[k][1]}'`]
              break
            }
          }
        }
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .logo {
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: block;
    img {
      max-height: 30px;
      vertical-align: middle;
    }
  }

  .slide-wrapper {
    min-height: 100vh;
    background: #324157;

    &.close {
      width: 64px;
    }
    &.open {
      width: 180px;
      .el-menu-vertical-demo {
        width: 180px;
      }
    }
    a {
      color: #bfcbd9;
      text-decoration: none;
    }
    .is-active {
      > a {
        color: #20a0ff;
      }
    }

    .el-menu&#45;&#45;collapse {
      .el-submenu .el-submenu {
        .el-submenu__title {
          padding-left: 40px !important;
        }
      }
      border-radius: 0;
    }

    .el-submenu .el-menu-item, .el-submenu .el-submenu .el-submenu__title {
      height: 40px;
      line-height: 40px;
    }
    .el-submenu__icon-arrow {
      margin-top: -3px;
    }
    .el-menu-item {
      padding: 0 !important;
      min-width: 0 !important;
      a {
        padding-left: 40px;
        display: block;
      }
    }

    .el-menu .el-menu .el-menu .el-menu-item a {
      padding-left: 60px;
    }
  }
</style>
-->
