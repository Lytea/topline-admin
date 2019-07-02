<template>
  <div>
    <p>fans component</p>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="width: 600px; height: 400px;"></div>
    <br>
    <EChartsbar></EChartsbar>
  </div>
</template>
<script>
import echarts from 'echarts'
import EChartsbar from './components/echarts-bar.vue'
export default {
  name: 'fans-overview',
  components: {
    EChartsbar
  },
  data() {
    return {}
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    })
  }
}
</script>
<style lang="less" scoped>

</style>
