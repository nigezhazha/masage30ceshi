<template>
  <div class="users-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <el-button type="danger" plain>添加按钮</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="serial" label="#" width="40"></el-table-column>
      <el-table-column prop="name" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="date" label="角色描述" width="180"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "roles",
  data() {
    return {
      tableData: [
        {
          serial: 1,
          name: "王小虎",
          date: "2016-05-02",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          serial: 2,
          name: "王小虎",
          date: "2016-05-04",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          serial: 3,
          name: "王小虎",
          date: "2016-05-01",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          serial: 4,
          name: "王小虎",
          date: "2016-05-03",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>

<style lang='scss'>
.my-breadcrumb {
  height: 45px;
  line-height: 45px;
}
</style>
