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
          <!-- 用户 -->
          <el-submenu
            v-for="(item, index) in $store.state.menuList"
            :key="index"
            :index="item.order"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item v-for="(it, i) in item.children" :key="i" :index="it.path">
              <i class="el-icon-menu"></i>
              {{it.authName}}
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
  data() {
    return {
      menuList: []
    };
  },
  beforeCreate() {
    if (!window.sessionStorage.getItem("token")) {
      this.$message.warning("请登陆");
      this.$router.push("login");
    }
  },
  created() {
    this.$request.getMenus().then(res => {
      console.log(res);
      // this.menuList = res.data.data
      this.$store.commit("changeMenuList", res.data.data);
    });
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("token");
      this.$router.push("login");
    }
  }
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
