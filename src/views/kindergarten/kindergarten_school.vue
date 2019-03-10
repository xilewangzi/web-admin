<template>
  <div>
    <div class="app-container">
      <!-- 查询列表 -->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" ref="formSearch" :model="formSearch" class="searchform-form-inline">
          <el-form-item label="园所地区">
            <v-distpicker
              style="display:inline-block;"
              :province="formSearch.province"
              :city="formSearch.city"
              :area="formSearch.area"
              @province="onChangeProvince"
              @city="onChangeCity"
              @area="onChangearea"
            ></v-distpicker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formSearch.status" clearable placeholder="运营状态">
              <el-option
                v-for="item in options"
                :key="item.status"
                :label="item.status"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="园所名称" v-model="formSearch.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="search">
              <i class="el-icon-search"></i>查询
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="reset('searchForm')">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--园所列表-->
      <p style="font-size:16px;font-weight: normal;">幼儿园总数:{{tableList.total}}所</p>
      <el-table
        :data="tableList"
        :default-sort="{prop: 'id', order: 'descending'}"
        empty-text="没有您要查询的数据"
        border
        style="min-height:300px;width:auto;"
      >
        <!-- <el-table-column prop="id" label="id" align="center" width="95">
        </el-table-column>-->
        <el-table-column prop="name" width="260" label="幼儿园名称"></el-table-column>
        <el-table-column prop="address" label="幼儿园地址" width="260"></el-table-column>
        <el-table-column prop="contact" label="联系人" width="80px"></el-table-column>
        <el-table-column prop="mobile" label="联系方式" width="100px"></el-table-column>
        <el-table-column prop="status" label="运营状态" width="90px">
          <template slot-scope="scope">
            <div v-if="scope.row.status==1">运营中</div>
            <div v-if="scope.row.status==2">待运营</div>
            <div v-if="scope.row.status==3">停止运营</div>
          </template>
        </el-table-column>
        <el-table-column prop="crDate" label="添加时间" width="100px"></el-table-column>
        <el-table-column prop="operation" label="操作" width="330px">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleDetail(scope.row.id)">详情</el-button>
            <el-button size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="small" type="primary" @click="resetPW(scope.row.id)">密码重置</el-button>
            <el-button size="small" type="danger" @click="deletedate(scope.row.id)">删除</el-button>
          </template>
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
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import * as apiRequest from "../../api/api";


export default {
  components: {
    VDistpicker
  },
  computed: {},
  data() {
    return {
      formSearch: {
        province: "",
        city: "",
        area: "",
        name: "",
        year: null,
        status: null,
        total: null,
        size: 10,
        current: null,
        page: null,
        index: null
      },
      tableList: [],
      options: [
        {
          value: 1,
          status: "运营中"
        },
        {
          value: 2,
          status: "待运营"
        },
        {
          value: 3,
          status: "停止运营"
        }
      ]
    };
  },
  mounted() {
    //获取园所请假列表
    this.search();
  },
  methods: {
    //查询获取列表数据
    search() {
      apiRequest
        .getKinder({
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
    //添加园所
    handleAdd(){
      this.$router.push({path:'/kindergarten/kindergarten_add'})
    },
    dateFormat(row, column, cellValue) {
      return cellValue ? fecha.format(new Date(cellValue), "YYYY-MM-DD") : "";
    },
    //省
    onChangeProvince(data) {
      this.formSearch.province = data.value;
    },
    //市
    onChangeCity(data) {
      this.formSearch.city = data.value;
    },
    //区
    onChangearea(data) {
      this.formSearch.area = data.value;
    },
    //分页
    handleCurrentChange(val) {
      this.formSearch.page = val;
      // this.tableList.fetch();
      apiRequest
        .getKinder({
          _index: val,
          _size: 10
        })
        .then(data => {
          if (data.code == 0) {
            this.tableList = data.data.records.reverse();
            this.tableList.total = data.data.total;
          }
        });
    }
  }
};
</script>
<style scoped>
</style>
