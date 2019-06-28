<template>
  <!-- el-select这个组件有一个属性叫value必须的，冒号里面的value是props中传下来的 -->
  <!-- props是单项数据流，父组件的更新会影响子组件，但是子组件不会影响父组件 -->
  <!-- sl-select有一个change事件，当选中项发生改变触发，回调参数就是选中项的value -->
  <el-select :value="value" @change="handleChange" clearable>
    <el-option
    v-for="item in channels"
    :key="item.id"
    :label="item.name"
    :value="item.id"></el-option>
  </el-select>
</template>
<script>
export default {
  name: 'ArticleChannel',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      channels: []
    }
  },
  created() {
    this.loadChannel() // 加载频道列表
  },
  methods: {
    handleChange(val) {
      this.$emit('input', val)
    },
    loadChannel() {
      this.$http({
        method: 'GET',
        url: '/channels'
      }).then(data => {
        // console.log(data) // 返回的数据是channels这个对象
        this.channels = data.channels
      }).catch(err => {
        console.log(err)
        this.$message.error('加载频道列表失败')
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
