<template>
  <div id="login-wrap">
      <div class="login-form-wrap">
          <div class="login-head">
              <img src="./logo_index.png" alt="黑马头条">
          </div>
          <div class="login-form">
              <el-form :rules="rules" ref="ruleForm" :model="LoginForm">
                <el-form-item prop="mobile">
                <el-input v-model="LoginForm.mobile" placeholder='请输入手机号'></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-col :span='10'>
                        <el-input v-model="LoginForm.code" placeholder='验证码'></el-input>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <!-- <el-button @click="handleSendCode">{{content}}</el-button> -->
                        <el-button
                          @click="handleSendCode"
                          :disabled="!!codeTimer || codeLoading"
                        >
                          {{codeTimer ? `${codeSeconds}后重新发送` : '发送验证码'}}
                        </el-button>
                    </el-col>
                </el-form-item>
                <el-form-item prop="agree">
                   <el-checkbox v-model="LoginForm.agree"></el-checkbox>
                   <span>我已同意<a href="#">用户协议</a>和<a href="#">隐私协议</a></span>
                </el-form-item>
                <el-button
                  class="btn-login"
                  type="primary"
                  @click="handleLogin"
                  :loading="loginLoading"
                >登录</el-button>
              </el-form>
           </div>
      </div>
  </div>
</template>
<script>
// import axios from 'axios'
import '@/vendor/gt.js'
const initCodeSeconds = 60
export default {
  name: 'AppLogin',
  data() {
    return {
      codeLoading: false,
      sendMobile: '', // 保存初始化验证码之后发送短信的手机号
      codeSeconds: initCodeSeconds, // 倒计时的时间
      codeTimer: null, // 倒计时定时器
      // 表单数据
      LoginForm: {
        mobile: '14797356373',
        code: '',
        agree: ''
      },
      // 登录按钮的loading状态
      loginLoading: false,
      // 表单验证规则
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '长度必须为11个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度必须为6个字符', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意用户协议', trigger: 'change' },
          { pattern: /true/, message: '请同意用户协议', trigger: 'change' }
        ]
      },
      //   通过initGeetest得到的极验验证码对象
      captchaObj: null
    }
  },
  methods: {
    handleSendCode() {
      // 检测手机号是否有效
      this.$refs['ruleForm'].validateField('mobile', errorMessage => {
        // console.log(errorMessage)发送验证码成功提示消息为空发送失败提示消息为那个错误信息
        if (errorMessage.trim().length > 0) {
          return
        }
        // 验证码有效后，初识验证码插件
        // this.showGeetest()
        // 如果用户输入的手机号和之前初始化的验证码手机号不一致，就基于当前手机号码重新初始化
        // 否则，直接verify显示
        if (this.captchaObj) {
          if (this.LoginForm.mobile !== this.sendMobile) {
            // 初始化之前，需要把之前的dom元素删除
            document.body.removeChild(document.querySelector('.geetest_panel'))
            // 手机号发生改变 重新初始化
            this.showGeetest()
          } else {
            this.captchaObj.verify()
          }
        } else {
          // 这里是第一次初始化验证码插件
          this.showGeetest()
        }
      })
    },
    showGeetest() {
      this.codeLoading = true
      this.$http({
        method: 'GET',
        url: `/captchas/${this.LoginForm.mobile}`
      }).then(data => {
        // const data = res.data.data
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
          captchaObj.onReady(() => {
            this.codeLoading = false
            this.sendMobile = this.LoginForm.mobile
            // 显示验证码
            captchaObj.verify()
          }).onSuccess(() => {
            // console.log(captchaObj.getValidate())
            const {
              geetest_challenge: challenge,
              geetest_validate: validate,
              geetest_seccode: seccode } =
            captchaObj.getValidate()
            this.$http({
              method: 'GET',
              url: `/sms/codes/${this.LoginForm.mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            }).then(data => {
              // 发送短信之后开始倒计时
              this.codeCodeDown()
            })
          })
        })
      })
    },
    handleLogin() {
      // 表单组件有一个方法validate可以用于获取当前表单的验证状态
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          return
        }
        // 表单验证通过提交登录
        this.submitLogin()
      })
    },
    submitLogin() {
      this.loginLoading = true
      this.$http({
        method: 'POST',
        url: '/authorizations',
        data: this.LoginForm
      }).then(data => {
        // 登录成功，将接口返回的用户信息数据放到本地存储
        window.localStorage.setItem('user_info', JSON.stringify(data))
        this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        })
        this.loginLoading = false
        // console.log(res.data)
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        if (err.response.status === 400) {
          this.$message.error('登录失败')
        }
        this.loginLoading = false
      })
    },
    /*
    倒计时
    */
    codeCodeDown() {
      this.codeTimer = window.setInterval(() => {
        this.codeSeconds--
        if (this.codeSeconds <= 0) {
          this.codeSeconds = this.initCodeSeconds // 让定时器回到最初状态
          window.clearInterval(this.codeTimer) // 清除定时器
          this.codeTimer = null // 清除定时器的标志
        }
      }, 1000)
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
    background-image: url(./login_bg.jpg);
    background-size: cover;
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
