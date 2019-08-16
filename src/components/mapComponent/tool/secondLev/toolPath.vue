<template>
  <div class="ele_tool">
  </div>
</template>

<script>

  export default {
    name: 'toolPath',
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
