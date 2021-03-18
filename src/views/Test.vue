<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录！</h3>
      <el-form-item label="账号">
        <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item label="身份">
        <el-radio v-model="form.status" label="teacher">教师</el-radio>
        <el-radio v-model="form.status" label="student">学生</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button v-on:click="resetForm('form')">重置</el-button>
        <el-button type="primary" v-on:click="onSubmit('form')">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-link type="primary" :underline="false" @click="toRegister">没有账号？去注册</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      form: {
        username: '',
        password: '',
        status: ''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择身份信息', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    onSubmit() {
      // 为表单绑定验证功能
      this.form.t_id = this.form.username
      let that = this
      if (this.checkForm()) {
        this.$axios.post('/login', this.form)
          .then(function (response) {
            console.log(response);
            if (response.status === 200) {
              if (response.data.returnCode === "200") {
                that.$message({
                  message: '登录成功',
                  type: 'success'
                });
                // console.log(response.data.bean.id)
                localStorage.setItem('isLogin', true)
                localStorage.setItem('usrinfo', JSON.stringify(response.data.bean))
                localStorage.setItem('id', response.data.bean.id)
                that.$router.push("/")
              } else {
                that.$message({
                  message: response.data.returnMessage,
                  type: 'warning'
                })
              }
            }
          }).catch(function (error) {
          console.log(error);
        });
      }
    },
    checkForm() {
      if (this.form.username === '') {
        this.$message('请输入账号');
        return false;
      } else if (this.form.password === '') {
        this.$message('请输入密码')
        return false;
      } else if (this.form.status === '') {
        this.$message('请选择登录身份信息')
        return false;
      } else {
        return true;
      }
    },
    resetForm() {
      for (let formKey in this.form) {
        this.form[formKey] = ''
      }
    },
    toRegister() {
      this.$router.push({path: "/register"})
    }
  }
}
</script>

<style>
.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}

.el-form-item__content {
  text-align: end;
  line-height: 0;
}

.el-radio {
  margin-top: 14px;
}
</style>
