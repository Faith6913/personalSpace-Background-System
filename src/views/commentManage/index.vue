<template>
  <div class="comment-list-container">
    <div class="app-container">
      <!-- 
        @filter-change="handleFilterChange" 
      -->
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
            <img
              :src="`${scope.row.avatar}`"
              alt="avatar"
              style="width: 50px"
            />
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

        <el-table-column prop="scanNumber" label="评论内容" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.content }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="createDate"
          label="评论时间"
          width="165"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              parseCreatedDate(scope.row.createDate)
            }}</span>
          </template>
        </el-table-column>
        <!-- 
          :filters="filterArr"
          :filter-method="filterHandler"
         -->
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

        <el-table-column label="删除评论" align="center" width="100">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
              :hide-after="1000"
            >
              <el-button type="text" @click="handleDeleteComment(scope.row)">
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
        :page-sizes="[1, 2, 3, 5, 10, 15, 20, 25]"
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
      filterArr: [],
      SERVE_URL: SERVE_URL,
      // columnKey: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getComments(this.currentPage, this.limit).then(({ data }) => {
        this.comments = data.rows;
        this.total = data.total;
        this.totalPage = Math.ceil(this.total / this.limit);
        // 下面的if判断会在删除博客的时候可能会触发，比如最后一页只有一条数据
        // 删除之后，总页码数就会减一，当前页码就大于了总页码，所以要进行处理
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
      this.setFilterArray();
    },
    async setFilterArray() {
      // 每次获取数据之和就调用下该函数，设置筛选数组
      const resp = await getComments(1, 10000);
      this.filterArr = [
        ...new Set(
          resp.data.rows.map((comment) => {
            return comment.blog.title;
          })
        ),
      ].map((item) => {
        return {
          text: item,
          value: item,
        };
      });
      console.log(this.filterArr);
    },
    parseCreatedDate(creatDate) {
      return parseTime(creatDate);
    },
    sizeChangeHandle(val) {
      this.limit = val;
      this.currentPage = 1;
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
    // 删除评论
    handleDeleteComment(commentInfo) {
      this.$confirm("是否继续删除该评论?", "是否删除此评论", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await deleteComment(commentInfo.id);
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
    handleOpenTitle(commentInfo) {
      window.open(`${FRONTED_END_URL}/blog/${commentInfo.id}`);
    },
    // 编辑博客
    handleEditBlog(commentInfo) {
      this.$router.push(`/blogEdit/${commentInfo.id}`);
    },

    // 筛选分类博客,遇到了问题，未能完成
    // 如何解决分页与数据同步的问题，筛选与数据分页的问题
    // 是不是后端接口的问题，如果放到前端又该如何解决。
    // filterHandler(value, row, column) {
    //   console.log("column", column);
    //   this.columnKey = column.id;
    //   return true;
    // },
    // handleFilterChange(obj) {
    //   console.log("obj:", obj, this.columnKey);
    //   console.log(obj[this.columnKey]);
    //   getComments(1, 100000).then(({ data }) => {
    //     console.log(typeof data, data);
    //     const newData = data.rows.filter((item) => {
    //       return item.blog.title === obj[this.columnKey][0];
    //     });
    //     this.comments = newData;
    //   });
    // },
  },
};
</script>

<style scoped>
.page-container {
  margin: 5px 20px;
}
</style>
