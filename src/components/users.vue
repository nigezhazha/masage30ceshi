<template>
  <div class="users-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="userData.query"  @keyup.native.13="getUsers" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain @click="addVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column prop="serial" label="#" width="40"></el-table-column> -->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mobile" label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->

          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="userData.pagenum"
      :page-sizes="[2, 4, 6, 10]"
      :page-size="userData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
       @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>
    <!-- 新增框 -->
      <el-dialog title="添加用户" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
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
      ],
      userData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      addVisible: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码也不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      },
      total:0
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
    },
    getUsers() {
      this.$request.getUsers(this.userData).then(res => {
        // console.log(res);
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
      });
    },
    handleDelete(index, row) {
      console.log(index);
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request.deleteUseUserById(row.id).then(res => {
            if (res.data.meta.status == 200) {
              this.getUsers();
            }
            // })({
            // type: 'success',
            // message: '删除成功!'
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    stateChange(row) {
      this.$request
        .updateUserStatus({ id: row.id, type: row.mg_state })
        .then(res => {
          console.log(res);
        });
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$request.addUser(this.addForm).then(res => {
            console.log(res);
            this.addVisible = false;
            this.getUsers();
            this.$refs[formName].resetFields();
          });
        } else {
          this.$message.error("格式不对请重新输入");
          return false;
        }
      });
    },
  sizeChange(size){
   this.userData.pagesize = size;
   this.getUsers()
  },
  currentChange(current){
   this.userData.pagenum = current;
   this.getUsers()
  },
  },
  created() {
    // this.$request.getUsers(this.userData).then(res => {
    //   console.log(res);
    //   this.tableData = res.data.data.users;
    this.getUsers();
  }
};
</script>

<style lang='scss'>
.my-breadcrumb {
  height: 45px;
  line-height: 45px;
}
</style>
