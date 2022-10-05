<template>
  <div class="about-container">
    <div class="app-container">
      <!-- 提示文字 -->
      <div class="set-title">关于我网址链接</div>
      <el-input
        v-model="data"
        placeholder="请输入链接 url"
        class="input"
      ></el-input>
      <!-- 确认设置 -->
      <div class="btn-container">
        <el-button type="primary" @click="handleSetUrl">{{
          setting ? "设置中..." : btnContent
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAbout, setAboutUrl } from "@/api/about.js";
export default {
  data() {
    return {
      data: "",
      btnContent: "提交设置",
      setting: false,
    };
  },
  created() {
    getAbout().then(({ data }) => {
      this.data = data;
    });
  },
  methods: {
    handleSetUrl() {
      this.setting = true;
      this.$confirm("确认修改个人介绍链接地址吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          setAboutUrl({
            url: this.data,
          });
          this.setting = false;
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消设置",
          });
        });
    },
  },
};
</script>

<style lang="scss">
.about-container {
  .set-title {
    margin: 10px 0;
    font-size: 20px;
    font-weight: bold;
  }
  .input {
    margin: 20px 0;
  }
}
</style>
