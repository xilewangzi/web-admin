<template>
  <div :class="classObj" class="app-wrapper" >
    <Header/>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg"  @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container" :style="{width:wid}">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain ,Header} from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  mounted () {
    const that = this;
    this.wid = window.innerWidth - 180+'px'
    window.onresize = () => {
        that.screenHeight = window.innerWidth
        that.wid = that.screenHeight-180+'px'
    }
  },
  data(){
    return {
      screenHeight: window.innerWidth,
      wid:'',
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Header
  },
  mixins: [ResizeMixin],

  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .wid{
    width: 1260px!important;
  }
</style>
