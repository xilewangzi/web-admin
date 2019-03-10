<template>
  <section class="container">
    <h1 style="font-size: 20px;margin-bottom: 20px">信息查询</h1>
    <div class="container_top" style="display: flex;flex-direction: row;">
      <el-form :model="form1" ref="form1">
        <el-form-item label="" label-width="0px" prop="name" :error="errorName">
          <el-select v-model="form1.userName" placeholder="请选择班次">
            <el-option
              v-for="item in options"
              :key="item.type"
              :label="item.name"
              :value="item.type">
            </el-option>
          </el-select>
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
          label="上班类型"
          width="180"
          align="center"

        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.type==107?"全天班": scope.row.type==108?"早班":scope.row.type==109?"晚班":''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="工作时间"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.startTime | dateformat('HH:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="下班时间"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.endTime | dateformat('HH:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260" align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleAdmin(scope.$index, scope.row)">详情
            </el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
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
    <el-dialog title="班次添加" :visible.sync="dialogFormVisible" width="650px" :modal-append-to-body="false">
      <el-form :model="form" :rules="rules" ref="form">
        <div style="display: flex;flex-direction: row;" v-for="(item,index) in forms" :key="index">
          <el-form-item label="班次" :label-width="formLabelWidth" prop="name">
            <el-select v-model="item.type" placeholder="请选择班次" style="width: 150px">
              <el-option
                v-for="item in options"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="startTime">
            <el-time-select
              placeholder="上班时间"
              v-model="item.startTime"
              :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
              style="width: 150px;margin-left: 20px"
            >
            </el-time-select>
          </el-form-item>
          <div style="margin: 0 20px;position: relative">
            <span style="position: absolute;top: 10px;left: -5px">一</span>
          </div>
          <el-form-item label="" prop="endTime">
            <el-time-select
              placeholder="下班时间"
              v-model="item.endTime"
              :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime:item.startTime
    }"
              style="width: 150px"
            >
            </el-time-select>
          </el-form-item>
          <div style="height: 40px;line-height: 40px;margin-left: 20px;cursor: pointer" @click="addList"
               v-if="!item.del">
            <i class="el-icon-plus" style="font-size: 20px;font-weight: 900"></i>
          </div>
          <div style="height: 40px;line-height: 40px;margin-left: 20px;cursor: pointer" @click="delList(item,index)"
               v-if="item.del" :key="index">
            <i class="el-icon-minus" style="font-size: 20px;font-weight: 900"></i>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer" style="display: flex;justify-content: center">
        <el-button type="danger" @click="close" style="margin-right: 20px">取 消</el-button>
        <el-button type="primary" @click="add">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="班次编辑" :visible.sync="dialogFormVisible1" width="650px" :modal-append-to-body="false">
      <el-form :model="form2" :rules="rules2" ref="form2">
        <div style="display: flex;flex-direction: row;">
          <el-form-item label="班次" :label-width="formLabelWidth" prop="name" :error="errorName1">
            <el-select v-model="form2.type" placeholder="请选择班次" style="width: 150px">
              <el-option
                v-for="item in options"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="startTime" :error="errorName1">
            <el-time-select
              placeholder="上班时间"
              v-model="form2.startTime"
              :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
              style="width: 150px;margin-left: 20px"
            >
            </el-time-select>
          </el-form-item>
          <div style="margin: 0 20px;position: relative">
            <span style="position: absolute;top: 10px;left: -5px">一</span>
          </div>
          <el-form-item label="" prop="endTime" :error="errorName2">
            <el-time-select
              placeholder="下班时间"
              v-model="form2.endTime"
              :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime:form2.startTime
    }"
              style="width: 150px"
            >
            </el-time-select>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="ediRoleItem">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="班次详情" :visible.sync="dialogFormVisible2" width="700px" :modal-append-to-body="false">
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="ediRoleItem">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import {FormatData} from '../../api/time'
  import * as apiRequest from "../../api/api";
  // import {axios} from "../../../api/api";

  export default {

    data() {
      return {
        forms: [
          {
            type: '',
            startTime: '',
            endTime: '',
            del: false
          },

        ],

        options: [{
          type: 107,
          name: '全天班'
        },
          {
            type: 108,
            name: '早班'
          },
          {
            type: 109,
            name: '晚班'
          }
        ],
        isIndeterminate: true,
        errorName: '',
        errorName1: '',
        errorName2: '',
        title: '班次信息列表',
        rules: {
          name: [
            {required: true, message: '请输入班次', trigger: 'blur'},
          ],
          startTime: [
            {required: true, message: '请输入上班时间', trigger: 'blur'},
          ],
          endTime: [
            {required: true, message: '请输入下班时间', trigger: 'blur'},
          ],
        },
        rules2: {
          name: [
            {required: true, message: '请输入班次', trigger: 'blur'},
          ],
          startTime: [
            {required: true, message: '请输入上班时间', trigger: 'blur'},
          ],
          endTime: [
            {required: true, message: '请输入下班时间', trigger: 'blur'},
          ],
        },
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        visible2: false,
        form: {
          name: '',
          startTime: '',
          endTime: '',
        },
        form1: {
          name: ''
        },
        form2: {
          type: '',
          startTime: '',
          endTime: '',
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
        index: '',
      }
    },
    mounted() {
      this.getRoleList()
    },
    methods: {
      addList() {
        this.forms.push({
          type: '',
          startTime: '',
          endTime: '',
          del: true,
        },)
      },
      delList(item, index) {
        console.log(item)
        console.log(index)
        this.index = this.forms.indexOf(item)
        if (index !== -1) {
          this.forms.splice(index, 1)
        }
      },
      //获取角色列表
      getRoleList() {
        this.form1.userName = ''
        this.errorName = ''
        this.title = '班次信息列表'
        apiRequest.shift({
          _index: 1,
          _size: 10,
          // name: '',
          // status: ''
        }).then(
          data => {
            if (data.code == 0) {
              console.log(data)
              this.tableData = data.data.records.reverse()
              this.total = data.data.total
            }
          }
        )
      },
      //查询角色
      searchRole() {
        if (this.form1.userName == '') {
          this.errorName = '请选择查询的班次'
          return false
        }
        this.errorName = ''
        // this.title = `搜索关键字 "${this.form1.userName}" `
        apiRequest.shift({
          _index: 1,
          _size: 10,
          type: this.form1.userName,
          // status: ''
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
       this.$refs.validate((valid) => {
         
        if (valid) {
            
        apiRequest.addShift({
          shiftJson: JSON.stringify(this.forms),
        }).then(
          data => {
            if (data.code == 0) {
              console.log(data)
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      },
      close() {
        this.dialogFormVisible = false
        this.form = {}
        this.errorName1 = ''
        this.dialogFormVisible = false
        this.form2 = {}
        this.errorName2 = ''

      },
      //编辑角色
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogFormVisible1 = true
        this.form2.type = row.type
        this.form2.startTime = FormatData(new Date(row.startTime), 'hh:mm')
        this.form2.endTime = FormatData(new Date(row.endTime), 'hh:mm')
        this.itemsId = row.id
        // this.endTime = row.endTime
        console.log(this.form2)
        // apiRequest.ediRole({
        //   id:row.id
        // })
      },
      ediRoleItem() {
        // if (!this.form2.name) {
        //   this.errorName2 = '请填写角色名'
        //   return false
        // }
        apiRequest.fixShift({
          id:this.itemsId,
          ...this.form2
        }).then(
          data => {
            console.log(data)
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
      handleAdmin(index, row) {
        this.form3.name = row.name
        this.dialogFormVisible2 = true
      },
      handleDelete(index, row) {
        console.log(index, row);
        console.log(row.id)
        this.$confirm('执行删除操作时，该角色信息将被删除，请谨慎操作。是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          apiRequest.delShift({
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
      }
    },
  }
</script>











