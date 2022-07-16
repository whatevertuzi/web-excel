<template>
  <el-container class="el-container">
    <base-header/>
    <el-main id="el-main">
      <router-view/>
    </el-main>
    <el-footer v-show="footerShow" id="el-footer">
      <base-footer/>
    </el-footer>
  </el-container>
</template>

<script>
import BaseHeader from "@/views/BaseHeader";
import Footer from "@/components/Footer";
import {ElMessage} from "element-plus";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    'base-footer': Footer,
    'base-header': BaseHeader,
  },
  data() {
    return {
      footerShow: false
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.path == '/about') {
      next(vm => {
        vm.footerShow = true
      })
    } else {
      next()
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path != '/about') {
      this.footerShow = false
    } else {
      this.footerShow = true
    }
    next()
  }
}
if (document.documentElement.clientWidth < 500) {
  ElMessage({
    message: "若您使用移动端访问，请横屏操作",
    type: 'warning',
  })
}
</script>

<style>
#el-main {
  margin-top: 2%;
  min-height: 100%;
}

#el-footer {
  height: 40px;
  padding-top: 5%;
}
</style>
