<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <div class="app-container">
      <el-table :data="data" stripe style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span style="margin: 0 auto">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="150" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
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
        <el-table-column prop="midImg" label="中图片" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px"
              :src="`${scope.row.midImg}`"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="bigImg" label="大图片" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px"
              :src="`${scope.row.bigImg}`"
            ></el-image>
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
                @click="editBannerHandle(scope.row)"
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
                @click="deleteBannerHandle(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="add-container">
        <el-tooltip
          class="item"
          effect="dark"
          content="添加标语"
          placement="top"
          :hide-after="1000"
        >
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="medium"
            circle
            @click="addBannerHandle"
          ></el-button>
        </el-tooltip>
      </div>
    </div>

    <!-- 编辑首页标语 -->
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="50px">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.description"
          >
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <Upload uploadTitle="" v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页大图">
              <Upload uploadTitle="" v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from "@/api/banner.js";
// import { SERVE_URL } from "@/urlConfig.js";
import Upload from "@/components/Upload";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: [],
      // BASE_URL: SERVE_URL,
      dialogFormVisible: false,
      // 这个form属性是编辑或者新建标语时的内容
      form: {
        id: "",
        midImg: "",
        bigImg: "",
        title: "",
        description: "",
      },
      formLabelWidth: "40px",
      textarea2: "",
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      await getBanner().then((resp) => {
        this.data = resp.data;
      });
    },
    editBannerHandle(bannerInfo) {
      this.form = { ...bannerInfo };
      this.dialogFormVisible = true;
    },
    // 修改确认按钮的处理方法
    editBannerConfirm() {
      if (this.form.id === "") {
        console.log("这里是添加一条标语的操作");
        this.form.id = String(Math.random());
        this.data.push(this.form);
        setBanner(this.data).then((resp) => {
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: "已成功添加标语",
          });
        });
      } else {
        console.log("这里是编辑修改标语的操作");
        // 从表单里面拿到用户修改的数据，发送给服务器
        // 因为api文档要求三个首页标语都要上传，哪怕只改了其中一个
        this.data = this.data.map((bannerInfo) => {
          if (this.form.id === bannerInfo.id) {
            return {
              ...this.form,
            };
          }
          return {
            ...bannerInfo,
          };
        });
        setBanner(this.data).then((resp) => {
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: "已成功修改标语",
          });
        });
      }
    },
    // 添加一条标语的方法
    addBannerHandle() {
      console.log("添加一条标语");
      this.form = {
        id: "",
        midImg: "",
        bigImg: "",
        title: "",
        description: "",
      };
      // const test = this.data[0];
      this.dialogFormVisible = true;
      // this.data.push(test);
    },
    // 删除一条标语的方法
    deleteBannerHandle(bannerInfo) {
      this.form = {
        ...bannerInfo,
      };
      this.data = this.data.filter((banner) => {
        return banner.id !== this.form.id;
      });
      // 调用接口传给服务器，否则删了白删
      setBanner(this.data).then((resp) => {
        this.$message({
          type: "success",
          message: "删除标语成功",
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
