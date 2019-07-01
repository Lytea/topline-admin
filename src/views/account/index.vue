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
            <el-input v-model="userInfo.intro"></el-input>
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
      <!-- 头像上传 -->
      <el-col :span="4" :offset="2">
        <!-- el-upload用于上传组件，它会有自动的将用户选择的图片去请求上传，我们需要做的就是配置一下 -->
        <!-- action 请求地址 -->
        <!-- http-request 覆盖默认的上传行为 -->
        <!-- :src要绑定字段名为photo，调试工具可看到 -->
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :http-request="handleUpload">
          <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: 'AccountSetting',
  data() {
    return {
      userInfo: {},
      token: `Bearer ${JSON.parse(window.localStorage.getItem('user_info')).token}`
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
    // 修改账户信息
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
      }).then(data => {
        // 提交修改的用户信息
        this.$store.commit('changeUser', data)
        this.$message({
          type: 'success',
          message: '修改用户信息成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('修改用户信息失败')
      })
    },
    // 头像上传
    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    handleUpload(uploadConfig) {
    //   console.log(uploadConfig)
      // 上传文件
      // 1.需要创建一个formData对象
      // 2.将文件对象添加到FormData中
      // 3.将FormData配置到请求体data选项中
    //   photo是接口里要求data请求体必须传递的参数
      const formData = new FormData()
      formData.append('photo', uploadConfig.file)
      // console.log(formData)
      this.$http({
        method: 'PATCH',
        url: '/user/photo',
        data: formData
      }).then(data => {
        // console.log(data)
        // 让上传的头像实时的显示出来
        this.userInfo.photo = data.photo
        // 把修改后的照片信息实时的传给header中的信息
        this.$store.commit('changeUser', this.userInfo)
        this.$message({
          type: 'success',
          message: '头像上传成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('上传头像失败')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
