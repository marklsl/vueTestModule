<template>
  <div class="tool_bar">
    <el-row class="btn_box">
      <div class="tool_ele_box">
        <span class="tool_ele_btn el-dropdown-link">清空</span>
          <span class="tool_ele_btn el-dropdown-link">路径规划</span>
          <span class="tool_ele_btn el-dropdown-link">专题图</span>
        <el-dropdown class="tool_ele_btn"  trigger="click">
          <span class="el-dropdown-link">标记<i class="el-icon-arrow-down el-icon--right"></i></span>
          <SIGN></SIGN>
        </el-dropdown>
        <el-dropdown class="tool_ele_btn"  trigger="click">
          <span class="el-dropdown-link">量测<i class="el-icon-arrow-down el-icon--right"></i></span>
          <MEASURE></MEASURE>
        </el-dropdown>
        <el-dropdown class="tool_ele_btn"  trigger="click">
          <span class="el-dropdown-link">定位<i class="el-icon-arrow-down el-icon--right"></i></span>
          <LOCATION></LOCATION>
        </el-dropdown>
      </div>

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
  import CLEARALLTOOL from "@/components/mapComponent/tool/secondLev/clearAllTool"
  export default {
    name: 'tool_bar',
    components: {
      TOOLPATH,
      THEMATIC,
      SIGN,
      MEASURE,
      LOCATION,
      CLEARALLTOOL,
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
          $(".tool_ele_box").animate({width:"500px"});
        }
      }
    },
    mounted() {
      $(".tool_ele_box").find(".el-dropdown-link").unbind("click").click(function(){
        $(".tool_ele_box").find(".el-dropdown-link").removeClass("onClick");
        $(this).addClass("onClick");
      })
    }
  }
</script>

<style>
  @import  'theme/css/toolBar.css';
</style>
