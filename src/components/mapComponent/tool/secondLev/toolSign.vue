<template>
  <div class="ele_tool">
    <div code="point" @click="dynamicMapping($event)">标点</div>
    <div code="line" @click="dynamicMapping($event)">标线</div>
    <div code="area" @click="dynamicMapping($event)">标面</div>
  </div>
</template>

<script>

  export default {
    name: 'toolSign',
    components: {
    },
    data () {
      return {
      }
    },
    methods:{
      dynamicMapping:function(ele){
        if($(ele.currentTarget).hasClass("onClick")){

        }
      }
    }
  }
</script>
