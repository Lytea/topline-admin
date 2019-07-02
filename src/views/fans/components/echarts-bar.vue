<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div ref="main" style="width: 600px; height: 400px;"></div>
</template>
<script>
import echarts from 'echarts'
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      myChart: null
    }
  },
  mounted() {
    // 初始化一个图表组件
    this.initChart()
    // 异步加载数据
    this.loadchart()
    // loading动画
    this.myChart.showLoading()
  },
  methods: {
    // 初始化一个图表
    initChart() {
      this.myChart = echarts.init(this.$refs.main)
      // 显示标题，图例和空的坐标轴
      this.myChart.setOption({
        title: {
          text: '异步数据加载示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: []
        }]
      })
    },
    // 异步加载数据
    loadchart() {
      setTimeout(() => {
        this.myChart.hideLoading()
        this.$http({
          method: 'GET',
          url: 'http://localhost:3000/barDatas'
        }).then(data => {
          // 填入数据
          this.myChart.setOption({
            xAxis: {
              data: data.xAxisData
            },
            series: [{
              // 根据名字对应到相应的系列
              name: '销量',
              data: data.seriesData
            }]
          })
        })
      }, 2000)
    }
  }

}
</script>
<style lang="less" scoped>

</style>
