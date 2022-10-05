<template>
  <div class="comment-list-container">
    <div class="app-container">
      <el-table :data="messages" stripe style="width: 100%" border>
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
              :src="`${SERVE_URL}${scope.row.avatar}`"
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
          label="留言时间"
          width="165"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              parseCreatedDate(scope.row.createDate)
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="删除留言" align="center" width="100">
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
import { getMessages, deleteMessage } from "@/api/message";
import { parseTime } from "@/utils";
import { SERVE_URL, FRONTED_END_URL } from "@/urlConfig.js";
export default {
  data() {
    return {
      messages: [],
      total: 0,
      limit: 5,
      currentPage: 1,
      totalPage: 0,
      filterArr: [],
      SERVE_URL: SERVE_URL,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getMessages(this.currentPage, this.limit).then(({ data }) => {
        this.messages = data.rows;
        this.total = data.total;
        this.totalPage = Math.ceil(this.total / this.limit);
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
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
    // 删除留言
    handleDeleteComment(commentInfo) {
      this.$confirm("是否继续删除该评论?", "是否删除此留言", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await deleteMessage(commentInfo.id);
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
  },
};
</script>

<style scoped>
.page-container {
  margin: 5px 20px;
}
</style>
