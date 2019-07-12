<template>
  <div class="tool_draw_Layer">
    <l-layer-group id="draw_Layer">
      <TOOLLINE></TOOLLINE>
      <TOOLMARKER></TOOLMARKER>
      <TOOLPOLYGON></TOOLPOLYGON>
<!--      <TOOLCIRCLE></TOOLCIRCLE>-->
<!--      <TOOLRECTANGLE></TOOLRECTANGLE>-->
    </l-layer-group>
  </div>
</template>
<script>
  import {LLayerGroup} from 'vue2-leaflet';
  import TOOLMARKER from '@/components/mapComponent/leafletMapEle/markerEle';
  import TOOLLINE from '@/components/mapComponent/leafletMapEle/lineEle';
  import TOOLPOLYGON from '@/components/mapComponent/leafletMapEle/polygonEle';
  import TOOLCIRCLE from '@/components/mapComponent/leafletMapEle/circleEle';
  import TOOLRECTANGLE from '@/components/mapComponent/leafletMapEle/rectangleEle';

  export default {
    name: 'toolDraw',
    components: {
      LLayerGroup,
      TOOLMARKER,
      TOOLLINE,
      TOOLPOLYGON,
      TOOLCIRCLE,
      TOOLRECTANGLE
    },
    data () {
      return {
      }
    },
    methods:{
    },
    mounted(){
    }
  }
</script>
