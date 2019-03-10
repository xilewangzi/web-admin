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
        <el-form-item label label-width="0px" prop="year">
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
    <h1 style="font-size:20px;margin-bottom: 10px;font-weight: 400;">幼儿考勤信息列表:共{{tableList.total}}条</h1>
    <el-table
      :data="tableList"
      v-loading="tableList.loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
    >
      <el-table-column prop="name" width="100" label="幼儿姓名">
      </el-table-column>
      <el-table-column prop="klassName" width="100" label="班级名称">
      </el-table-column>
      <el-table-column prop="startDate" width="160" label="开始时间">
      </el-table-column>
      <el-table-column prop="endDate" label="结束时间" width="160">
      </el-table-column>
      <el-table-column prop="remark" label="请假类型" width="100">
      </el-table-column>
      <el-table-column prop="days" label="请假天数" width="100">
      </el-table-column>
      <el-table-column prop="crDate" label="申请时间" width="160">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style=" margin: 0 30%;display: inline-block;">
      <el-pagination
        layout="total,prev, pager, next, jumper"
        background
        @current-change="handleCurrentChange"
        :current-page="tableList.current"
        :page-size="10"
        :total="tableList.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerOptionsStart: this.beginDate(),
      pickerOptionsEnd: this.processDate(),
      formSearch: {
        startDate: '',
        endDate: '',
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
          {  message: "请选择开始日期", trigger: "blur" }
        ],
        endDate: [
          {  message: "请选择结束日期", trigger: "blur" }
        ],
        // year: [
        //   { message: "请选择查询的学年", trigger: "blur" }
        // ],
        name: [{ message: "请选择查询的姓名", trigger: "blur" }]
      }
    };
  },
  mounted(){
     //获取幼儿请假列表
     this.GetDatelist()
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
    //当前页
    handleCurrentChange(val) {
      this.formSearch.page = val;
      this.$store
            .dispatch("PageTurn_leave", this.formSearch)
            .then(data => {
              this.loading = false;
              this.tableList = data.records;

              this.tableList.total = data.total;
            })
            .catch(() => {
              this.loading = false;
            });
    },
     //获取幼儿请假列表
     GetDatelist(){
       this.$store
            .dispatch("PageTurn_leave", this.formSearch)
            .then(data => {
              this.loading = false;

              this.tableList = data.records;

              this.tableList.total = data.total;
            })
            .catch(() => {
              this.loading = false;
            });
     },
    //查询功能
    Search(formSearch) {
      this.delVisible = true;

      this.loading = true;

      this.$refs.formSearch.validate(valid => {
        if (valid) {
           this.$store
            .dispatch("SearChVacate", this.formSearch)
            .then(data => {
              this.loading = false;
              
              this.tableList = data.records;
              this.tableList.total = data.total;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
              return false;
        }
      });
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
