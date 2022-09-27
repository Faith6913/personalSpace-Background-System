<template>
  <div class="app-container">
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
          width="500"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="midImg" label="中图片" align="center">
          <template slot-scope="scope">
            <el-image style="width: 100px" :src="`${BASE_URL}${scope.row.bigImg}`"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="bigImg" label="大图片" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px"
              :src="`${BASE_URL}${scope.row.bigImg}`"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="bigImg" label="操作" align="center">
          <template slot-scope="">
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
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getBanner } from "@/api/banner.js";
import { SERVE_URL } from "@/urlConfig.js";
export default {
  data() {
    return {
      data: [],
      BASE_URL: SERVE_URL,
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      await getBanner().then((resp) => {
        console.log(resp.data);
        this.data = resp.data;
      });
    },
  },
};
</script>

<style></style>
