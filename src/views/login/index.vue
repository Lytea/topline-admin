<template>
  <div id="login-wrap">
      <div class="login-form-wrap">
          <div class="login-head">
              <img src="./logo_index.png" alt="黑马头条">
          </div>
          <div class="login-form">
              <el-form ref="form" :model="LoginForm">
                <el-form-item>
                <el-input v-model="LoginForm.mobile" placeholder='请输入手机号'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-col :span='10'>
                        <el-input v-model="LoginForm.code" placeholder='验证码'></el-input>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-button @click="handleSendCode">获取验证码</el-button>
                    </el-col>
                </el-form-item>
                <el-button class="btn-login" type="primary" @click="onSubmit">登录</el-button>
              </el-form>
           </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import '@/vendor/gt.js'
export default {
  name: 'AppLogin',
  data() {
    return {
      LoginForm: {
        mobile: '14797356373',
        code: ''
      },
      //   通过initGeetest得到的极验验证码对象
      captchaObj: null
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleSendCode() {
      const { mobile } = this.LoginForm
      if (this.captchaObj) {
        return this.captchaObj.verify()
      }
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        const data = res.data.data
        // console.log(res.data)
        window.initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          //   隐藏按钮式
          product: 'bind'
        }, (captchaObj) => {
          this.captchaObj = captchaObj
          //   这里可以调用验证实例 captchaObj 的实例方法
          captchaObj.onReady(function() {
            // 显示验证码
            captchaObj.verify()
          }).onSuccess(function() {
            console.log(captchaObj.getValidate())
            const {
              geetest_challenge: challenge,
              geetest_validate: validate,
              geetest_seccode: seccode } =
            captchaObj.getValidate()
            axios({
                method: 'GET',
                url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
                params: {
                  challenge,
                  validate,
                  seccode
                }
            }).then(res => {
                console.log(res)
            })
          })
        })
      })
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
