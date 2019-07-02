<template>
  <div>
    <div class="box-wrap" @click="handleShowMediaBox">
     <p>点击选择图片</p>
     <i
      v-if="!value"
      style="margin-top: 20px;
      font-size: 60px; color: #eee;"
      class="iconfont iconicons01-copy">
     </i>
     <!-- 这是给用户看到的已经选好的当前封面 -->
     <img v-else width="90" :src="value" alt="">
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <!-- value设置默认显示name为first的组件 -->
      <el-tabs value="first">
        <el-tab-pane label="上传图片" name="first">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="{ Authorization: `Bearer ${$store.state.user.token}` }"
            name="image"
            v-bind:on-success="handleUploadImages"
            :show-file-list="false"
          >
            <!-- 上传成功，要预览的图片 -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="媒体库" name="second">媒体库</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOK">确 定</el-button>
      </span>
      </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'UploadImage',
  // value就是cover.images[索引] 里面的图片
  props: ['value'],
  data() {
    return {
      dialogVisible: false, // 是否显示弹框
      imageUrl: null
    }
  },
  methods: {
    handleShowMediaBox() {
      // 1.显示弹框
      this.dialogVisible = true
    },
    handleUploadImages(res) {
    //   console.log(res)
    //   console.log('上传成功')
      // 上传成功，预览图片
      this.imageUrl = res.data.url
    },
    handleOK() {
      // 必须是input
      this.$emit('input', this.imageUrl) // 将数据同步到绑定的数据中
      this.dialogVisible = false // 对话框关闭
    }
  }
}
</script>
<style lang="less" scoped>
.box-wrap {
  width: 200px;
  height: 200px;
  border: 1px solid #eee;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}
// 上传图片的样式
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
