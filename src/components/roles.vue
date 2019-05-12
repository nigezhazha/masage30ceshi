<template>
  <div class="users-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <el-button type="danger" @click="addVisible=true" plain>添加按钮</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- 第一级row -->
          <el-row v-for="(level1,index) in props.row._children" :key="index">
            <el-col :span="6">
              <!-- 第一级tag -->
              <el-tag
                type="primary"
                :key="level1.id"
                @close="delRight(props.row,level1.id)"
                closable
              >{{level1.authName}}</el-tag>
              <span class="el-icon-arrow-right"></span>
            </el-col>
            <el-col :span="18">
              <el-row v-for="(level2,i) in level1.children" :key="i">
                <el-col :span="6">
                  <!-- 第二级tag -->
                  <el-tag
                    type="success"
                    :key="level2.id"
                    @close="delRight(props.row,level2.id)"
                    closable
                  >{{level2.authName}}</el-tag>
                  <span class="el-icon-arrow-right"></span>
                </el-col>
                <el-col :span="18">
                  <el-row>
                    <el-col :span="6"></el-col>
                    <el-col :span="18">
                      <!-- 第三级tag -->
                      <el-tag
                        v-for="(level3,j) in level2.children"
                        type="warning"
                        :key="level3.id"
                        @close="delRight(props.row,level3.id)"
                        closable
                        class="my-tag"
                      >{{level3.authName}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column prop="address" label="操作">
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
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            plain
            @click="handleRole(scope.row)"
          ></el-button>
          <!-- <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="handleRole(scope,row)"
          ></el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增角色框 -->
    <el-dialog title="添加角色" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 树形角色框 -->
    <el-dialog title="分配权限" :visible.sync="rightsVisible">
      <el-tree
        :data="rightsData"
        :props="rightsProps"
        :default-checked-keys="defaultCheckedKeys"
        node-key="id"
        ref="tree"
        show-checkbox
        default-expand-all
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rightsVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="submitForm('rightsForm')">确 定</el-button> -->
        <el-button type="primary" @click="setRolesRights">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色框 -->
    <el-dialog title="编辑角色" :visible.sync="editVisible">
      <el-form :model="editForm" :rules="addRules" ref="editForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="editForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "roles",
  data() {
    return {
      tableData: [
        {
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
      addVisible: false,
      addForm: {
        roleName: "",
        roleDesc: ""
      },
      addRules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      // 是否显示编辑框
      editVisible: false,
      // 编辑的数据
      editForm: {
        roleName: "",
        roleDesc: ""
      },
      rightsVisible: false,
      rightsForm: {},
      rightsData: [],
      rightsProps: {
        children: "children",
        label: "authName"
      },
      defaultCheckedKeys: []
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    handleEdit(index, row) {
      this.$request.getRolesById(row.id).then(res => {
        // console.log(res);
        // 保存起来
        this.editForm = res.data.data;
        // 弹框
        this.editVisible = true;
      });
    },
    handleDelete(index, row) {
      this.$confirm(
        "此操作将永远删除这个角色，是否确定，友情提示别删主管！！！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          // 调用接口即可
          this.$request.deleteRoles(row.id).then(res => {
            // console.log(res);
            if (res.data.meta.status == 200) {
              this.getRoles();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleRole(row) {
      this.rightsVisible = true;
      this.rightsForm = row;
      this.$request.getRightsTree().then(res => {
        this.rightsData = res.data.data;
        let checkedIds = [];
        // 挨个遍历方法
        // row._children.forEach(v1=>{
        //   checkedIds.push(v1.id);
        //   v1.children.forEach(v2=>{
        //      checkedIds.push(v2.id);
        //        v2.children.forEach(v3=>{
        //      checkedIds.push(v3.id);
        //   })
        //   })
        // });

        // 递归遍历方法
        function getCheckedKeys(item) {
          item._children.forEach(v => {
            // checkedIds.push(v.id);
            if (v.children) {
              v._children = v.children;
              getCheckedKeys(v);
            }else{
              checkedIds.push(v.id);
            }
          });
        }
        getCheckedKeys(row);
        console.log(checkedIds);
        //设置到data中
        this.defaultCheckedKeys = checkedIds;
      });
    },
    getRoles() {
      this.$request.getRoles().then(res => {
        let data = res.data.data;
        data.forEach(v => {
          v._children = v.children;
          delete v.children;
        });
        console.log(data);
        this.tableData = data;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "editForm") {
            // 提交数据
            this.editForm.id = this.editForm.roleId;
            this.$request.updateRoles(this.editForm).then(res => {
              console.log(res);
              this.editVisible = false;
              this.getRoles();
              this.$refs[formName].resetFields();
            });
          } else {
            this.$request.addRoles(this.addForm).then(res => {
              console.log(res);
              // 关闭弹框
              this.addVisible = false;
              // 重新获取数据
              this.getRoles();
              // 重置表单即可
              this.$refs[formName].resetFields();
            });
          }
        } else {
          this.$message.error("格式不对请重新输入");
          return false;
        }
      });
    },
    //删指定权限
    delRight(row, rightId) {
      console.log(row.id, rightId);
      this.$request
        .deleteRight({
          roleId: row.id,
          rightId
        })
        .then(res => {
          row._children = res.data.data;
        });
    },
    setRolesRights() {
      console.log(this.$refs.tree.getCheckedKeys());
      // const rids = this.$refs.tree.getCheckedKeys().join(',')
      let oldefs = this.$refs.tree.getCheckedKeys();
      let newrefs = this.$refs.tree.getHalfCheckedKeys();
      let rids = oldefs.concat(newrefs).join();
      this.$request
        .setRolesRights({
          roleId: this.rightsForm.id,
          rids
        })
        .then(res => {
          if (res.data.meta.status == 200) {
            this.rightsVisible = false;
            this.getRoles();
          }
          this.$request.getMenus().then(res => {
            console.log(res);
            // this.menuList = res.data.data
            this.$store.commit("changeMenuList", res.data.data);
          });
        });
    }
  }
};
</script>

<style lang='scss'>
.my-breadcrumb {
  height: 45px;
  line-height: 45px;
}
.my-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
