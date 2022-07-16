<template>
  <div class="me-footer">
    Designed by
    <strong>
      <router-link class="me-login-design-color" to="/">张晨阳</router-link>
    </strong>
  </div>
</template>

<script>

export default {
  name: 'BaseFooter',
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>

<style>

/*el-footer {*/
/*  min-width: 100%;*/
/*  box-shadow: 0 -2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);*/
/*  position: absolute;*/
/*  bottom: 0;*/
/*  left: 0;*/
/*  z-index: 1024;*/
/*}*/

.me-footer {
  text-align: center;
  line-height: 30px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;

}

.me-login-design-color {
  color: #5FB878 !important;
}

</style>
