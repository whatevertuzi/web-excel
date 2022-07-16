<template>
  <div class="block">
    <el-config-provider :locale="zhCn">
      <el-form label-width="120px">
        <el-row :gutter="20">
          <el-col :offset="6" :span="3">
            <el-form-item label="企微登陆时长">
              <el-input v-model="chatMin"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="企微沟通数量">
              <el-input v-model="chatNum"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="排班人数">
              <el-input v-model="peopleNum"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="实际接线人数">
              <el-input v-model="callPeopleNum"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :offset="6" :span="3">
            <el-form-item label="客服邮件处理量">
              <el-input v-model="email"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="回访数量">
              <el-input v-model="recall"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="其他实际用时">
              <el-input v-model="other"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="当日客请录入">
              <el-input v-model="complaintNumDay"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :offset="6" :span="6">
            <el-form-item label="选择日期">
              <el-date-picker
                  v-model="value2"
                  :calendar-change=value2
                  :shortcuts="shortcuts"
                  end-placeholder="结束日期"
                  range-separator="To"
                  start-placeholder="开始日期"
                  type="datetimerange"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  @change="getdata('main')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮件附加内容">
              <el-input v-model="text" type="textarea"/>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-config-provider>
  </div>
  <!--  <el-button v-on:click="getdata('main')" >生成图表</el-button>-->
  <el-button v-on:click="exports">导出</el-button>
  <el-button v-on:click="sendBase">发送邮件</el-button>
  <div id="main" style="width: 100%; height: 400px;padding-top: 50px"></div>
</template>

<script setup>
const shortcuts = [
  {
    text: '上周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '上月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '上三月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
</script>
<script>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import axios from "axios";
import {ElMessage} from "element-plus";
import * as echarts from "echarts";
// if(document.documentElement.clientWidth<500){
//   ElMessage({
//     message: "若您使用移动端访问，请横屏操作",
//     type: 'warning',
//   })
// }
export default {
  name: 'ExportsYuding',
  data: () => ({
    imageBase: "",
    data_startTime: [],
    data_incallNum: [],
    data_actualCallLoss: [],
    data_actualCallLossRate: [],
    data_maxLoginAgent: [],
    maxNum: 0,
    begintime: "",
    value2: [1, 1],
    // defaultTime: [
    //   new Date('', '', '', 7, 0, 0),
    //   new Date('', '', '', 1, 0, 0)
    // ],
    myChart: "",
    sendTime: "",
    zhCn,
    chatMin: "",//企微登陆时长
    chatNum: "",//企微沟通数量
    peopleNum: "",//排班人数
    callPeopleNum: "",//实际接线人数
    complaintNumDay: "",//当日客情录入总量
    email: "",//客服邮箱处理量
    recall: "",//回访数量
    other: "",//其他实际用时
    text: "",//附加内容
  }),
  methods: {
    exports() {
      if (this.value2[0].toString() != '' && this.value2[1].toString() != '') {
        if (new Date(this.value2[0]) > new Date()) {
          ElMessage({
            message: "请选择正确的日期",
            type: 'warning',
          })
          return
        }
        ElMessage({
          message: "正在导出，此操作大概有5S左右，请等待",
          type: 'success',
        })
        let begintime = this.value2[0]
        let endtime = this.value2[1]
        let domain = "yuding.greentree.com"
        let action = "dayData"
        axios
            .get("http://10.3.28.20:8889/export", {
              params: {
                beginTime: begintime, endTime: endtime, doMain: domain, action: action
              }, responseType: 'blob'
            })
            .then(function (response) {
              var blob = new Blob([response.data])
              var downloadElement = document.createElement('a');
              var href = window.URL.createObjectURL(blob); //创建下载的链接-->
              downloadElement.href = href;
              downloadElement.download = '预订' + String(begintime).substring(0, 10) + '.xls'; //下载后文件名-->
              document.body.appendChild(downloadElement);
              downloadElement.click(); //点击下载-->
              document.body.removeChild(downloadElement); //下载完成移除元素-->
              window.URL.revokeObjectURL(href); //释放掉blob对象-->
            })
            .catch(function (error) {
              ElMessage({
                message: error + "请联系管理员查看",
                type: 'warning',
              })
            });
      } else {
        ElMessage({
          message: "请选择日期",
          type: 'warning',
        })
      }
    },
    sendBase() {
      if (this.value2[0].toString() != '' && this.value2[1].toString() != '') {
        if (this.imageBase.toString().length == 0) {
          ElMessage({
            message: "请先生成图表",
            type: 'warning',
          })
          return
        }
        if (new Date(this.value2[0]) > new Date()) {
          ElMessage({
            message: "请选择正确的日期",
            type: 'warning',
          })
          return
        }
        if (new Date - this.sendTime > 20 * 1000) {
          ElMessage({
            message: "正在发送邮件，此操作大概用时10S，请等待",
            type: 'success',
          })
          axios.post(
              "http://10.3.28.20:8889/sendemail", {
                imageBase64: this.imageBase,
                beginTime: this.value2[0],
                domain: "yuding.greentree.cn"
              }
          ).then(res => {
            ElMessage({
              message: res.data.msg,
              type: 'success',
            })
          }).catch(function (error) {
            ElMessage({
              message: error + ":" + "请联系管理员",
              type: 'warning',
            })
          })
        } else {
          ElMessage({
            message: "操作频繁！请稍后重试",
            type: 'warning',
          })
        }
      } else {
        ElMessage({
          message: "请选择日期",
          type: 'warning',
        })
      }
    },
    getdata(id) {
      if (this.value2[0].toString() != '' && this.value2[1].toString() != '') {
        if (new Date(this.value2[0]) > new Date()) {
          ElMessage({
            message: "请选择正确的日期",
            type: 'warning',
          })
          return
        }
        this.data_startTime = []
        this.data_incallNum = []
        this.data_actualCallLoss = []
        this.data_actualCallLossRate = []
        this.data_maxLoginAgent = []
        this.maxNum = 0
        let begintime = this.value2[0]
        let endtime = this.value2[1]
        let domain = "yuding.greentree.com"
        if (document.getElementById(id).children.length != 0) {
          this.myChart.dispose()
        }
        axios.get("http://10.3.28.20:8889/getdata", {
          params: {
            beginTime: begintime, endTime: endtime, doMain: domain
          }
        })
            .then(res => {
              // ElMessage({
              //   message: res.data.msg + ":获取成功",
              //   type: 'success',
              // })
              this.data_maxLoginAgent.push(res.data.data[0].maxLoginAgent)
              let maxNum = res.data.data[0].incallNum
              for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].incallNum >= maxNum) {
                  maxNum = res.data.data[i].incallNum
                }
                this.data_startTime.push(new Date(res.data.data[i].startTime).Format("HH:mm"))
                this.data_actualCallLoss.push(res.data.data[i].actualCallLoss)
                this.data_incallNum.push(res.data.data[i].incallNum)
                if (res.data.data[i].floatActualCallLossRate != null) {
                  this.data_actualCallLossRate.push(parseFloat((res.data.data[i].floatActualCallLossRate) * 100).toFixed(0))
                } else {
                  this.data_actualCallLossRate.push(res.data.data[i].floatActualCallLossRate)
                }
                this.data_maxLoginAgent.push(res.data.data[i].maxLoginAgent)
              }
              // data_startTime.push('')
              // data_startTime.push('结束')
              // data_incallNum.push('')
              // data_actualCallLoss.push('')
              // data_actualCallLossRate.push('')
              this.data_maxLoginAgent.push(res.data.data[0].maxLoginAgent)
              var myChart = echarts.init(document.getElementById(id));
              this.myChart = myChart
              const option = {
                backgroundColor: '#ffffff',
                title: {
                  text: begintime.substring(0, 10) + '分时段 呼入数-放弃数-呼损率-当班人数 情况',
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
                  data: this.data_startTime,
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
                  interval: 10,//每次递增2
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
                grid: {
                  x: 50,
                  y: 50,
                  x2: 50,
                  y2: 50
                },
                series: [
                  {
                    name: '呼入数',
                    type: 'bar',
                    data: this.data_incallNum,
                    z: 3,
                    yAxisIndex: 0,
                    itemStyle: {
                      color: '#424242',
                    }
                  },
                  {
                    name: '呼入放弃数',
                    type: 'bar',
                    data: this.data_actualCallLoss,
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
                    data: this.data_maxLoginAgent,
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
                    data: this.data_actualCallLossRate,
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
              let that = this;
              this.rightAnswer = false;
              setTimeout(function () {
                that.imageBase = myChart.getDataURL({type: "jpeg"})
              }, 1500)
            })
            .catch(function (error) {
              ElMessage({
                message: error + ":" + "请联系管理员",
                type: 'warning',
              })
            });
      } else {
        ElMessage({
          message: "请选择日期",
          type: 'warning',
        })
      }
    },
  }
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
<style scoped>
.block {
  padding: 30px 0;
  text-align: center;
  flex: 1;
}

.block:last-child {
  border-right: none;
}

.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

