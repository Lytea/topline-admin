<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>{{ isEdit ? '编辑文章' : '发布文章'}}</span>
      <div>
        <!-- @click="handlePublish(false)表示不存为草稿 -->
        <!-- @click="handlePublish(true)表示存为草稿 -->
        <el-button
          :loading="publishLoading"
          type="success"
          @click="handlePublish(false)">{{ isEdit ? '更新' : '发布'}}</el-button>
        <el-button
          :loading="publishLoading"
          type="primary"
          @click="handlePublish(true)">存入草稿</el-button>
      </div>
    </div>
    <el-form v-loading="isEdit && editLoading">
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
         <el-radio-group v-model="articleForm.cover.type">
           <el-radio :label="1">单图</el-radio>
           <el-radio :label="3">三图</el-radio>
           <el-radio :label="0">无图</el-radio>
           <el-radio :label="-1">自动</el-radio>
         </el-radio-group>
         <template v-if="articleForm.cover.type > 0">
           <el-row>
             <!-- :span可以让三个图片水平放置 -->
             <el-col :span="6" v-for="item in articleForm.cover.type" :key="item">
               <UploadImage v-model="articleForm.cover.images[item - 1]"></UploadImage>
             </el-col>
           </el-row>
         </template>
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
import UploadImage from './components/uploadImage.vue'
import ArticleChannel from '@/components/article-channel'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

/*
如果是更新，则在第一次更新数据之后监视
如果是发布，一上来就监视
如果是从更新页面导航到发布页面，则清空发布页面的数据
如果是发布页面导航到更新页面，则重新加载页面的数据
*/
export default {
  name: 'AppPublish',
  components: {
    ArticleChannel,
    quillEditor,
    UploadImage
  },
  data() {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        cover: { // 封面
          type: 1, // 封面类型 -1自动 0无图 1 一张图 3 三张图
          images: [] // 图片链接，这里是真正存储图片的数组，图片链接
        },
        channel_id: 3 // 频道
      },
      editorOption: { // 富文本编辑器的内容
        // some quill options
      },
      editLoading: false,
      publishLoading: false, // 禁用更新和存入草稿按钮状态
      formDirty: false
    }
  },
  watch: {
    $route(to, from) {
      // console.log(to,from)
      if (from.name === 'publish-edit') {
        this.articleForm = {
          articleForm: {
            title: '', // 标题
            content: '', // 内容
            cover: { // 封面
              type: 0,
              images: []
            },
            channel_id: 3 // 频道
          }
        }
      }
    }
  },
  // watch: {
  //   articleForm: {
  //     handler() { // 当被监视数据发生改变的时候会被调用
  //       // console.log(123)
  //       this.formDirty = true
  //     },
  //     deep: true // 对象、数组类型需要配置深度监视
  //   }
  // },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    },
    isEdit() {
      return this.$route.name === 'publish-edit'
    },
    articleId() {
      return this.$route.params.id
    }
  },
  created() {
    // if (this.isEdit) {
    //   this.editArticles()
    // }
    // 可以简写为
    this.isEdit && this.editArticles()
    // 如果是发布页面，直接监视
    if (this.$route.name === 'publish') {
      this.watchForm()
    }
  },
  methods: {
    // 加载修改(编辑)文章
    editArticles() {
      this.editLoading = true
      this.$http({
        method: 'GET',
        url: `/articles/${this.articleId}`
      }).then(data => {
        // console.log(data)
        this.articleForm = data
        this.editLoading = false
        // 更新数据加载好以后，去开启监视
        this.$nextTick(() => {
          this.watchForm()
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('加载文章详情失败')
      })
    },
    // 若不写draft=false会认为传入的是undefined，
    // 所以我让他默认为false表示不存为草稿
    handlePublish(draft = false) {
      this.publishLoading = true // 禁用按钮的点击状态
      if (this.isEdit) {
        // 执行编辑操作
        this.SubmitEdit(draft).then(() => {
          this.publishLoading = false // 禁用按钮的点击状态
        })
      } else {
        // 执行添加操作
        this.SubmitAdd(draft).then(() => {
          this.publishLoading = false // 禁用按钮的点击状态
        })
      }
    },
    // 提交编辑操作
    SubmitEdit(draft) {
      return this.$http({
        method: 'PUT',
        url: `/articles/${this.articleId}`,
        data: this.articleForm,
        params: {
          draft
        }
      }).then(data => {
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      }).catch(error => {
        console.log(error)
        this.$message.error('编辑失败')
      })
    },
    // 提交添加操作
    SubmitAdd(draft) {
      return this.$http({
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
    },
    // 监视表单
    watchForm() {
      const unWatch = this.$watch('articleForm', function() {
        // console.log('watchForm')
        this.formDirty = true
        // 关闭监视器
        unWatch()
      }, {
        deep: true
      })
    }
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)
  },
  beforeRouteLeave(to, from, next) {
    // 如果数据没有修改，就允许通过
    if (!this.formDirty) {
      return next()
    }
    // 如果数据修改了，就提示用户
    const answer = window.confirm('当前有未保存的数据，确认要离开吗？')
    if (answer) {
      // 正常往后执行导航
      next()
    } else {
      // 取消当前导航
      next(false)
    }
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
