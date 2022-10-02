<template>
  <div class="blog-type-container">
    <!-- 数据表格 -->
    <div class="app-container">
      <el-table :data="data" stripe style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span style="margin: 0 auto">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="blogType"
          label="博客类别"
          width="600"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="文章数量"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.articleCount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bigImg" label="操作" align="center">
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
                @click="editBlogTypeHandle(scope.row)"
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
                @click="deleteBlogTypeHandle(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="add-container">
        <el-tooltip
          class="item"
          effect="dark"
          content="添加分类"
          placement="top"
          :hide-after="1000"
        >
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="medium"
            circle
            @click="addBlogTypeHandle"
          ></el-button>
        </el-tooltip>
      </div>
    </div>

    <!-- 编辑博客类型 -->
    <el-dialog
      title="请编辑该分类信息"
      :visible.sync="dialogFormVisible"
      top="200px"
      width="400px"
    >
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="请选择">
            <el-option v-for="item in orderList" :key="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBlogTypeConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogType,
  addBlogType,
  deleteBlogType,
  modifyBlogType,
} from "@/api/blogType";
const ORDER_NUMBER = 20;
export default {
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      // 这个form属性是编辑或者新建博客分类时的内容
      form: {
        name: "",
        order: "",
      },
      value: "",
      orderList: new Array(ORDER_NUMBER).fill(0).map((item, index) => {
        return index;
      }),
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      await getBlogType().then((resp) => {
        this.data = resp.data;
      });
    },
    editBlogTypeHandle(blogTypeInfo) {
      this.form = { ...blogTypeInfo };
      this.dialogFormVisible = true;
    },
    // 修改确认按钮的处理方法
    editBlogTypeConfirm() {
      if (!this.form.id) {
        //这里是添加一条博客分类的操作

        console.log(`add:`, this.form);
        if (this.form.name === "") {
          this.$message({
            type: "warning",
            message: "请输入文章分类名称",
          });
          return;
        }
        addBlogType(this.form)
          .then(() => {
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "分类添加成功",
            });
            this.fetchData();
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: err,
            });
          });
      } else {
        //这里是编辑修改文章分类的操作
        console.log(`edit:`, this.form);
        const { name, order } = this.form;
        // 从表单里面拿到用户修改的数据，发送给服务器
        modifyBlogType(this.form.id, { name, order }).then((resp) => {
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: `修改${name}博客分类成功`,
          });
          this.fetchData();
        });
      }
    },
    // 添加一条标语的方法
    addBlogTypeHandle() {
      console.log("添加一条博客分类");
      this.form = {
        name: "",
        order: "",
      };
      this.dialogFormVisible = true;
    },
    // 删除一条博客分类的方法
    deleteBlogTypeHandle(blogTypeInfo) {
      this.$confirm(
        "此操作会使该分类下的博客变为未分类状态, 是否继续?",
        "是否删除此分类",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteBlogType(blogTypeInfo.id).then(() => {
            this.$message({
              type: "success",
              message: "删除分类成功",
            });
            this.fetchData();
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

<style>
.add-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
}
</style>
