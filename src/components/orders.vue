<template>
  <div class="users-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="serial" label="#" width="40"></el-table-column>
      <el-table-column prop="name" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="name" label="订单价格" width="180"></el-table-column>
      <el-table-column prop="address" label="是否付款"></el-table-column>
      <el-table-column prop="address" label="否"></el-table-column>
      <el-table-column prop="date" label="下单时间"></el-table-column>
    </el-table>
    <el-pagination
      :current-page="1"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "users",
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
