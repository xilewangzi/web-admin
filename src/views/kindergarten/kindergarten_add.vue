<template>
  <div >
   <!-- 添加提示框 -->
                <el-form  ref="formAdd" :model="formAdd" label-width="100px" :rules="rules" class="demo-ruleForm">
                    <el-form-item label="幼儿园名称" prop="name" class="is-required">
                        <el-input v-model="formAdd.name"  name="name"></el-input>
                    </el-form-item>
                           
                    <el-form-item label="所在地区" prop="area" class="is-required">
                        <v-distpicker style="display:inline-block;" :province="formAdd.province" :city="formAdd.city" :area="formAdd.area" @selected="onSelected"></v-distpicker>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address" class="is-required">
                        <el-input style="display:none;" v-model="formAdd.address"></el-input>
                    <!-- 百度地图 -->
                    <div width="800">
                    <baidu-map v-bind:style="mapStyle" class="bm-view" ak="PgXF4qF4PvWBAfiwa8TS35m25dbK32kN"
                        :center="center" 
                        :zoom="zoom" 
                        :scroll-wheel-zoom="false" 
                         @click="getClickInfo"
                         @moving="syncCenterAndZoom" 
                         @moveend="syncCenterAndZoom" 
                         @zoomend="syncCenterAndZoom"
                    >
                    <bm-view style="width: 100%; height:330px;"></bm-view>
                    <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                    </bm-marker>
                    <!-- <bm-control :offset="{width: '10px', height: '10px'}"> -->
                    <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">
                        <input type="text" v-model="formAdd.address" placeholder="请输入幼儿园地址" class="serachinput">
                    </bm-auto-complete>
              
                    <bm-local-search :keyword="keyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
                </baidu-map>
                </div>
                    </el-form-item>
                    <el-row>
                     <el-col :span="12">
                     <el-form-item label="经度" prop="longitude" class="is-required">
                        <el-input v-model="formAdd.longitude" placeholder="请填写经度">
                        </el-input>  
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="纬度" prop="latitude" class="is-required">
                        <el-input v-model="formAdd.latitude" placeholder="请填写纬度">
                        </el-input>
                    </el-form-item>
                    </el-col>
                     </el-row>
                      <el-form-item label="成立年份" prop="year">
                                <el-date-picker v-model="formAdd.year" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                                </el-date-picker>
                     </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="保教费" prop="nurse">
                                <el-input v-model="formAdd.nurse"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="伙食费" prop="board">
                                <el-input v-model="formAdd.board"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                     <el-col :span="12">
                    <el-form-item label="电话/座机" prop="phone">
                        <el-input v-model="formAdd.phone"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="级类等级" prop="level">
                                 <el-select v-model="formAdd.level" clearable placeholder="级类等级">
                                 <el-option 
                                     v-for="item in levels"
                                     :key="item.level"
                                     :label="item.level"
                                     :value="item.value"
                                 ></el-option>
                                </el-select>
                         </el-form-item>
                         </el-col>
                     </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="园所网址" prop="web">
                                <el-input v-model="formAdd.web"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="园所标识符" prop="code">
                                <el-input v-model="formAdd.code"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="联系人" prop="userName">
                                <el-input v-model="formAdd.userName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="手机" prop="mobile">
                                <el-input v-model="formAdd.mobile"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="formAdd.password" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <P style="color:red;">备注：用户初始密码为11111，登录后可修改</p>
                        </el-col>
                    </el-row>
                    <el-form-item label="运营状态" prop="status" class="is-required">
                        <el-radio-group v-model="formAdd.status">
                            <el-radio :label="1" :value="1">运营中</el-radio>
                            <el-radio :label="2" :value="2">待运营</el-radio>
                            <el-radio :label="3" :value="3">停止运营</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="性质" prop="nature">
                                <el-select  v-model="formAdd.nature"  @change="currentSel" placeholder="级类等级">
                                 <el-option 
                                     v-for="item in natures"
                                     :key="item.nature"
                                     :label="item.nature"
                                     :value="item.value"
                                 ></el-option>
                                </el-select>
                    </el-form-item>
                    <el-form-item label="园所介绍" prop="describe" class="is-required">
                        <el-input type="textarea" v-model="formAdd.describe"></el-input>
                    </el-form-item>
                    <el-form-item label="园所照片" prop="images" class="is-required">
                        【提示：单张图片或批量上传小于10张】
                        <vue-core-image-upload
                            v-model="formAdd.images"
                            text="点击上传图片"
                            inputOfFile="file"
                            :class="['btn', 'btn-primary']"
                            :crop="false"
                            @imageuploaded="imageuploaded"
                            :max-file-size="5242880"
                            :credentials=false
                            :multiple="true"
                            :multiple-size="10"
                            url="http://192.168.1.210/file/upload/batch"
                            >
                            <img v-for="(item,index) in imglist" :key="index" width="150" :src="item.url"/> 
                        </vue-core-image-upload>
                    </el-form-item>
                </el-form>
                <div class="footer">
                    <el-button @click="cancelAdd">取 消</el-button>
                    <el-button native-type="submit" type="primary"   @click.native="formAddFunc">提交</el-button>
         </div>
  </div>
</template>

<script>

  import VDistpicker from "v-distpicker";
  import {BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker} from 'vue-baidu-map';
  import VueCoreImageUpload  from 'vue-core-image-upload'
  import * as apiRequest from '../../api/api'


  export default {
    components: {
       VDistpicker,
    // VueDatepickerLocal,
      'vue-core-image-upload': VueCoreImageUpload,
      BaiduMap,
      BmControl,
      BmView,
      BmAutoComplete,
      BmLocalSearch,
      BmMarker
    }, 
    
    data(){
        return{
            formAdd:{},
            mapStyle: {
            width: '100%',
            height: this.mapHeight + 'px'
        },
        center: {lng: 116.404, lat: 39.915},
        zoom:12.8,
        keyword: '',
        levels:  [
        {
            "value": 77,
            "level": "一级"
        },
        {
            "value": 78,
            "level": "一级一类"
        },
        {
            "value": 79,
            "level":"一级二类"
        },
        {
            "value": 80,
            "level": "二级"
        },
        {
            "value": 81,
            "level": "二级一类"
        },
        {
            "value": 82,
            "level": "二级二类"
        },
        {
            "value": 83,
            "level": "二级三类"
        },
        {
            "value": 84,
            "level": "市级示范"
        },
        {
            "value": 85,
            "level": "市示范园"
        },
        {
            "value": 86,
            "level": "区级示范"
        },
        {
            "value": 87,
            "level": "区示范园"
        },
        {
            "value": 88,
            "level": "其他"
        }
    ],
     //性质
        natures: [
        {
            "value": 73,
            "nature": "公办"
        },
        {
            "value": 74,
            "nature": "教委公办"
        },
        {
            "value": 75,
            "nature": "民办"
        },
        {
            "value": 76,
            "nature": "其他公办"
        }
    ],
     imglist:[],
     rules: {
        name: [
            { required: true, message: '请输入园所名称', trigger: 'blur' }
          ],
        area: [
            { required: true, message: '请输入园所地址', trigger: 'blur' }
          ],  
        address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
        longitude: [
            { required: true, message: '请输入经度', trigger: 'blur' }
          ],  
        latitude: [
            { required: true, message: '请输入纬度', trigger: 'blur' }
          ], 
        status: [
            { required: true, message: '请选择运营状态', trigger: 'blur' }
          ], 
        describe: [
            { required: true, message: '请输入园所介绍', trigger: 'blur' }
          ],   
        images: [
            { message: '请上传园所图片', trigger: 'blur' }
          ],  
        year: [
            { message: '请选择成立年份', trigger: 'blur' }
          ],
        nurse: [
            { message: '请输入保教费', trigger: 'blur' }
          ],  
        board: [
            { message: '请输入伙食费', trigger: 'blur' }
          ],
        phone: [
            { message: '请输入电话', trigger: 'blur' }
        ], 
        level: [
            { message: '请选择等级', trigger: 'blur' }
        ],  
        web: [
            { message: '请输入园所网址', trigger: 'blur' }
        ],
        code: [
            { message: '请输入园所标识符', trigger: 'blur' }
        ],
        userName: [
            { message: '请输入联系人', trigger: 'blur' }
        ],
        mobile: [
            { message: '请输入手机号', trigger: 'blur' }
        ],
        nature: [
            { message: '请选择园所性质', trigger: 'blur' }
        ]
    },
    }
    },
    methods:{
    //性质
    currentSel(selVal){
        this.selVal = selVal;
    },
     onSelected(data) {
      this.formAdd.province = data.province.value;
      console.log(this.formAdd.province)
      this.formAdd.city = data.city.value;
      this.formAdd.area = data.area.value;
    },
    //百度地图
    getClickInfo (e) {
        this.center.lng = e.point.lng
        this.center.lat = e.point.lat
        console.log(this.center.lng)
      },
      syncCenterAndZoom (e) {
        const {lng, lat} = e.target.getCenter()
        this.center.lng = lng
        this.center.lat = lat
        this.zoom = e.target.getZoom()

        this.formAdd.longitude = this.center.lng
        this.formAdd.latitude = this.center.lat

        // this.formEdit.longitude = this.center.lng
        // this.formEdit.latitude = this.center.lat
      },
      // 添加图片上传
    imageuploaded(res) {
      if (res.code == 0) {

       const img =  res.data;

       this.imglist = img;

       this.formAdd.form.images="";

       for(var i= 0;i<img.length;i++){
           this.formAdd.form.images += img[i].url+',';
        }
      }
     },
     //添加园所
     formAddFunc(formAdd) {
        this.$refs.formAdd.validate((valid) => {
          if (valid) {
           console.log(this.formAdd)
           apiRequest
                 .AddKinder({
                 param:JSON.stringify(this.formAdd)
                 
                 })
                 .then(data => {
                     console.log(data)
        //          if (data.code == 0) {
        //     this.tableList = data.data.records.reverse();
        //     this.tableList.total = data.data.total;
        //   }
        });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //取消添加
     cancelAdd() {
      this.addVisible = false;
      this.closeDialog()
    },
    }

  }
</script>

<style scoped>
 .footer{
     margin-bottom: 100px;
     margin-left: 40%;
 }
</style>
