<template>
  <div class="ele_tool">
    <div code="point" @click="dynamicMapping($event)">标点</div>
    <div code="line" @click="dynamicMapping($event)">标线</div>
    <div code="area" @click="dynamicMapping($event)">标面</div>
  </div>
</template>

<script>
  import { utilFunction } from '../../../../util/util.js'
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
        let param={};
        param.L=this.$store.getters.getLeafletFn;
        param.map=this.$store.getters.getMapFn;
        let utilJs=new utilFunction(param);

        var pointParam={
          latlng:[39.91737,116.401394],
          radius:10,
          color:'#ff0000',
          fillColor:'#000000',
          fillColor:'0.8',
        };
        utilJs.drawPoint(pointParam);
        if($(ele.currentTarget).hasClass("onClick")){
          $(ele.currentTarget).removeClass("onClick")
        }else{
          $(ele.currentTarget).addClass("onClick")
        }
      }
    }
  }
</script>
