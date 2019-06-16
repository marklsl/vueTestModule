<template>
  <div class="tool_bar">
    <el-row class="btn_box">
      <el-collapse class="tool_ele_box" v-model="activeNames" @change="handleChange">
        <el-collapse-item class="tool_ele_btn" title="路径规划" name="tool_path">
          <TOOLPATH></TOOLPATH>
        </el-collapse-item>
        <el-collapse-item class="tool_ele_btn" title="专题图" name="tool_thematic">
          <THEMATIC></THEMATIC>
        </el-collapse-item>
        <el-collapse-item class="tool_ele_btn" title="标记" name="tool_sign">
          <SIGN></SIGN>
        </el-collapse-item>
        <el-collapse-item class="tool_ele_btn" title="量测" name="tool_measure">
          <MEASURE></MEASURE>
        </el-collapse-item>
        <el-collapse-item class="tool_ele_btn" title="定位" name="tool_location">
          <LOCATION></LOCATION>
        </el-collapse-item>
      </el-collapse>

      <div class="grid-content bg-purple-light onClick" @click="openOrCloseTool($event)">
        <el-button class="tool_bar_control" type="success" icon="el-icon-s-cooperation" title="工具箱" circle></el-button>
      </div>

    </el-row>
  </div>
</template>

<script>
  import TOOLPATH from "@/components/mapComponent/tool/secondLev/toolPath"
  import THEMATIC from "@/components/mapComponent/tool/secondLev/toolThematic"
  import SIGN from "@/components/mapComponent/tool/secondLev/toolSign"
  import MEASURE from "@/components/mapComponent/tool/secondLev/toolMeasure"
  import LOCATION from "@/components/mapComponent/tool/secondLev/toolLocation"
  export default {
    name: 'tool_bar',
    components: {
      TOOLPATH,
      THEMATIC,
      SIGN,
      MEASURE,
      LOCATION
    },
    data () {
      return {
      }
    },
    methods:{
      openOrCloseTool:function(ele){
        if($(ele.currentTarget).hasClass("onClick")){
          $(ele.currentTarget).removeClass("onClick");
          $(".tool_ele_box").animate({width:"0px"},function(){
            $(".tool_ele_box").addClass("hideClass");
          });
        }else{
          $(ele.currentTarget).addClass("onClick");
          $(".tool_ele_box").removeClass("hideClass");
          $(".tool_ele_box").animate({width:"400px"});
        }
      }
    }
  }
</script>

<style scoped>
  @import  'theme/css/toolBar.css';
</style>
