<template>
  <el-row class="app-header">
    <el-col :span="14">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="4" :offset="6">
      <el-dropdown>
        <span><img width="30" :src="$store.state.user.photo"></span>
        <span class="el-dropdown-link">
          {{$store.state.user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <!-- 给组件注册原生事件 @原生事件类型.native="事件处理函数" -->
          <el-dropdown-item @click.native="handleLogOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      // userInfo: {}
    }
  },
  created() {
    // this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  },
  methods: {
    handleLogOut() {
      this.$confirm('确认退出吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // 清除本地缓存
        window.localStorage.removeItem('user_info')
        // 跳转到登录页面
        this.$router.push({
          name: 'login'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
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
