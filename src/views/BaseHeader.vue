<template>
  <el-header>
    <nav>
      <el-row align="middle">
        <el-col :offset="1" :span="1">
          <div class="grid-content bg-purple"/>
          <router-link to="/">
            <img alt="logo,点击到达主页" src="../assets/logo.png">
          </router-link>
        </el-col>
        <el-col :offset="4" :span="3">
          <div class="grid-content bg-purple"/>
          <router-link to="/">实施组日报表</router-link>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple"/>
          <router-link to="/yuding">预订部日报表</router-link>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light"/>
          <router-link to="/chart">实施当日数据</router-link>
        </el-col>
        <!--        <el-col :span="3">-->
        <!--          <div class="grid-content bg-purple-light" />-->
        <!--          <router-link to="/record">实施呼损回访</router-link>-->
        <!--        </el-col>-->
        <el-col :span="3">
          <div class="grid-content bg-purple-light"/>
          <router-link to="/charty">预订当日数据</router-link>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light"/>
          <router-link to="/about">关于</router-link>
        </el-col>
        <!--        <el-col :span="2" :offset="2" v-if="!user.login">-->
        <!--          <div class="grid-content bg-purple-light" />-->
        <!--          <router-link to="/login">登录</router-link> /-->
        <!--          <router-link to="/register">注册</router-link>-->
        <!--        </el-col>-->
        <!--        <el-col :span="2" :offset="2" v-else="user.login">-->
        <!--          <div class="grid-content bg-purple-light" >-->
        <!--            <img>-->
        <!--          </div>-->
        <!--        </el-col>-->
      </el-row>
    </nav>
  </el-header>
</template>

<script>
export default {
  name: "BaseHeader",
  data() {
    return {}
  },
  // computed:{
  //   user(){
  //     // console.log(String(this.$store.state.length))
  //     // console.log(this.$store.state.length ===0)
  //     // console.log(String(this.$store.state.length) == 'undefined')
  //     let login = (this.$store.state.length != 0 && String(this.$store.state.length) != 'undefined')
  //     let avatar = this.$store.state.avatar
  //     return {
  //       login ,avatar
  //     }
  //   }
  // }
}
</script>

<style>
img {
  height: 50px;
  width: 50px;
}

el-row {
  margin-bottom: 20px;
}

el-row:last-child {
  margin-bottom: 0;
}

el-col {
  border-radius: 4px;
}

nav {
  padding: 10px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.grid-content {
  border-radius: 4px;
  min-height: 2px;
  max-height: 2px;
}
</style>
