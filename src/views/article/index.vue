<template>
  <div>
    <!-- 筛选区域S -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>筛选条件</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterParams.status">
            <el-radio label="">全部</el-radio>
          <el-radio
            v-for="(item, index) in statTypes"
            :key="item.type"
            :label="index">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model="filterParams.channel_id" placeholder="请选择活动区域">
          <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"></el-option>
            <!-- :value是传给后端的数据 -->
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-col :span="11">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="begin_end_pubdate"
            @change="handleDateChange"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        </el-form>
    </el-card>
    <!-- 筛选区域E -->
    <el-card class="list-card">
      <div slot="header" class="clearfix">
        <span>共找到0条符合条件的内容</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <!-- table表格S -->
      <el-table
        :data="articles"
        style="width: 100%"
        v-loading="articleLoading"
        >
        <el-table-column
          prop="cover.images[0]"
          label="封面"
          width="180">
          <!-- 表格列默认只能输出文本，如果需要自定义里面的内容，则需要用template -->
          <!-- slot-scope是插槽作用域 -->
          <!-- scope.row是当前遍历对象 -->
          <template slot-scope="scope">
            <img width="50" :src="scope.row.cover.images[0]" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="statTypes[scope.row.status].type" >{{ statTypes[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="success" plain>修改</el-button>
            <el-button type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
        <!-- table表格E -->
      <!-- 数据分页S -->
      <!-- 1.分多少页，每页多少条数据 -->
      <!-- 2.页面改变加载对应页码数据 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :disabled="articleLoading"
        @current-change="handleCurrentChange"
        >
      </el-pagination>
      <!-- 数据分页E -->
    </el-card>
  </div>
 </template>

<script>
// const userInfo = JSON.parse(window.localStorage.getItem('user_info'))
export default {
  name: 'ArticleList',
  data() {
    return {
      articles: [], // 文章列表
      statTypes: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        value1: ''
      },
      filterParams: {
        status: '', // 文章状态
        channel_id: '', // 频道id
        begin_pubdate: '', // 开始时间
        end_pubdate: '' // 结束时间
      },
      begin_end_pubdate: [],
      channels: [], // 频道列表
      totalCount: 0,
      articleLoading: false
    }
  },
  created() {
    this.loadArticles() // 加载文章列表
    this.loadChannels() // 加载频道列表
  },
  methods: {
    loadArticles(page = 1) { // 设置参数默认值为第一页
      this.articleLoading = true
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page, // 请求数据的页码，不传为参数的默认值
          per_page: 10, // 请求数据的每页大小 获取10条数据
        }
      }).then(data => {
        this.articles = data.results // 列表数据
        this.totalCount = data.total_count // 总记录数
        this.articleLoading = false
      })
    },
    // 加载频道列表
    loadChannels() {
      this.$http({
        method: 'GET',
        url: '/channels'
      }).then(data => {
        // console.log(data)
        // 渲染到页面上
        this.channels = data.channels
      })
    },
    onSubmit() {
      // console.log('submit!')
    },
    handleCurrentChange(page) {
      // 当页码发生改变的时候，显示页码对应的数据
      // console.log(page)
      this.loadArticles(page)
    },
    handleDelete(article) {
      // console.log(article)
      this.$confirm('确认删除吗?', '删除成功', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'DELETE',
          url: `/articles/${article.id}`
        }).then(data => {
          console.log(data)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 重新加载数据
          this.loadArticles(this.page)
        })
      }).catch(() => { // 取消执行
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleDateChange(value) {
      // console.log(value)
      this.filterParams.begin_pubdate = value[0]
      this.filterParams.end_pubdate = value[1]
    }
  }
}
</script>

<style lang='less' scoped>
.filter-card{
    margin-bottom: 20px;
}
</style>
