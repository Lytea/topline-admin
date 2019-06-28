<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发表文章</span>
      <div>
        <!-- @click="handlePublish(false)表示不存为草稿 -->
        <!-- @click="handlePublish(true)表示存为草稿 -->
        <el-button type="success" @click="handlePublish(false)">发布</el-button>
        <el-button type="primary" @click="handlePublish(true)">存入草稿</el-button>
      </div>
    </div>
    <el-form v-loading="$route.name === 'publish-edit' && editLoading">
      <el-form-item>
        <el-input type="text" v-model="articleForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item>
        <quill-editor v-model="articleForm.content"
                      ref="myQuillEditor"
                      :options="editorOption">
        </quill-editor>
      </el-form-item>
      <el-form-item label="封面">
      </el-form-item>
      <el-form-item label="频道">
        <!-- $event就是事件参数，事件参数就是在handleChange函数中传入的val的值，就是4或8 -->
        <!-- <article-channel
          :value="articleForm.channel_id"
          @input="articleForm.channel_id = $event"
        ></article-channel> -->
        <!-- 上面可以简写为这样 -->
        <article-channel
          v-model="articleForm.channel_id"
        ></article-channel>
        <!-- <el-select v-model="articleForm.channel_id">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select> -->
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import ArticleChannel from '@/components/article-channel'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'AppPublish',
  components: {
    ArticleChannel,
    quillEditor
  },
  data() {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        cover: { // 封面
          type: 0,
          images: []
        },
        channel_id: 3 // 频道
      },
      editorOption: { // 富文本编辑器的内容
        // some quill options
      },
      editLoading: false
    }
  },
  created() {
    if (this.$route.name === 'publish-edit') {
      this.editArticles()
    }
  },
  methods: {
    // 加载修改(编辑)文章
    editArticles() {
      this.editLoading = true
      this.$http({
        method: 'GET',
        url: `/articles/${this.$route.params.id}`
      }).then(data => {
        // console.log(data)
        this.articleForm = data
        this.editLoading = false
      }).catch(err => {
        this.$message.error('加载文章详情失败')
      })
    },
    // 若不写draft=false会认为传入的是undefined，
    // 所以我让他默认为false表示不存为草稿
    handlePublish(draft = false) {
      this.$http({
        method: 'POST',
        url: '/articles',
        data: this.articleForm,
        params: {
          draft
        }
      }).then(data => {
        this.$message({
          type: 'success',
          message: '发布成功'
        })
      }).catch(error => {
        console.log(error)
        this.$message.error('发布失败')
      })
    }

  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)
  }
}
</script>
<style lang="less" scoped>
.publish-card{
  min-height: 100%;
  .header{
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
}
</style>
