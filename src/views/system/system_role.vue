<template>
  <section class="container">
    <h1 style="font-size: 20px;margin-bottom: 20px">信息查询</h1>
    <div class="container_top" style="display: flex;flex-direction: row;">
      <el-form :model="form1" ref="form1">
        <el-form-item label="" label-width="0px" prop="name" :error="errorName">
          <el-input style="width: 250px" v-model="form1.userName" placeholder="请输入角色名" clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <div style="margin-left: 20px">
        <el-button @click="searchRole">查询</el-button>
        <el-button @click="getRoleList">重置</el-button>
        <el-button @click="dialogFormVisible = true">添加</el-button>
      </div>
    </div>
    <div class="container_center" style="margin-top: 30px">
      <h1 style="font-size: 20px;margin-bottom: 20px">{{title}}(共 {{total}} 条)</h1>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column
          label="角色"
          width="180"
          align="center"

        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.describe  }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="添加时间"
          width="250"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.crDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260" align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleAdmin(scope.$index, scope.row)">权限分配
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              slot="reference"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="container_bottom">

    </div>
    <el-dialog title="角色添加" :visible.sync="dialogFormVisible" width="500px" :modal-append-to-body='false'>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="角色" :label-width="formLabelWidth" prop="name" :error="errorName1">
          <el-input v-model="form.name" style="width:200px" placeholder="请输入角色名" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            maxlength="50"
            type="textarea"
            :rows="5"
            placeholder="请输入备注"
            v-model="form.textarea">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="角色编辑" :visible.sync="dialogFormVisible1" width="500px" :modal-append-to-body='false'>
      <el-form :model="form2" :rules="rules2" ref="form2">
        <el-form-item label="角色" :label-width="formLabelWidth" prop="name" :error="errorName2">
          <el-input v-model="form2.name" style="width:200px" placeholder="请输入角色名" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入备注"
            v-model="form2.textarea">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close1">取 消</el-button>
        <el-button type="primary" @click="ediRoleItem">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限设置" :visible.sync="dialogFormVisible2" width="750px" :modal-append-to-body='false'>
      <el-form :model="form3" ref="form2">
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="form3.name" style="width:200px"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                       style="margin-left: 30px">幼儿园管理
          </el-checkbox>
          <div style="display: flex;flex-direction: row;padding-left: 30px">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                         style="margin-left: 30px">园所管理
            </el-checkbox>
            <div style="margin: 15px 10px ;"></div>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                         style="margin-left: 30px">全选
            </el-checkbox>
            <div style="margin: 15px 10px ;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <el-checkbox :indeterminate="isIndeterminate6" v-model="checkAll6"  style="margin-left: 30px" @change="handleCheckAllChange1">系统管理
          </el-checkbox>
          <div style="display: flex;flex-direction: row;padding-left: 30px">
            <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1"
                         style="margin-left: 30px">系统角色
            </el-checkbox>
            <div style="margin: 15px 10px ;"></div>
            <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1"
                         style="margin-left: 30px">全选
            </el-checkbox>
            <div style="margin: 15px 10px ;"></div>
            <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
              <el-checkbox v-for="city in cities1" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div style="display: flex;flex-direction: row;padding-left: 30px">
            <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2"
                         style="margin-left: 30px">系统用户
            </el-checkbox>
            <div style="margin: 15px 10px ;"></div>
            <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2"
                         style="margin-left: 30px">全选
            </el-checkbox>
            <div style="margin: 15px 10px ;"></div>
            <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2">
              <el-checkbox v-for="city in cities2" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div style="display: flex;flex-direction: row;padding-left: 30px">
            <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3"
                         style="margin-left: 30px">幼儿园用户
            </el-checkbox>
            <div style="margin: 15px 3px ;"></div>
            <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3"
                         style="margin-left: 30px">全选
            </el-checkbox>
            <div style="margin: 15px 10px;"></div>
            <el-checkbox-group v-model="checkedCities3" @change="handleCheckedCitiesChange3">
              <el-checkbox v-for="city in cities3" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close2">取 消</el-button>
        <el-button type="primary" @click="ediRoleItem">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import * as apiRequest from '../../api/api'
  const cityOptions = ['添加', '编辑 ', '详情', '删除'];
  const cityOptions1 = ['添加', '编辑 ', '详情', '删除'];
  const cityOptions2 = ['添加', '编辑 ', '详情', '删除'];
  const cityOptions3 = ['添加', '编辑 ', '详情', '删除'];
  export default {
    data() {
      return {
        checkAll: false,
        checkAll1:false,
        checkAll2:false,
        checkAll3:false,
        checkAll6:false,
        checkedCities: ['上海', '北京'],
        checkedCities1: ['上海', '北京'],
        checkedCities2: ['上海', '北京'],
        checkedCities3: ['上海', '北京'],
        cities: cityOptions,
        cities1: cityOptions1,
        cities2: cityOptions2,
        cities3: cityOptions3,
        isIndeterminate: true,
        isIndeterminate1: true,
        isIndeterminate2: true,
        isIndeterminate3: true,
        isIndeterminate6: true,
        errorName: '',
        errorName1: '',
        errorName2: '',
        title: '角色信息列表',
        rules: {
          name: [
            {required: true, message: '请输入角色名', trigger: 'blur'},
          ],
        },
        rules2: {
          name: [
            {required: true, message: '请输入角色名', trigger: 'blur'},
          ],
        },
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        visible2: false,
        form: {
          textarea: '',
          name: '',
        },
        form2: {
          textarea: '',
          name: '',
        },
        form3: {
          // textarea:'',
          name: '',
        },
        formLabelWidth: '50px',
        form1: {
          userName: '',
        },
        total: '',
        tableData: [],
        itemsId: 0,
      }
    },
    mounted() {
      this.getRoleList()
    },
    methods: {
      //获取角色列表
      all_check(){
        if(this.checkAll1&&this.checkAll2&&this.checkAll3){
          this.checkAll6 = true
        }
      },
      getRoleList() {
        this.form1.userName = ''
        this.errorName = ''
        this.title = '角色信息列表'
        apiRequest.role({
          _index: 1,
          _size: 10,
          name: '',
          status: ''
        }).then(
          data => {
            if (data.code == 0) {
              this.tableData = data.data.records.reverse()
              this.total = data.data.total
            }
          }
        )
      },
      //查询角色
      searchRole() {
        if (this.form1.userName == '') {
          this.errorName = '请输入查询的角色名'
          return false
        }
        this.errorName = ''
        this.title = `搜索关键字 "${this.form1.userName}" `
        apiRequest.role({
          _index: 1,
          _size: 10,
          name: this.form1.userName,
          status: ''
        }).then(
          data => {
            if (data.code == 0) {
              this.tableData = data.data.records.reverse()
              this.total = data.data.total
            }
          }
        )
      },
      //添加角色
      add() {
        if (!this.form.name) {
          this.errorName1 = '请填写角色名'
          return false
        }
        apiRequest.addRole({
          name: this.form.name,
          describe: this.form.textarea
        }).then(
          data => {
            if (data.code == 0) {
              this.errorName1 = ''
              console.log(data)
              this.dialogFormVisible = false
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.$nextTick(() => {
                this.$refs['form'].resetFields()
              })
              this.getRoleList()
            } else {
              this.errorName1 = data.msg
            }
          }
        )
      },
      //删除角色
      del(id) {
        apiRequest.delRole({
          id: id
        }).then(
          data => {
            if (data.code == 0) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
          }
        )
      },
      close() {
        this.dialogFormVisible = false
        this.form = {}
        this.errorName1 = ''
        this.dialogFormVisible = false
        this.form2 = {}
        this.errorName2 = ''
      },
      close1() {
        this.dialogFormVisible1 = false
        this.form = {}
        this.errorName1 = ''
        // this.dialogFormVisible = false
        // this.form2 = {}
        this.errorName2 = ''

      },
      close2() {
        this.dialogFormVisible2 = false
      },
      //编辑角色
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogFormVisible1 = true
        this.form2.name = row.name
        this.form2.textarea = row.describe
        this.itemsId = row.id
        // apiRequest.ediRole({
        //   id:row.id
        // })
      },
      ediRoleItem() {
        if (!this.form2.name) {
          this.errorName2 = '请填写角色名'
          return false
        }
        apiRequest.ediRole({
          id: this.itemsId,
          name: this.form2.name,
          describe: this.form2.textarea
        }).then(
          data => {
            if (data.code == 0) {
              this.errorName2 = ''
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              console.log(data)
              this.dialogFormVisible1 = false
              this.getRoleList();
              this.$nextTick(() => {
                this.$refs['form2'].resetFields()
              })
            } else {
              this.errorName2 = data.msg
            }
          }
        )
      },
      //查询角色权限
      async searchItemRole(id){
        let res = await apiRequest.getRole({
          roleId:id
        })
        console.log(res)
        console.log('111111111111111')
      },
      handleAdmin(index, row) {
        this.form3.name = row.name
        this.dialogFormVisible2 = true
        this.searchItemRole(row.id)
      },
      handleDelete(index, row) {
        console.log(index, row);
        console.log(row.id)
        this.$confirm('执行删除操作时，该角色信息将被删除，请谨慎操作。是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          apiRequest.delRole({
            id: row.id
          }).then(
            data => {
              if (data.code == 0) {
                this.getRoleList()
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }
              else {
                this.$alert(data.msg, '提示', {
                  confirmButtonText: '确定',
                  // center:true
                  callback: action => {
                    this.$message({
                      type: 'error',
                      message: '删除失败'
                    });
                  }
                });

              }

            }
          )
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });

      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleCheckAllChange1(val) {
        this.checkedCities1 = val ? cityOptions : [];
        this.isIndeterminate1 = false;
      },
      handleCheckedCitiesChange1(value) {
        let checkedCount = value.length;
        this.checkAll1 = checkedCount === this.cities1.length;
        this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.cities1.length;
      },
      handleCheckAllChange2(val) {
        this.checkedCities2 = val ? cityOptions2 : [];
        this.isIndeterminate2 = false;
      },
      handleCheckedCitiesChange2(value) {
        let checkedCount = value.length;
        this.checkAll2 = checkedCount === this.cities2.length;
        this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.cities2.length;
      },
      handleCheckAllChange3(val) {
        this.checkedCities3 = val ? cityOptions3 : [];
        this.isIndeterminate3 = false;
      },
      handleCheckedCitiesChange3(value) {
        let checkedCount = value.length;
        this.checkAll3 = checkedCount === this.cities3.length;
        this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.cities3.length;
      },
    }
  }
</script>
