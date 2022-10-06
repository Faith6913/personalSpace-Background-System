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
      <editor height="600px" ref="toastuiEditor" :options="editorOptions" />

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
      <el-select
        v-model="form.categoryId"
        placeholder="请选择博客分类"
        @change="changeHandle"
      >
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
        <el-button v-if="mode === 'edit'" @click="handleConsellModifyBlog"
          >取消修改</el-button
        >
        <el-button type="primary" @click="handleAddBlog">{{
          publishing ? "发布中..." : btnContent
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import { getBlogType } from "@/api/blogType.js";
import { getOneBlog, editBlog } from "@/api/blog";
import { postBlog } from "@/api/blog";
import "@toast-ui/editor/dist/i18n/zh-cn";
export default {
  props: ["mode"],
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
      blogId: "",
      btnContent: "发布文章",
      editorOptions: {
        language: "zh-cn",
      },
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
      if (this.mode === "edit") {
        this.blogId = this.$route.params.id;
        this.btnContent = "确认修改";
        getOneBlog(this.blogId).then(({ data }) => {
          // 接下来将获取的博客回填到表格里
          this.form = data;
          this.form.selected = data.category === null ? "" : data.category.name;
          this.form.categoryId = data.category === null ? "" : data.category.id;
          this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
          console.log(this.form);
        });
      }
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
        if (this.mode === "edit") {
          this.handleModifyBlog();
          return;
        }
        postBlog(obj).then(() => {
          this.publishing = false;
          this.$message({
            type: "success",
            message: "发布博客成功",
          });
          this.$router.push("/blogList");
        });
      } else {
        this.$message.error("请填写所有内容");
        this.publishing = false;
      }
    },
    handleModifyBlog() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markDown = this.$refs.toastuiEditor.invoke("getMarkdown");
      this.form.htmlContent = html;
      this.form.markdownContent = markDown;
      this.publishing = true;
      const obj = {
        title: this.form.title,
        description: this.form.description,
        categoryId: this.form.categoryId,
        toc: this.form.toc,
        createDate: new Date().getTime(),
        htmlContent: this.form.htmlContent,
        thumb: this.form.thumb,
        markdownContent: this.form.markdownContent,
      };
      console.log(obj);
      if (obj.title && obj.description && obj.categoryId) {
        editBlog({
          id: this.blogId,
          data: obj,
        }).then(() => {
          this.publishing = false;
          this.$message({
            type: "success",
            message: "修改博客成功",
          });
          this.$router.push("/blogList");
        });
      } else {
        this.$message.error("请填写所有内容");
        this.publishing = false;
      }
    },
    handleConsellModifyBlog() {
      this.$message("已取消修改博客操作");
      this.$router.push("/blogList");
    },
    // 强制更新一下，element-ui内部数据和ui没有同步，导致编辑页面的下拉菜单没办法选择，这里强制更新一下
    changeHandle() {
      this.$forceUpdate();
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
