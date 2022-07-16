<template>
  <el-row class="divTop">
    <el-col :offset="1" :span="10">
      格美集团
    </el-col>
    <el-col :offset="1" :span="8">
      日报汇报
    </el-col>
    <el-col :offset="2" :span="2">
      预订部
    </el-col>
  </el-row>

  <div class="el-m">
    <!--  <el-row>-->
    <!--    <el-col :span="6" :offset="2" class="el-col">一、指标数据汇报</el-col>-->
    <!--  </el-row>-->
    <!--  <TableData class="table-data"></TableData>-->
    <p/>
    <p/>
    <el-row>
      <!--    <el-col  :span="6" :offset="11" class="el-col">当日分时段呼损率</el-col>-->
    </el-row>
    <ChartYuding></ChartYuding>
    <p/>
    <p/>
    <!--  <el-row>-->
    <!--    <el-col :span="6" :offset="2" class="el-col">三、报修工作效率</el-col>-->
    <!--  </el-row>-->
    <!--  <TableTotal class="table-total"></TableTotal>-->
  </div>

  <el-row class="divFooter">
    <el-col :offset="1" :span="10">
      {{ datee }}
    </el-col>
    <el-col :offset="1" :span="8">

    </el-col>
    <el-col :offset="2" :span="2">
      张晨阳
    </el-col>
  </el-row>
</template>

<script>
import ChartYuding from "@/components/ChartsYuding";
// import TableData from "@/components/TableData";
// import TableTotal from "@/components/TableTotal";
export default {
  name: "ChartYudingView",
  components: {
    ChartYuding,
    // TableData,
    // TableTotal
  },
  data() {
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24)
    return {
      dates: start.Format("MM/dd") +
          '指标完成情况汇报—预订部',
      datee: start.Format("yyyy/MM/dd")
    }
  }
}
</script>

<style scoped>
@media screen {
  .divTop {
    display: none;
  }

  .divFooter {
    display: none;
  }
}

@media print {
  .divTop {
    font-size: 15px;
    top: 0;
  }

  .divFooter {
    font-size: 15px;
    padding-top: 20px;
    margin-top: 10px;
    bottom: 0;
  }
}

.el-m {
  padding-top: 50px;
  padding-bottom: 50px;
}

.table-data {
  text-align: center;
}

.table-total {
  text-align: center;
}

.el-col {
  text-align: left;
}
</style>
