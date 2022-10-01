<template>
  <div class="blog-list-container">
    <div class="app-container">
      <el-table :data="blogs" stripe style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="50" align="center">
          <template slot-scope="scope">
            <span style="margin: 0 auto">{{
              scope.$index + (currentPage - 1) * limit + 1
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="title"
          label="文章名称"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="description"
          label="文章描述"
          width="400"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.description }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="scanNumber"
          label="浏览数"
          width="70"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.scanNumber }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="comment"
          label="评论量"
          width="70"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.commentNumber }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="blogtype"
          label="所属分类"
          width="150"
          align="center"
        >
          <template slot-scope="scope" filters>
            <span style="margin-left: 10px">{{
              scope.row.category ? scope.row.category.name : "默认分类"
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="createDate"
          label="创建日期"
          width="170"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              parseCreatedDate(scope.row.createDate)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
              :hide-after="1000"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                circle
                @click="handleDeleteBlog(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
              :hide-after="1000"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        background
        layout="prev, pager, next, ->, sizes, jumper"
        :total="total"
        :page-sizes="[5, 10, 15, 20, 25]"
        :page-size="5"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        @prev-click="prevClickHandle"
        @next-click="nextClickHandle"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getBlog } from "@/api/blog";
import { parseTime } from "@/utils";
export default {
  data() {
    return {
      blogs: [],
      total: 0,
      limit: 5,
      currentPage: 1,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getBlog(this.currentPage, this.limit).then((resp) => {
        this.blogs = resp.data.rows;
        this.total = resp.data.total;
      });
    },
    parseCreatedDate(creatDate) {
      return parseTime(creatDate);
    },
    sizeChangeHandle(val) {
      this.limit = val;
      this.fetchData();
    },
    currentChangeHandle(val) {
      this.currentPage = val;
      this.fetchData();
    },
    prevClickHandle(val) {
      this.currentPage--;
    },
    nextClickHandle(val) {
      this.currentPage++;
    },
    handleDeleteBlog(blogInfo) {
      console.log(blogInfo);
    },
  },
};
</script>

<style scoped>
.page-container {
  margin: 5px 20px;
}
</style>
