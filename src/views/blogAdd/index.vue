<template>
  <div class="blog-add-container">
    <div class="app-container">
      <!-- 博客标题 -->
      <div class="blog-title">博客标题</div>
      <el-input
        v-model="form.title"
        placeholder="请输入博客标题"
        class="input"
      ></el-input>

      <!-- 博客编辑 -->
      <div class="blog-title">博客编辑</div>
      <editor height="600px" ref="toastuiEditor" />

      <!-- 博客描述 -->
      <div class="blog-title">博客描述</div>
      <el-input
        type="textarea"
        v-model="form.description"
        placeholder="请输入博客描述"
        :autosize="{ minRows: 6, maxRows: 10 }"
      ></el-input>

      <!-- 文章头图 -->
      <div class="blog-title">博客头图</div>
      <Upload width="100px" v-model="form.thumb" />

      <!-- 选择分类 -->
      <div class="blog-title">选择博客分类</div>
      <el-select v-model="form.categoryId" placeholder="请选择博客分类">
        <el-option
          v-for="item in blogType"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>

      <!-- 发布博客 -->
      <div class="btn-container">
        <el-button type="primary" @click="handleAddBlog">{{
          publishing ? "发布中..." : "发布博客"
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import Upload from "@/components/Upload";
import { Editor } from "@toast-ui/vue-editor";
import { getBlogType } from "@/api/blogType.js";
import { postBlog } from "@/api/blog";
export default {
  data() {
    return {
      form: {
        title: "",
        description: "", // 博客描述
        htmlContent: "", // 用户编辑的内容
        thumb: "",
        categoryId: "",
        toc: [], // 后续服务器会根据markdown的内容生成toc目录
        markdownContent: "",
      },
      blogType: [],
      publishing: false,
    };
  },
  components: {
    editor: Editor,
    Upload,
  },
  methods: {
    fetchData() {
      getBlogType().then(({ data }) => {
        this.blogType = data;
      });
    },
    handleAddBlog() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markDown = this.$refs.toastuiEditor.invoke("getMarkdown");
      this.form.htmlContent = html;
      this.form.markdownContent = markDown;
      this.publishing = true;

      const obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.categoryId,
        htmlContent: this.form.htmlContent,
        thumb: this.form.thumb,
        markdownContent: this.form.markdownContent,
      };
      if (obj.title && obj.description && obj.categoryId) {
        postBlog(obj).then(() => {
          this.publishing = false;
          this.$message({
            type: "success",
            message: "发布博客成功",
          });
        });
      } else {
        this.$message.error("请填写所有内容");
        this.publishing = false;
      }
    },
  },

  created() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.blog-add-container {
  margin-bottom: 50px;
  .app-container {
    .blog-title {
      margin: 15px 0;
      font-size: 16px;
      font-weight: 100;
    }
    .input {
      width: 300px;
    }
  }
  .btn-container {
    margin: 20px 0;
  }
}
</style>
