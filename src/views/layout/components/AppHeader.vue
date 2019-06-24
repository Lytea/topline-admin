<template>
  <el-row class="app-header">
    <el-col :span="14">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="4" :offset="6">
      <el-dropdown>
        <span><img width="30" src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi" alt=""></span>
        <span class="el-dropdown-link">
          14797356373<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
      return {}
  }
}
</script>

<style lang="less" scoped>
.app-header{
  height: 60px;
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  vertical-align: middle;
  cursor: pointer;
  color: #000;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-selfdefine {
  vertical-align: middle
}
</style>
