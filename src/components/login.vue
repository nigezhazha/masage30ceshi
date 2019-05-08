<template>
  <div class="login">
    <div class="center-box">
      <h2 class="yhdl">用户登录</h2>
      <el-form
        :model="loginForm"
        ref="loginForm"
        :rules="loginRules"
        label-position="top"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button class="dl-btn" type="primary">登录</el-button> -->
          <el-button class="my-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button class="my-btn" type="danger" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  // created() {
  //   this.$request.sayHi();
  // },
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入账户", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        userpassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) { 
          // alert("submit!");
          this.$request.login(this.loginForm).then(res=>{
             console.log(res);
            if(res.data.meta.status===400){
              this.$message.warning(res.data.meta.msg)
            }else if(res.data.meta.status===200){
              this.$message.success(res.data.meta.msg)
              window.sessionStorage.setItem('token',res.data.data.token)
              this.$router.push('/')
            }
          })
        } else {
          console.log("error submit!!");
          this.$message.error('失败')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  // background-color: #324152;
  .login {
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.center-box {
  width: 480px;
  height: 360px;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px 35px;
  box-sizing: border-box;
  .dl-btn {
    width: 100%;
  }
}
.yhdl {
  margin: 0;
  padding: 0;
}
.my-btn{
  // width: 100%;
}
</style>
