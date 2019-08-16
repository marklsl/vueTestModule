<template>
  <div class="ele_tool">
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>量测</el-dropdown-item>
    </el-dropdown-menu>
  </div>
</template>

<script>

  export default {
    name: 'toolMeasure',
    components: {
    },
    data () {
      return {
      }
    },
    methods:{
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
