<template>
  <div class="ele_tool">
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <div code="static" @click="staticThematic()">静态</div>
      </el-dropdown-item>
      <el-dropdown-item>
        <div code="dynamic" @click="dynamicThematic()">动态</div>
      </el-dropdown-item>
      <div v-if="code==1">
        <STATICTHEMATIC></STATICTHEMATIC>
      </div>
    </el-dropdown-menu>
  </div>
</template>

<script>
    import STATICTHEMATIC from "@/mapComponent/tool/secondLev/thematic/staticThematic"
    // import DYNAMICTHEMATIC from "@/mapComponent/tool/secondLev/thematic/dynamicThematic"
    export default {
        name: 'toolThematic',
        components: {
            STATICTHEMATIC
        },
        data() {
            return {
                code:0
            }
        },
        methods: {
            //静态截取
            staticThematic: function () {
              this.code=1;
            },
            //动态截取
            dynamicThematic: function () {

            },
            //移除本模块的地图监听
            removeEvent: function () {
                let map = this.$store.getters["mainStore/getMapFn"];
            },
            //关闭功能，清除所有绘制
            clearModel: function () {
                this.removeEvent();
            }
        }
    }
</script>
