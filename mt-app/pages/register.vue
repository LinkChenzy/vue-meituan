<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确定密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register"
            >同意以下协议并注册</el-button
          >
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank"
            >《美团网用户协议》</a
          >
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'
export default {
  layout: 'blank',
  data() {
    return {
      error: '',
      statusMsg: '',
      // 表单的集合
      ruleForm: {
        name: '',
        email: '',
        code: '',
        pwd: '',
        cpwd: ''
      },
      // 表单的验证规则
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'blur'
          },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            type: 'string',
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        cpwd: [
          {
            required: true,
            type: 'string',
            message: '确定密码',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('确认密码不能为空！'))
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入的密码不一致！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    sendMsg() {
      const _this = this
      const ruleForm = this.ruleForm
      let namePass, emailPass
      if (this.timerid) {
        return false
      }
      this.$refs.ruleForm.validateField('name', valid => {
        namePass = valid
      })
      this.$refs.ruleForm.validateField('email', valid => {
        emailPass = valid
      })
      if (!namePass && !emailPass) {
        this.$axios
          .post('/users/verify', {
            username: encodeURIComponent(ruleForm.name),
            email: ruleForm.email
          })
          .then((status, data) => {
            if (status === 200 && data && data.code === 0) {
              // 定时器显示验证码倒计时
              let count = 60
              _this.statusMsg = `验证码已发出，剩余${count}秒`
              _this.timerid = setInterval(function() {
                _this.statusMsg = `验证码已发送,剩余${count--}秒`
                if (count === 0) {
                  clearInterval(_this.timerid)
                }
              }, 1000)
            } else {
              _this.statusMsg = data.msg
            }
          })
      }
    },
    register() {
      const _this = this
      const ruleForm = this.ruleForm
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$axios
            .post('/users/signup', {
              username: encodeURIComponent(ruleForm.name),
              email: ruleForm.email,
              code: ruleForm.code,
              password: CryptoJS.MD5(ruleForm.pwd).toString()
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  // 注册成功
                  window.location.href = '/login'
                } else {
                  // 注册失败
                  _this.error = data.msg
                }
              } else {
                // 服务器错误
                _this.error = `服务器出错，错误码:${status}`
              }
              setTimeout(function() {
                _this.error = ''
              }, 1500)
            })
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/register/index.scss';
</style>
