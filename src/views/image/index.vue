<template>
  <el-card class="image-card">
    <div slot="header">
      <span>素材管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="action" size="small">
        <el-radio-button label="全部" @click.native="loadImages()"></el-radio-button>
        <el-radio-button label="收藏" @click.native="loadImages(true)"></el-radio-button>
      </el-radio-group>
      <!-- show-file-list是否显示已上传文件列表 -->
      <!-- action表示请求地址 -->
      <!-- name 上传的文件字段名 -->
      <!-- on-success 文件上传成功时的钩子 -->
      <!-- on-success是一个props参数 props绑定的是一个表达式，它会将表达式的计算结果绑定到这里 -->
      <el-upload
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="{ Authorization: `Bearer ${$store.state.user.token}` }"
        :show-file-list="false"
        name="image"
        :on-success="handleUploadImages"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-row :gutter="20">
      <el-col :span="4" v-for="item in images" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.url" style="width: 200px; height: 200px; text-align:center" alt>
          <div style="padding:10px;display:flex;justify-content:center">
            <el-button
              type="primary"
              :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
              circle
              plain
              @click="handleCollect(item)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-delete-solid"
              circle plain
              @click="handleDelete(item)"
            ></el-button>
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
    // 加载图片列表
    this.loadImages()
  },
  methods: {
    // 加载图片
    loadImages(collect = false) {
      this.$http({
        method: 'GET',
        url: '/user/images',
        params: {
          collect
        }
      }).then(data => {
        // console.log(data)
        this.images = data.results
      })
    },
    // 收藏功能
    handleCollect(aa) {
      const collect = !aa.is_collected
      this.$http({
        method: 'PUT',
        url: `/user/images/${aa.id}`,
        data: {
          collect: !aa.is_collected
        }
      })
        .then(data => {
          aa.is_collected = collect
          this.$message({
            type: 'success',
            message: `${collect ? '' : '取消'}收藏成功`
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error(`${collect ? '' : '取消'}收藏失败`)
        })
    },
    // 删除图片
    handleDelete(bb) {
      this.$http({
        method: 'DELETE',
        url: `/user/images/${bb.id}`
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        // 刷新数据列表
        this.loadImages()
      }).catch(err => {
        console.log(err)
        this.$message.error('删除成功')
      })
    },
    // 上传图片文件成功是会调用
    handleUploadImages() {
      this.loadImages()
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
