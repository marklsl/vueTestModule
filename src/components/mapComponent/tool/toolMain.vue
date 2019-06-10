<template>
  <div class="tool_bar">
    <el-row class="btn_box">
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="20" class="ele_box_div">
        <div class="tool_ele_box">
          <div class="tool_ele_btn">路径规划</div>
          <div class="tool_ele_btn">专题图</div>
          <div class="tool_ele_btn">标记</div>
          <div class="tool_ele_btn">量测</div>
          <div class="tool_ele_btn">定位</div>
<!--          <el-button code="tool_path_btn" type="success" size="mini" round>路径规划</el-button>-->
<!--          <el-button code="tool_thematic_map_btn" type="success" size="mini" round>专题图</el-button>-->
<!--          <el-button code="tool_sign_btn" type="success" size="mini" round>标记</el-button>-->
<!--          <el-button code="tool_measurement_btn" type="success" size="mini" round>量测</el-button>-->
<!--          <el-button code="tool_location_btn" type="success" size="mini" round>定位</el-button>-->
        </div>
      </el-col>

      <el-col :xs="4" :sm="6" :md="8" :lg="4" :xl="4">
        <div class="grid-content bg-purple-light">
          <el-button class="tool_bar_control" type="success" icon="el-icon-s-cooperation" title="工具箱" circle></el-button>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>

  export default {
    name: 'tool_bar',
    components: {
    },
    data () {
      return {
      }
    },
    methods:{
    }
  }
</script>

<style scoped>
  @import  'theme/css/toolBar.css';
</style>
