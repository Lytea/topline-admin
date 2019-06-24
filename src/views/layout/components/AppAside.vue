<template>
  <el-menu
    default-active="2"
    @open="handleOpen"
    @close="handleClose"
    router
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="2">
      <i class="iconfont iconhome"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="/content">
      <template slot="title">
        <i class="iconfont iconneirong"></i>
        <span>内容</span>
      </template>
      <el-menu-item index="/publish">
        <i class="iconfont iconedit-2"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/contentList">
        <i class="iconfont iconmenu1"></i>
        <span slot="title">内容列表</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="iconfont iconcommend"></i>
        <span slot="title">评论列表</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="iconfont iconsucai"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="/fans">
      <template slot="title">
        <i class="iconfont iconfensi"></i>
        <span>粉丝管理</span>
      </template>
      <el-menu-item index="3-1">
        <i class="iconfont iconiconfontpaixingbang"></i>
        <span slot="title">图文数据</span>
      </el-menu-item>
      <el-menu-item index="3-2">
        <i class="iconfont iconpersonalinfo"></i>
        <span slot="title">粉丝概况</span>
      </el-menu-item>
      <el-menu-item index="3-3">
        <i class="iconfont iconfensihuaxiang"></i>
        <span slot="title">粉丝画像</span>
      </el-menu-item>
      <el-menu-item index="3-4">
        <i class="iconfont iconfensiliebiao"></i>
        <span slot="title">粉丝列表</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/account">
      <i class="el-icon-setting"></i>
      <span slot="title">账户设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  margin-right: 10px
}
</style>
