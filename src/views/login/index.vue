<template>
  <div id="login-wrap">
      <div class="login-form-wrap">
          <div class="login-head">
              <img src="./logo_index.png" alt="黑马头条">
          </div>
          <div class="login-form">
              <el-form ref="form" :model="form">
                <el-form-item>
                <el-input v-model="form.mobile" placeholder='请输入手机号'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-col :span='10'>
                        <el-input v-model="form.code" placeholder='验证码'></el-input>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-button>获取验证码</el-button>
                    </el-col>
                </el-form-item>
                <el-button class="btn-login" type="primary" @click="onSubmit">登录</el-button>
              </el-form>
           </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'AppLogin',
  data() {
    return {
      form: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style lang='less' scoped>
#login-wrap{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form-wrap{
        padding: 70px;
        background: #fff;
        .login-head{
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            img{
              width: 200px;
            }
        }
        .login-form {
          .btn-login {
              width: 100%;
          }
        }
    }
}
</style>
