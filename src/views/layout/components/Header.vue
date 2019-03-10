<template>
  <div class="header">
    <div class="header_container">
      <div class="header_left">
        <div class="logo">

        </div>
        <div class="welcome">
          <h1>蓝天幼儿园管理系统 <span>欢迎您，系统管理员</span></h1>
        </div>
        <div class="header_tab">
          <ul>
            <li @click="turnHome">
              <div>

              </div>
              <p>首页</p>
            </li>
            <li @click="turnSchool">
              <div>

              </div>
              <p>校园风采</p>
            </li>
            <li @click="turnDiet">
              <div>

              </div>
              <p>食谱管理</p>
            </li>
            <li @click="turnAtten">
              <div>

              </div>
              <p>员工请假</p>
            </li>
          </ul>
        </div>


      </div>
      <div class="header_right">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img src="../../../assets/user/user.gif" class="user-avatar">
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link class="inlineBlock" to="/home">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <router-link class="inlineBlock" to="/password">
              <el-dropdown-item>
                密码设置
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return {
        
      }
    },
    methods: {
      turnHome(){
        this.$router.push({path:'/'})
      },
      turnAtten(){
        this.$router.push({path:'/attendance/teacher_vacate/list'})
      },
      turnDiet(){
        this.$router.push({path:'/diet/food_menu/diet_manage'})
      },
      turnSchool(){
        this.$router.push({path:'/campusElegant/list'})
      },
      logout() {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    },
    computed: {},
    components: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .header {
    h1 {
      margin: 0;
    }
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #cccccc;
    position: fixed;
    padding-bottom: 60px !important;
    .header_container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .header_left {
        display: flex;
        flex-direction: row;
        .logo {
          width: 80px;
          height: 40px;
          background: skyblue;
          margin-top: 10px;
          margin-left: 30px
        }
        .welcome {
          margin-left: 30px;
          h1 {
            font-size: 16px;
            color: white;
            span {
              font-size: 12px;
              margin-left: 30px;
            }
          }
        }
        .header_tab {

          ul {
            display: flex;
            flex-direction: row;
            li {
              list-style: none;
              display: flex;
              flex-direction: column;
              cursor: pointer;
              margin-left: 70px;
              div {
                width: 60px;
                height: 40px;
                background: skyblue;
              }
              p {
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                color: white;
                font-weight: 500;
                text-align: center;
              }
            }
          }
        }
      }
      .header_right {
        margin-right: 35px;
        .avatar-container {
          height: 60px;
          display: inline-block;
          /*position: absolute;*/
          /*right: 1200px;*/
          .avatar-wrapper {
            cursor: pointer;
            margin-top: 10px;
            position: relative;
            line-height: initial;
            .user-avatar {
              width: 40px;
              height: 40px;
              border-radius: 10px;
            }
            .el-icon-caret-bottom {
              position: absolute;
              right: -20px;
              top: 25px;
              font-size: 12px;
            }
          }
        }
      }
    }

  }

</style>
