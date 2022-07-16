<template>

  <el-row justify="center">
    <el-table :data="tableData" border class="el-table" style="width: 80%">
      <el-table-column align="left" label="序号" prop="id" width="100"/>
      <el-table-column align="left" label="报修处理量(个)" prop="doo"/>
      <el-table-column align="left" label="参与报修处理人数(人)" prop="people"/>
      <el-table-column align="left" label="参与报修处理时长(小时)" prop="hour"/>
      <el-table-column align="left" label="计划人均处理报修数(个)" prop="plando"/>
      <el-table-column align="left" label="实际人均处理报修数(个)" prop="avgdo"/>
      <el-table-column align="left" label="当日是否完成" prop="isdone"/>
    </el-table>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  name: "TableTotal",
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
      axios.get("http://10.3.28.20:8889/table/total", {
        params: {
          beginTime: begintime, endTime: begintime, doMain: domain
        }
      })
          .then(res => {
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
  text-align: center;
}
</style>
