<template>
  <div class="vue-leaflet">
    <l-map @ready="getMap" class="leafLet_map_box"
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
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        // url: 'http://t{s}.tianditu.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        // attribution: '["0", "1", "2", "3", "4", "5", "6", "7"]',
        marker: L.latLng(47.413220, -1.219482),
        text: 'this is a marker',
        if_tool:true,//是否展示工具栏
        map: {}
      }
    },
    methods:{
      getData : function(){
        console.log("我是请求接口");
        this.$axios
          .get('/user/aaa')
          .then(successResponse => {
            this.responseResult = JSON.stringify(successResponse.data)
            if (successResponse.data.code === 200) {
              // this.$router.replace({path: '/index'})
            }
          })
          .catch(failResponse => {});
      },
      getMap(map){
        this.$store.dispatch("setMapName",map);
        this.$store.commit('setL',L);
      }
    },
    mounted(){
    }
  }
</script>

<style>
  @import  'theme/css/leafletMap.css';
</style>
