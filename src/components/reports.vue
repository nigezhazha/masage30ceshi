<template>
<div class="users-container">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<div class="gif">
  <img src="../assets/gif.gif" alt="">
</div>
</div>
</template>

<script>
export default {
 name:'users'
}
</script>

<style lang='scss'>
.my-breadcrumb{
    height: 45px;
    line-height: 45px;
}
.gif{
  width: 900px;
}
.gif img{
  width: 100%;
}
</style>
