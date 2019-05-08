<template>
  <el-container class="index-container">
    <el-header class="index-header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../assets/6f541df7a0166ff5ea08ef8453556717.png" alt>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <h2>Bug顺其自然家族</h2>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="danger" icon="el-icon-delete" circle @click="logout"></el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="index-aside">
        <el-menu router default-active="2" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>用户列表
            </el-menu-item>
            <!-- <el-menu-item index="1-2"> <i class="el-icon-menu"></i>选项2</el-menu-item> -->
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">
              <i class="el-icon-menu"></i>角色列表
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-menu"></i>权限列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="goods">
              <i class="el-icon-menu"></i>商品列表
            </el-menu-item>
            <el-menu-item index="params">
              <i class="el-icon-menu"></i>分类参数
            </el-menu-item>
            <el-menu-item index="categories">
              <i class="el-icon-menu"></i>商品分类
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="orders">
              <i class="el-icon-menu"></i>订单列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="reports">
              <i class="el-icon-menu"></i>数据报表
            </el-menu-item>
           
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  beforeCreate() {
    if(!window.sessionStorage.getItem('token')){
      this.$message.warning('请登陆');
      this.$router.push('login')
    }
  },
  methods: {
    logout(){
      window.sessionStorage.removeItem('token')
      this.$router.push('login')
    }
  },
};
</script>

<style lang='scss'>
* {
  margin: 0;
  padding: 0;
}
.index-container {
  height: 100%;
  .index-header {
    background-color: #b3c0d1;
    // height: 60px;
    line-height: 60px;
  }
  .index-aside {
    background-color: skyblue;
  }
  .index-main {
    background-color: #e9eef3;
  }
}
.grid-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-purple-light {
  color: #e93421;
}
.bg-purple img {
  height: 60px;
}
.bg-purple {
  height: 60px;
  line-height: 60px;
}
</style>
