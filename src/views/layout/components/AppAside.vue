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
    <el-submenu index="1">
      <template slot="title">
        <i class="iconfont iconneirong"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item index="1-2">
        <i class="iconfont iconedit-2"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="1-3">
        <i class="iconfont iconmenu1"></i>
        <span slot="title">内容列表</span>
      </el-menu-item>
      <el-menu-item index="1-4">
        <i class="iconfont iconcommend"></i>
        <span slot="title">评论列表</span>
      </el-menu-item>
      <el-menu-item index="1-5">
        <i class="iconfont iconsucai"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="iconfont iconfensi"></i>
        <span>粉丝管理</span>
      </template>
      <el-menu-item index="2-2">
        <i class="iconfont iconiconfontpaixingbang"></i>
        <span slot="title">图文数据</span>
      </el-menu-item>
      <el-menu-item index="2-3">
        <i class="iconfont iconpersonalinfo"></i>
        <span slot="title">粉丝概况</span>
      </el-menu-item>
      <el-menu-item index="2-4">
        <i class="iconfont iconfensihuaxiang"></i>
        <span slot="title">粉丝画像</span>
      </el-menu-item>
      <el-menu-item index="2-5">
        <i class="iconfont iconfensiliebiao"></i>
        <span slot="title">粉丝列表</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="4">
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
