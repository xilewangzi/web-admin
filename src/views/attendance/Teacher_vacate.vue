<template>
  <div class="app-container">
    <div>
      <h1 style="font-size:20px;margin-bottom: 10px;font-weight: 400;">信息查询</h1>
      <!-- 查询信息 -->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" ref="formSearch" :model="formSearch" :rules="rules">
          <el-form-item label label-width="0px" prop="startDate" :error="errorName">
            <el-date-picker
              v-model="formSearch.startDate"
              type="date"
              :picker-options="pickerOptionsStart"
              range-separator="至"
              placeholder="开始日期"
              align="right"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              default-time="00:00:00"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label label-width="0px" prop="endDate" :error="errorName">
            <el-date-picker
              v-model="formSearch.endDate"
              type="date"
              :picker-options="pickerOptionsEnd"
              range-separator="至"
              placeholder="结束日期"
              align="right"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              default-time="00:00:00"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label label-width="0px">
            <el-select v-model="formSearch.year" clearable placeholder="学年" :disabled="true">
              <el-option
                v-for="item in years"
                :key="item.year"
                :label="item.year"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label label-width="0px" prop="name" :error="errorName">
            <el-input placeholder="姓名" v-model="formSearch.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="Search">
              <i class="el-icon-search"></i>查询
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="reset('searchForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
    <!--信息列表-->
    <h1 style="font-size:20px;margin-bottom: 10px;font-weight: 400;">员工请假信息列表:共{{tableList.total}}条</h1>
    <el-table
      :data="tableList"
      v-loading="tableList.loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
    >
      <el-table-column prop="applname" width="100" label="员工姓名"></el-table-column>
      <el-table-column prop="startDate" width="160" label="请假开始时间"></el-table-column>
      <el-table-column prop="endDate" width="160" label="请假结束时间"></el-table-column>
      <el-table-column prop="leave" label="请假类型" width="100"></el-table-column>
      <el-table-column prop="days" label="时长(小时)" width="100"></el-table-column>
      <el-table-column prop="name" label="审核人" width="100"></el-table-column>
      <el-table-column prop="status" label="审核状态" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.status==1">待审核</div>
          <div v-if="scope.row.status==2">已通过</div>
          <div v-if="scope.row.status==3">已拒绝</div>
          <div v-if="scope.row.status==4">已撤销</div>
        </template>
      </el-table-column>
      <el-table-column prop="crDate" label="申请提交时间" width="160"></el-table-column>
      <el-table-column prop="operation" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button
            v-if="scope.row.canAudit == true"
            v-show="scope.row.status==1"
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >审批</el-button>
          <el-button
            v-if="scope.row.canAudit == true"
            v-show="scope.row.status==2"
            size="small"
            type="info"
            disabled
            @click="handleEdit(scope.$index, scope.row)"
          >审批</el-button>
          <el-button
            v-if="scope.row.canAudit == true"
            v-show="scope.row.status==4"
            size="small"
            type="info"
            disabled
            @click="handleEdit(scope.$index, scope.row)"
          >审批</el-button>
          <el-button
            v-if="scope.row.canAudit == true"
            v-show="scope.row.status==3"
            size="small"
            type="info"
            disabled
            @click="handleEdit(scope.$index, scope.row)"
          >审批</el-button>
          <!-- <el-button size="small" type="danger" @click="deletedate(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 详情页弹框 -->
    <el-dialog
      title="员工请假详情"
      :visible.sync="detailVisible"
      width="50%"
      :modal-append-to-body="false"
    >
      <el-form ref="formDetail" :model="formDetail" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="请假人">
              <el-input v-model="formDetail.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请假类型">
              <el-input v-model="formDetail.leave" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="请假开始时间">
              <el-input v-model="formDetail.startDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请假结束时间">
              <el-input v-model="formDetail.endDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="申请提交时间">
          <el-input v-model="formDetail.crDate" :disabled="true"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="请假事由">
              <el-input v-model="formDetail.remark" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请假时长">
              <el-input v-model="formDetail.days" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核人">
              <el-input v-model="formDetail.applname" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核状态">
              <el-input v-model="formDetail.auditStatus" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="图片">
          <viewer :images="formDetail.imageUrls">
            <img
              :v-model="formDetail.imageUrls"
              v-for="(item,index) in formDetail.imageUrls"
              :key="index"
              width="150"
              :src="item.image"
            >
          </viewer>
        </el-form-item>

        <el-form-item label="审批意见">
          <el-input type="textarea" v-model="formDetail.approvalsRemark" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 审批弹框 -->
    <el-dialog title="员工请假审批详情" :visible.sync="editVisible" width="50%" :modal-append-to-body="false">
      <el-form ref="formEdit" :model="formEdit" label-width="100px">
        <el-row>
            <el-col :span="12">
                <el-form-item label="请假人">
                    <el-input v-model="formEdit.name" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="请假类型">
                    <el-input v-model="formEdit.leave" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="请假开始时间">
                    <el-input v-model="formEdit.startDate" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="请假结束时间">
                    <el-input v-model="formEdit.endDate" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="申请提交时间">
          <el-input v-model="formEdit.crDate" :disabled="true"></el-input>
        </el-form-item>
        <el-row>
            <el-col :span="12">
                <el-form-item label="请假事由">
                    <el-input v-model="formEdit.remark" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="请假时长">
                    <el-input v-model="formEdit.days" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="审核人">
                    <el-input v-model="formEdit.applname" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="审核状态">
                   <el-input v-model="formEdit.auditStatus" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="图片">
          <viewer :images="formEdit.imageUrls">
           <img 
            :v-model="formEdit.imageUrls"
            v-for="(item,index) in formEdit.imageUrls"
            :key="index" 
            width="150"
           :src="item.image"
           />
          </viewer>
        </el-form-item>
        <el-form-item label="审批结果">
            <el-radio-group v-model="formEdit.status">
              <el-radio :label="2" :value="2">通过</el-radio>
              <el-radio :label="3" :value="3">不通过</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="审批意见">
            <el-input type="textarea" v-model="formEdit.approvalsRemark"></el-input>
        </el-form-item>
      </el-form>
       <span slot="footer" class="dialog-footer">
            <el-button @click="cancelformEdit">取 消</el-button>
            <el-button type="primary" @click.native="SubmitformEdit">提 交</el-button>
        </span>
    </el-dialog>

    <!-- 分页 -->
    <div style=" margin: 0 30%;display: inline-block;">
      <el-pagination
        layout="total,prev, pager, next, jumper"
        background
        @current-change="handleCurrentChange"
        :current-page="tableList.current"
        :page-size="tableList.size"
        :total="tableList.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import * as apiRequest from "../../api/api";

export default {
  data() {
    return {
      pickerOptionsStart: this.beginDate(),
      pickerOptionsEnd: this.processDate(),
      detailVisible: false,
      editVisible: false,
      formSearch: {
        startDate: null,
        endDate: null,
        year: 2018,
        name: "",
        size: 10,
        page: null
      },
      tableList: [
        {
          total: null,
          size: 10,
          current: null,
          page: null,
          index: null
        }
      ],
      formDetail: {
      },
      formEdit: {
        status:2
      },
      errorName2:'',
      years: [
        {
          value: 2018,
          year: "2018-2019"
        }
      ],
      errorName: "",
      rules: {
        startDate: [{ message: "请选择开始日期", trigger: "blur" }],
        endDate: [{ message: "请选择结束日期", trigger: "blur" }],
        // year: [
        //   {  message: "请选择查询的学年", trigger: "blur" }
        // ],
        name: [{ message: "请选择查询的姓名", trigger: "blur" }]
      },
      options: [
        {
          status: 1,
          name: "待审核"
        },
        {
          status: 2,
          name: "已通过"
        },
        {
          status: 3,
          name: "已拒绝"
        },
        {
          status: 4,
          name: "已撤销"
        }
      ],
      DetailId:0,
      EditId:0
    };
  },
  mounted() {
    this.getTeachList();
  },
  methods: {
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.formSearch.endDate) {
            //如果结束时间不为空，则小于结束时间
            return new Date(self.formSearch.endDate).getTime() < time.getTime();
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.formSearch.startDate) {
            //如果开始时间不为空，则结束时间大于开始时间
            return (
              new Date(self.formSearch.startDate).getTime() > time.getTime()
            );
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    //分页
    handleCurrentChange(val) {
      this.tableList.page = val;
      apiRequest
        .getLeave({
          _index: val,
          _size: 10
        })
        .then(data => {
          if (data.code == 0) {
            this.tableList = data.data.records.reverse();
            this.tableList.total = data.data.total;
          }
        });
    },
    //获取员工请假列表
    getTeachList() {
      apiRequest
        .getLeave({
          _index: 1,
          _size: 10,
          year: ""
        })
        .then(data => {
          if (data.code == 0) {
            this.tableList = data.data.records.reverse();
            this.tableList.total = data.data.total;
          }
        });
    },
    //查询员工信息
    Search(formSearch) {
      this.loading = true;

      apiRequest
        .getLeave({
          startDate: this.formSearch.startDate,
          endDate: this.formSearch.endDate,
          name: this.formSearch.name
        })
        .then(data => {
          if (data.code == 0) {
            this.tableList = data.data.records.reverse();
            this.tableList.total = data.data.total;
          }
        });
    },
    //重置
    reset() {
      this.formSearch.startDate = null;
      this.formSearch.endDate = null;
      this.formSearch.year = null;
      this.formSearch.name = "";
    },
    //查看详情
    handleDetail(index, row) {
      console.log(index, row);
      this.detailVisible = true;
      this.DetailId = row.id
      this.getFormDetail()
    },
    //获取详情信息
    getFormDetail(){
      apiRequest.getDetail({
        id: this.DetailId
      }).then(
        data => {
            this.formDetail = data.data || {};
        }
      )
    },
  // 审批意见
  handleEdit(index, row){
      console.log(index, row);
      this.editVisible = true
      this.EditId = row.id
      this.getFormEdit()
  },
   //获取审批详情信息
    getFormEdit(){
      apiRequest.getDetail({
        id: this.EditId
      }).then(
        data => {
            this.formEdit = data.data || {};
        }
      )
    },
  cancelformEdit(){
    this.editVisible = false
    this.formDetail = {}
  },
  SubmitformEdit(){
    apiRequest.ensureformEdit({
          id: this.EditId,
          status: this.formEdit.status,
          approvalsRemark: this.formEdit.approvalsRemark
        }).then(
          data => {
            if (data.code == 0) {
              this.$message({
                message: '审批成功',
                type: 'success'
              });
              this.editVisible = false
              this.getTeachList();
              this.$nextTick(() => {
                this.$refs['formEdit'].resetFields()
              })
            } else {
              this.errorName2 = data.msg
            }
          }
        )
  }
  },
  computed: {},
  components: {}
};
</script>
<style scoped>
</style>
