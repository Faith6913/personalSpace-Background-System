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
          width="300"
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
                type="primary"
                class="iconfont icon-github-fill"
                size="small"
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
                size="medium"
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
                size="medium"
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
            size="medium"
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
export default {
  data() {
    return {
      data: [],
      form: {
        description: "",
        name: "",
        url: "",
        github: "",
        thumb: "",
        order: 0,
      },
      dialogFormVisible: false,
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
      console.log(`连接到该项目的地址${projectAdress}`);
    },
    handleAddProject() {
      console.log("添加一条项目");
      this.dialogFormVisible = true;
    },
    handleDeleteOneProject(projectId) {
      console.log(`删除id为${projectId}的项目`);
    },
    handleModifyOneProject(projectId) {
      console.log(`修改一下id为${projectId}的项目`);
    },
    editProjectConfirm() {
      console.log("确认修改项目内容");
    },
    handleToGithub(githubAdress) {
      console.log(`跳转到该项目的github地址${githubAdress}`);
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
</style>
