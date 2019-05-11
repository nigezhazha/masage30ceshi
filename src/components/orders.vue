<template>
  <div class="users-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
   <!-- table -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="order_number" label="订单标号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
      <el-table-column prop="order_price" label="是否付款" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.pay_status==0" type="danger" plain>未付款</el-button>
          <el-button v-else type="success" plain>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column label="是否发货">
        <template slot-scope="scope">{{ scope.row.create_time|formatTime }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="editVisible=true"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="1"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
      <!-- 编辑框 -->
    <el-dialog title="修改订单地址" :visible.sync="editVisible">
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="省市区/县" label-width="120px">
          <!-- <el-input v-model="editForm.userName" autocomplete="off"></el-input> -->
            <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
          ></el-cascader>
           <v-distpicker></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px">
          <el-input v-model="editForm.addres" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import options from "../assets/city_data2017_element.js";
import VDistpicker from 'v-distpicker'
export default {
  name: "orders",
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
      ],
      
      // 接口调用数据
      orderData: {
        pagenum: 1,
        pagesize: 10
      },
      // 编辑框是否显示
      editVisible: false,
      editForm: {
        address: ""
      },
      // 级联选择器数据
      options,
       // 选中的数据
      selectedOptions2:[]
    };
  },
    // 本地注册组件
  components: { VDistpicker },
  filters:{
    formatTime(value){
      return moment(value).format("YYY-MM-DD HH:mm:ss")
    }
  },
  created() {
    this.$request.getOrderList(this.orderData).then(res=>{
      this.tableData = res.data.data.goods;
    })
  },
};
</script>

<style lang='scss'>
.my-breadcrumb {
  height: 45px;
  line-height: 45px;
}
</style>
