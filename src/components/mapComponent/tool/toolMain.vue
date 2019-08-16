<template>
  <div class="tool_bar">
    <el-row class="btn_box">
      <div class="tool_ele_box">
        <span class="tool_ele_btn el-dropdown-link" code="CLOSE">清空</span>
        <span class="tool_ele_btn el-dropdown-link" code="TOOLPATH">路径规划
          <TOOLPATH ref="TOOLPATH"></TOOLPATH>
        </span>
        <el-dropdown class="tool_ele_btn" trigger="click" :hide-on-click="false">
          <span class="el-dropdown-link" code="THEMATIC">专题图<i class="el-icon-arrow-down el-icon--right"></i></span>
            <THEMATIC ref="THEMATIC"></THEMATIC>
        </el-dropdown>
        <el-dropdown class="tool_ele_btn" trigger="click" :hide-on-click="false">
          <span class="el-dropdown-link" code="SIGN">标记<i class="el-icon-arrow-down el-icon--right"></i></span>
          <SIGN ref="SIGN"></SIGN>
        </el-dropdown>
        <el-dropdown class="tool_ele_btn" trigger="click" :hide-on-click="false">
          <span class="el-dropdown-link" code="MEASURE">量测<i class="el-icon-arrow-down el-icon--right"></i></span>
          <MEASURE ref="MEASURE"></MEASURE>
        </el-dropdown>
        <el-dropdown class="tool_ele_btn" trigger="click" :hide-on-click="false">
          <span class="el-dropdown-link" code="LOCATION">定位<i class="el-icon-arrow-down el-icon--right"></i></span>
          <LOCATION ref="LOCATION"></LOCATION>
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
    import THEMATIC from "@/components/mapComponent/tool/secondLev/thematic/toolThematic"
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
        data() {
            return {}
        },
        methods: {
            openOrCloseTool: function (ele) {
                if ($(ele.currentTarget).hasClass("onClick")) {
                    $(ele.currentTarget).removeClass("onClick");
                    $(".tool_ele_box").animate({width: "0px"}, function () {
                        $(".tool_ele_box").addClass("hideClass");
                    });
                } else {
                    $(ele.currentTarget).addClass("onClick");
                    $(".tool_ele_box").removeClass("hideClass");
                    $(".tool_ele_box").animate({width: "500px"});
                }
            }
        },
        mounted() {
            let _self = this;
            $(".tool_ele_box").find(".el-dropdown-link").unbind("click").click(function () {
                if($(this).attr("code")=="CLOSE"){//如果是清空
                  let arrTool=$(".el-dropdown-link");
                  for(let i=0;i<arrTool.length;i++){
                      if($(arrTool[i]).attr("code")!="CLOSE"){
                          _self.$refs[$(arrTool[i]).attr("code")].clearModel();
                      }
                  }
                }else{
                    //清空模块的监听
                    let funName = $(".tool_ele_box").find(".el-dropdown-link.onClick").attr("code");
                    if (funName) {//如果之前有模块是打开的
                        if(funName!="CLOSE"){//清空按钮除外
                            _self.$refs[funName].removeEvent();
                        }
                    }
                }
                //清除之前的样式
                $(".tool_ele_box").find(".el-dropdown-link").removeClass("onClick");
                $(".el-dropdown-menu li").find("div").removeClass("onClick");
                //添加一个点击
                $(this).addClass("onClick");
            })
        }
    }
</script>

<style>
  @import 'theme/css/toolBar.css';
</style>
