<template>
  <div class="ele_tool"></div>
</template>

<script>

    export default {
        name: 'toolLocation',
        components: {},
        data() {
            return {
                hasPop: false
            }
        },
        mounted(){},
        methods: {
            init: function () {
              this.$store.dispatch("popStore/setIfPop", true);
              this.$store.dispatch("popStore/setTitleNamePop", "定位");
              this.$store.dispatch("popStore/setTextContentCodePop", "location");
              this.$store.dispatch("popStore/setDtClassPop", "mr_height_width");
            },
            //移除本模块的地图监听
            removeEvent: function () {
                this.$store.dispatch("popStore/setIfPop", false);
            },
            //关闭功能，清除所有绘制
            clearModel: function () {
                this.removeEvent();
            }
        }
    }
</script>
