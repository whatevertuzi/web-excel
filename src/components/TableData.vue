<template>
  <el-row justify="center">
    <el-table :data="tableData" border class="el-table" style="width: 80%">
      <el-table-column align="left" label="序号" prop="id" width="100"/>
      <el-table-column align="left" label="项目" prop="name"/>
      <el-table-column align="left" label="当日计划量" prop="dayplan"/>
      <el-table-column align="left" label="当日完成量" prop="daydone"/>
      <el-table-column align="left" label="当日是否完成" prop="isdone"/>
      <el-table-column align="left" label="目标差" prop="diff"/>
      <el-table-column align="left" label="当月累计完成量" prop="monthdone"/>
    </el-table>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  name: "TableData",
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
    fillData() {
      let begintime = new Date()
      begintime.setTime(begintime.getTime() - 3600 * 1000 * 24)
      begintime = begintime.Format("yyyy-MM-dd")
      // let endtime = new Date().Format("yyyy-MM-dd")
      let domain = "helpdesk.greentree.com"
      axios.get("http://10.3.28.20:8889/table", {
        params: {
          beginTime: begintime, endTime: begintime, doMain: domain
        }
      })
          .then(res => {
            console.log(res.data.data[0])
            for (let i = 0; i < res.data.data.length; i++) {

              if (res.data.data[i].dayplan > res.data.data[i].daydone) {
                if (i != 4) {
                  res.data.data[i].diff = (res.data.data[i].dayplan - res.data.data[i].daydone).toFixed(2) + '%'
                } else {
                  res.data.data[i].diff = (res.data.data[i].dayplan - res.data.data[i].daydone).toFixed(0)
                }
                res.data.data[i].isdone = "未完成"
              } else {
                res.data.data[i].isdone = "已完成"
                res.data.data[i].diff = "/"
              }
              if (i != 4) {
                res.data.data[i].dayplan += '%'
                res.data.data[i].daydone += '%'
                res.data.data[i].monthdone = res.data.data[i].monthdone.toFixed(2) + '%'
              }
            }
            this.tableData = res.data.data
          })
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.fillData()
    })
  },
}
</script>

<style scoped>
.el-table {
  text-align: justify;
}
</style>
