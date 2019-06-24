<template>
  <el-container>
    <el-aside width="200px">
      <AppAside/>
    </el-aside>
    <el-container>
      <el-header>
        <AppHeader/>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
export default {
  name: 'AppLayout',
  components: {
    AppAside,
    AppHeader
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.el-container{
  height: 100%;
}
.el-aside{
  background-color: #ccc;
}
.el-header{
  background-color: #ffffff;
}
.el-main{
  background-color: pink;
}
</style>
