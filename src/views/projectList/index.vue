<template>
  <div class="project-list-container">
    <!-- 数据表格 -->
    <div class="app-container">
      <el-table :data="data" stripe style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span style="margin: 0 auto">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="项目名称"
          width="260"
          align="center"
        >
          <template slot-scope="scope">
            <a
              style="margin-left: 10px"
              @click.prevent="handleToProjectAdress(scope.row.url)"
              >{{ scope.row.name }}</a
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="600"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="order"
          label="排序等级"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.order }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bigImg" label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="Github"
              placement="top"
              :hide-after="1000"
            >
              <el-button
                type=""
                class="iconfont icon-github githubIcon"
                size="mini"
                circle
                @click="handleToGithub(scope.row.github)"
              ></el-button>
            </el-tooltip>
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
                @click="handleModifyOneProject(scope.row.id)"
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
                @click="handleDeleteOneProject(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加项目按钮 -->
      <div class="add-container">
        <el-tooltip
          class="item"
          effect="dark"
          content="添加项目"
          placement="top"
          :hide-after="1000"
        >
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            circle
            @click="handleAddProject"
          ></el-button>
        </el-tooltip>
      </div>
    </div>

    <!-- 编辑项目内容 -->
    <el-dialog title="请编辑项目" :visible.sync="dialogFormVisible" top="50px">
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.description"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="Demo地址">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="github地址">
          <el-input v-model="form.github" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预览图">
          <Upload uploadTitle="" v-model="form.thumb" />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select
            v-model="form.order"
            placeholder="请选择排序等级"
            autocomplete="off"
          >
            <el-option
              v-for="item in orderList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editProjectConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getProjects,
  addProject,
  deleteProject,
  modifyProject,
} from "@/api/projects";
import Upload from "@/components/Upload";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: [],
      form: {
        description: "",
        name: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
      dialogFormVisible: false,
      orderList: new Array(20).fill(0).map((item, index) => index),
    };
  },
  methods: {
    fetchData() {
      getProjects().then(({ data }) => {
        const modifiedData = data.map((projectObj) => {
          return {
            ...projectObj,
            description: projectObj.description.join(""),
          };
        });
        this.data = modifiedData;
      });
    },
    handleToProjectAdress(projectAdress) {
      // console.log(`连接到该项目的地址${projectAdress}`);
      window.open(projectAdress, "_blank");
    },
    handleAddProject() {
      this.$router.push("/projectManagement/projectAdd");
    },
    handleDeleteOneProject(projectId) {
      console.log(`删除id为${projectId}的项目`);
      this.$confirm("确定要删除此项目吗?", "删除项目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await deleteProject(projectId);
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
    handleModifyOneProject(projectId) {
      // console.log(`修改一下id为${projectId}的项目`);
      this.dialogFormVisible = true;
      this.data.forEach((item) => {
        if (item.id === projectId) {
          this.form = item;
        }
      });
    },
    async editProjectConfirm() {
      let obj = {
        ...this.form,
        description: [this.form.description],
      };
      if (!this.form.id) {
        // 这里是添加项目
        addProject(obj).then((resp) => {
          let res = resp;
          if (typeof resp == "string") {
            res = JSON.parse(resp);
          }
          if (res.code) {
            this.$message({
              type: "error",
              message: "请填写完整内容~",
            });
          } else {
            this.fetchData();
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "项目添加成功!",
            });
          }
        });
      } else {
        // 这里是编辑修改项目
        modifyProject(obj.id, obj).then(() => {
          this.fetchData();
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: "修改项目成功!",
          });
        });
      }
    },
    handleToGithub(githubAdress) {
      // console.log(`跳转到该项目的github地址${githubAdress}`);
      window.open(githubAdress, "_blank");
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="scss">
.add-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
}
.githubIcon {
  background-color: #d8d8d8;
  &:hover {
    background-color: lighten(#d8d8d8, 10%);
  }
}
</style>
