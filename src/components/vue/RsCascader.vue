<template>
  <div>
    <slot name="cascader" :change="handleChange"></slot>
  </div>
</template>

<script>
  /** @vue */
  export default {
    mounted () {
      $(document).on('mouseup', '.el-cascader-menus .el-cascader-menu li', () => {
        $('.el-cascader-menus').css('display', 'none')
      }).on('click', '.el-cascader', () => {
        $('.el-cascader-menus').css('display', '')
      })
    },
    methods: {
      handleChange(val) {
        let ul = $('.el-cascader-menus .el-cascader-menu').eq(1)
        setTimeout(() => {
          if(!(ul.find('li') && ul.find('li').length > 0)) {
            ul.hide()
          }else {
            ul.show()
          }
        }, 200)
      },
    }
  }
</script>
