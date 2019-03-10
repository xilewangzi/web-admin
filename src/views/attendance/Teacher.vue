<template>
  <div class="app-container">
    <h1 style="font-size:20px;margin-bottom: 10px;font-weight: 400;">信息查询</h1>
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
              v-for="item in options"
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
    <!--列表-->
    <h1 style="font-size:20px;margin-bottom: 10px;font-weight: 400;">员工考勤信息列表:共{{tableList.total}}条</h1>
    <el-table
      :data="tableList"
      v-loading="tableList.loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
    >
      <el-table-column prop="workDay" width="100" label="打卡日期">
        <template slot-scope="scope">
        {{ scope.row.workDay | dateformat('YYYY-MM-DD')}}
        </template>
      </el-table-column>
      <el-table-column prop="userName" width="100" label="员工姓名">
      </el-table-column>
      <el-table-column prop="title" width="100" label="职务">
      </el-table-column>
      <el-table-column prop="shift" label="班次" width="100">
      </el-table-column>
      <el-table-column prop="inTime" label="上班时间" width="100">
        <template slot-scope="scope">
        {{ scope.row.inTime | dateformat('HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column prop="outTime" label="下班时间" width="100">
        <template slot-scope="scope">
        {{ scope.row.outTime | dateformat('HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column prop="late" label="迟到时长" width="100">
      </el-table-column>
      <el-table-column prop="leave" label="早退时长" width="100">
      </el-table-column>
    </el-table>
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
import * as apiRequest from '../../api/api'

export default {
  data() {
    return {
      pickerOptionsStart: this.beginDate(),
      pickerOptionsEnd: this.processDate(),
      formSearch: {
        startDate: null,
        endDate: null,
        year: 2018,
        name: "",
        size: 10,
        page:null
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
      options: [
        {
          value: 2018,
          year: "2018-2019"
        }
      ],
      errorName: "",
      rules: {
        startDate: [
          { message: "请选择开始日期", trigger: "blur" }
        ],
        endDate: [
          { message: "请选择结束日期", trigger: "blur" }
        ],
        // year: [
        //   {  message: "请选择查询的学年", trigger: "blur" }
        // ],
        name: [{ message: "请选择查询的姓名", trigger: "blur" }]
      }
    };
  },
  mounted() {
  this.getTeachList()
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
      this.$store
            .dispatch("PageTurn", this.tableList)
            .then(() => {
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
    },
    //获取员工请假列表
    getTeachList(){
      apiRequest.getTatten({
        _index: 1,
        _size: 10,
        year:''
      }).then(
        data => {
          if (data.code == 0) {
              this.tableList = data.data.records.reverse()
              this.tableList.total = data.data.total
            }
        }
      )
    },
    //查询员工信息
    Search(formSearch) {
      
      this.loading = true;

      apiRequest.getTatten({
        startDate:this.formSearch.startDate,
        endDate:this.formSearch.endDate,
        name:this.formSearch.name
      }).then(
        data => {
          if (data.code == 0) {
              this.tableList = data.data.records.reverse()
              this.tableList.total = data.data.total
            }
        }
      )
    },
    //重置
    reset(){
        this.formSearch.startDate = null;
        this.formSearch.endDate = null;
        this.formSearch.year = null
        this.formSearch.name = "";
    },
  },
  computed: {},
  components: {}
};
</script>
<style scoped>
</style>
