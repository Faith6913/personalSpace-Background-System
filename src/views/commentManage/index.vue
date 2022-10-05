<template>
  <div class="comment-list-container">
    <div class="app-container">
      <el-table :data="comments" stripe style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="50" align="center">
          <template slot-scope="scope">
            <span style="margin: 0 auto">{{
              scope.$index + (currentPage - 1) * limit + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="头像"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.avatar }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="昵称"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="scanNumber"
          label="评论内容"
          width="400"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.content }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="createDate"
          label="创建日期"
          width="165"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              parseCreatedDate(scope.row.createDate)
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="blogtype"
          label="所属博客"
          width="150"
          align="center"
        >
          <template slot-scope="scope" filters>
            <span style="margin-left: 10px">{{
              scope.row.blog ? scope.row.blog.title : "无"
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
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
                @click="handleEditBlog(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
              :hide-after="1000"
            >
              <el-button type="text" @click="handleDeleteBlog(scope.row)">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  circle
                ></el-button>
              </el-button>
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
// import { getBlog, deleteBlog } from "@/api/blog";
import { getComments, addComment, deleteComment } from "@/api/comments";
import { parseTime } from "@/utils";
import { SERVE_URL, FRONTED_END_URL } from "@/urlConfig.js";
export default {
  data() {
    return {
      comments: [],
      total: 0,
      limit: 5,
      currentPage: 1,
      totalPage: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getComments(this.currentPage, this.limit).then(({ data }) => {
        this.comments = data.rows;
        // for (let i of this.comments) {
        //   if (i.avatar) {
        //     i.avatar = SERVE_URL + i.avatar;
        //   } else {
        //     i.avatar = "";
        //   }
        //   this.srcList.push(i.avatar);
        // }
        this.total = data.total;
        this.totalPage = Math.ceil(this.total / this.limit);
        // 下面的if判断会在删除博客的时候可能会触发，比如最后一页只有一条数据
        // 删除之后，总页码数就会减一，当前页码就大于了总页码，所以要进行处理
        // if (this.currentPage > this.totalPage) {
        //   this.currentPage = this.totalPage;
        //   this.fetchData();
        // }
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
    prevClickHandle() {
      this.currentPage--;
    },
    nextClickHandle() {
      this.currentPage++;
    },
    // 删除博客
    handleDeleteBlog(blogInfo) {
      this.$confirm(
        "删除该博客会将该博客下面的评论一并删除, 是否继续?",
        "是否删除此博客",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          await deleteBlog(blogInfo.id);
          this.fetchData();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 打开前端文章页面
    handleOpenTitle(blogInfo) {
      window.open(`${FRONTED_END_URL}/blog/${blogInfo.id}`);
    },
    // 编辑博客
    handleEditBlog(blogInfo) {
      this.$router.push(`/blogEdit/${blogInfo.id}`);
    },
  },
};
</script>

<style scoped>
.page-container {
  margin: 5px 20px;
}
</style>
