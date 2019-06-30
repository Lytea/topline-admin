<template>
  <el-card>
    <div slot="header">
      <span>账户设置</span>
    </div>
    <el-row>
      <el-col :span="8">
        <el-form>
          <el-form-item label="媒体名称">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体简介">
            <el-input v-model="userInfo.intor"></el-input>
          </el-form-item>
          <!-- :value用于单向绑定，希望数据改变视图，视图不能改变数据 -->
          <el-form-item label="头条号ID">
            <el-input disabled :value="userInfo.id && userInfo.id.toString()"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机">
            <el-input disabled :value="userInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUpdate">保存更新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" :offset="2"></el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.loadUser()
  },
  methods: {
    // 加载个人账户信息
    loadUser() {
      this.$http({
        method: 'GET',
        url: '/user/profile'
      }).then(data => {
        // console.log(data)
        this.userInfo = data
      })
    },
    handleUpdate() {
      const { name, intro, email } = this.userInfo
      this.$http({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name,
          intro,
          email
        }
      }).then(() => {
        this.$message({
          type: 'success',
          message: '修改用户信息成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('修改用户信息失败')
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
