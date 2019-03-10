<template>
  <section class="app-main">
    <div style="padding: 30px">
      <transition name="fade-transform" mode="out-in">
        <!-- or name="fade" -->
        <!-- <router-view :key="key"></router-view> -->
        <router-view/>
      </transition>
    </div>

    <div class="footers">
      <p>
        <span>技术热线： 400-116-1331</span>
        <span>服务时间：9:00~18:00（周一至周五</span>
        <span>All Rights Reserved Copyright ©  </span>
        <span>北京微油科技服务有限公司ICP备案号17014924</span>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>

<style scoped lang="scss">
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: auto;
  background: rgb(240, 242, 245);
  /*padding: 30px 30px 0 30px;*/
}
  .footers{
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    background: #99a9bf;
    bottom: 60px;
    p{
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      span{
        /*margin-left: 5%;*/
        font-size: 14px;
      }
    }
  }
</style>
