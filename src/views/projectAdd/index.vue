<template>
  <div class="project-add-container" ref="container">
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
      <el-button type="primary" @click="editProjectConfirm">确认添加</el-button>
    </div>
  </div>
</template>

<script>
import { addProject } from "@/api/projects";
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
      dialogFormVisible: true,
      orderList: new Array(20).fill(0).map((item, index) => index),
    };
  },
  methods: {
    editProjectConfirm() {
      const obj = {
        ...this.form,
        description: [this.form.description],
      };
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
          this.$router.push("/projectManagement/projectList");
          this.$message({
            type: "success",
            message: "项目添加成功!",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.project-add-container {
  padding: 20px;
}
</style>
