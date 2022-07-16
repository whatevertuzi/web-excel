<template>
  <!--  <el-button v-on:click="drawchart('main')" >生成</el-button>-->
  <!--  <el-button v-on:click="sendBase" >发送</el-button>-->
  <div id="main" style="width: 100%; height: 400px"></div>
</template>


<script>
//  按需引入 echarts
import * as echarts from "echarts";
import axios from "axios";
import {ElMessage} from "element-plus";
// 使用ref创建虚拟DOM引用，使用时用main.value
export default {
  name: "ChartIT",
  data() {
    return {
      imageBase: "",
      begintime: ""
    }
  },
  methods: {
    drawchart(id) {
      this.begintime = new Date()
      let endtime = new Date()
      this.begintime.setTime(this.begintime.getTime())
      endtime.setTime(this.begintime.getTime() + 3600 * 1000 * 24)
      // let endtime = begintime.Format("yyyy-MM-dd")+' 18:00:00'
      this.begintime = this.begintime.Format("yyyy-MM-dd") + ' 07:00:00'
      endtime = endtime.Format("yyyy-MM-dd") + ' 00:00:00'

      let domain = "helpdesk.greentree.com"
      axios.get("http://10.3.28.20:8889/getdata", {
        params: {
          beginTime: this.begintime, endTime: endtime, doMain: domain
        }
      })
          .then(res => {
            const data_startTime = [];
            // data_startTime.push('开始')
            // data_startTime.push('')
            const data_incallNum = [];
            const data_actualCallLoss = [];
            const data_actualCallLossRate = [];
            const data_maxLoginAgent = [];
            // data_incallNum.push('')
            // data_actualCallLoss.push('')
            // data_actualCallLossRate.push('')
            data_maxLoginAgent.push(res.data.data[0].maxLoginAgent)
            let maxNum = res.data.data[0].incallNum
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].incallNum >= maxNum) {
                maxNum = res.data.data[i].incallNum
              }
              data_startTime.push(new Date(res.data.data[i].startTime).Format("HH:mm"))
              data_actualCallLoss.push(res.data.data[i].actualCallLoss)
              data_incallNum.push(res.data.data[i].incallNum)
              if (res.data.data[i].floatActualCallLossRate != null) {
                data_actualCallLossRate.push(parseFloat((res.data.data[i].floatActualCallLossRate) * 100).toFixed(0))
              } else {
                data_actualCallLossRate.push(res.data.data[i].floatActualCallLossRate)
              }

              data_maxLoginAgent.push(res.data.data[i].maxLoginAgent)
            }
            // data_startTime.push('')
            // data_startTime.push('结束')
            // data_incallNum.push('')
            // data_actualCallLoss.push('')
            // data_actualCallLossRate.push('')
            data_maxLoginAgent.push(res.data.data[0].maxLoginAgent)
            const myChart = echarts.init(document.getElementById(id));
            const start = new Date()
            const option = {
              title: {
                text: start.Format("yyyy年MM月dd日") + '分时段 呼入数-放弃数-呼损率-当班人数 情况',
                textStyle: {
                  //文字颜色
                  color: '#000000',
                  //字体风格,'normal','italic','oblique'
                  fontStyle: 'normal',
                  //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                  fontWeight: 'lighter',
                  //字体系列
                  fontFamily: 'sans-serif',
                  //字体大小
                  fontSize: 15,
                },
                x: 'center',
                y: 'top',

              },
              tooltip: {},
              legend: {
                orient: 'vertical',
                left: 'center',
                bottom: 'bottom',
                data: ['呼入数', '呼入放弃数', '当班人数', '呼损率']
              },
              xAxis: {
                offset: 0,
                boundaryGap: true,
                data: data_startTime,
                // axisLabel:{
                //   interval: 0,  //控制显示多少个横轴标签
                //   rotate:90
                // }
              },
              yAxis: [{//y轴
                type: 'value',
                axisLine: {
                  lineStyle: {//y轴文字颜色
                    // color: "rgb(35, 208, 229)"
                  }
                },
                splitLine: {//网格线隐藏
                  show: false
                },
                name: '',//顶部文字描述
                min: 0,//左边y轴起始数值
                max: maxNum,//左边y轴最大数值
                interval: 5,//每次递增2
                axisLabel: {
                  formatter: '{value}'
                }
              },
                {
                  type: 'value',
                  splitLine: {//网格线隐藏
                    show: true
                  },
                  axisLine: {
                    lineStyle: {//右边y轴颜色
                      // color: "rgb(35, 208, 229)"
                    }
                  },
                  name: '',//右边顶部文字描述
                  min: 0,//右边y轴起始数值
                  max: 100,//右边y轴最大数值
                  interval: 20,//每次递增20
                  axisLabel: {
                    formatter: '{value}%'
                  }
                }
              ],
              series: [
                {
                  name: '呼入数',
                  type: 'bar',
                  data: data_incallNum,
                  z: 3,
                  yAxisIndex: 0,
                  itemStyle: {
                    color: '#424242',
                  }
                },
                {
                  name: '呼入放弃数',
                  type: 'bar',
                  data: data_actualCallLoss,
                  z: 3,
                  yAxisIndex: 0,
                  itemStyle: {
                    color: '#9d9d9d',
                  }
                },
                {
                  name: '当班人数',
                  type: 'line',
                  yAxisIndex: 0,
                  lineStyle: {
                    width: 1,
                    color: '#d0d0d0',
                  },
                  stack: '数据',
                  data: data_maxLoginAgent,
                  areaStyle: {
                    opacity: 0.8,
                    color: '#d0d0d0',
                  },
                  itemStyle: {
                    opacity: 0,
                  },
                },
                {
                  name: '呼损率',
                  type: 'line',
                  yAxisIndex: 1,
                  lineStyle: {
                    width: 3,
                    color: '#d0d0d0',
                    opacity: 0,
                  },
                  data: data_actualCallLossRate,
                  symbol: 'circle',
                  label: {
                    show: true,
                    formatter: function (params) {
                      if (params.value == 0) {
                        params.seriesIndex = ''
                        return
                      }
                      return params.data + '%'
                    }
                  },
                  itemStyle: {
                    // opacity: 0,
                    color: '#5b5a5a',
                  },
                }
              ]
            }
            // };
            // 使用刚指定的配置项和数据显示图表。
            // let begintime = new Date().Format("yyyy-MM-dd HH-mm-ss")
            myChart.setOption(option);
            window.onresize = function () {
              myChart.resize();
            }
          })
          .catch(function (error) {
            ElMessage({
              message: error + ":" + "请联系管理员",
              type: 'warning',
            })
          });
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.drawchart('main')
    })
  },
}

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
</script>




