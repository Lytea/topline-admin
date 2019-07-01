<template>
  <el-card class="image-card">
    <div slot="header">
      <span>素材管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="action" size="small">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
      <el-button type="primary">上传图片</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="4" v-for="item in images" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.url" style="width: 200px; height: 200px; text-align:center" alt="">
          <div style="padding:10px;display:flex;justify-content:center">
            <el-button type="primary" :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'" circle plain></el-button>
            <el-button type="primary" icon="el-icon-delete-solid" circle plain></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      action: {},
      images: []
    }
  },
  created() {
    this.loadImages()
  },
  methods: {
    loadImages() {
      this.$http({
        method: 'GET',
        url: '/user/images'
      }).then(data => {
        // console.log(data)
        this.images = data.results
      })
    }
  }
}
</script>
<style lang="less" scoped>
.image-card {
  .action {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
