<template>
  <div class="vue-leaflet">
    <l-map class="leafLet_map_box"
           :zoom="zoom" :center="center" :options="options">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker">
        <l-popup :content="text"></l-popup>
      </l-marker>
    </l-map>
<!--    <div class="test_getData" @click="getData">我是请求数据的按钮</div>-->
    <div v-if="if_tool">
      <TOOLMAIN></TOOLMAIN>
    </div>
  </div>
</template>

<script>
  import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
  import TOOLMAIN from "@/components/mapComponent/tool/toolMain";

  export default {
    name: 'VueLeaflet',
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
      TOOLMAIN
    },
    data () {
      return {
        options:{
          attributionControl:false,
          zoomControl:false
        },
        zoom: 13,
        center: L.latLng(47.413220, -1.219482),
        url: 'http://t0.tianditu.gov.cn/cva_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker: L.latLng(47.413220, -1.219482),
        text: 'this is a marker',

        if_tool:true//是否展示工具栏
      }
    },
    methods:{
      getData : function(){
        console.log("我是请求接口");
        this.$axios
          .get('/user/aaa')
          .then(successResponse => {
            debugger
            this.responseResult = JSON.stringify(successResponse.data)
            if (successResponse.data.code === 200) {
              // this.$router.replace({path: '/index'})
            }
          })
          .catch(failResponse => {});
      }
    }
  }
</script>

<style scoped>
  @import  'theme/css/leafletMap.css';
</style>
