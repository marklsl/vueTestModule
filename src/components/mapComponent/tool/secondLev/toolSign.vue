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
        map:this.$store.getters.getMapFn,
        iconUrl:"../../tool/theme/img/location.png"
      }
    },
    methods:{
      dynamicMapping:function(ele){
        // //绘制点
        // let param={};
        // param.L=this.$store.getters.getLeafletFn;
        // param.map=this.$store.getters.getMapFn;
        // let utilJs=new utilFunction(param);
        // var pointParam={
        //   latlng:[39.91737,116.401394],
        //   radius:10,
        //   color:'#ff0000',
        //   fillColor:'#000000',
        //   fillColor:'0.8',
        // };
        // utilJs.drawPoint(pointParam);
        if($(ele.currentTarget).hasClass("onClick")){
          $(ele.currentTarget).removeClass("onClick");
          this.map.off();
          this.map.on("click",function(e){
            L.marker([e.latlng.lat, e.latlng.lng], {icon: this.iconUrl}).addTo(this.map).bindPopup("I am a green leaf.");
          });
        }else{
          $(ele.currentTarget).addClass("onClick");
          this.map.off();
        }
      }
    }
  }
</script>
