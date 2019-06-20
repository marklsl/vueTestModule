<template>
  <div class="vue-leaflet">
    <l-map @ready="getMap" class="leafLet_map_box"
           :zoom="zoom" :center="center" :options="options">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-layer-group id="draw_Layer">
        <l-marker :lat-lng="marker" :icon="icon" :options="makerOption">
          <l-popup :content="text"></l-popup>
        </l-marker>
<!--        <l-poly-line :lat-longs="lineGroup">-->
<!--          <l-popup :content="text"></l-popup>-->
<!--        </l-poly-line>-->
<!--        <l-polygon :latLongs="marker">-->
<!--          <l-popup :content="text"></l-popup>-->
<!--        </l-polygon>-->
      </l-layer-group>
    </l-map>
<!--    <div class="test_getData" @click="getData">我是请求数据的按钮</div>-->
    <div v-if="if_tool">
      <TOOLMAIN></TOOLMAIN>
    </div>
  </div>
</template>

<script>
  import { LMap, LTileLayer, LMarker, LPopup,LLayerGroup,LPolyline,LPolygon } from 'vue2-leaflet';
  import TOOLMAIN from "@/components/mapComponent/tool/toolMain";

  export default {
    name: 'VueLeaflet',
    components: {
      LMap,
      LTileLayer,
      LLayerGroup,
      LMarker,
      LPolyline,
      LPolygon,
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
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

        marker: L.latLng(47.413220, -1.219482),
        icon:L.icon({
          iconUrl: './tool/theme/img/location.png',
          iconSize: [38, 95],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76]
        }),
        makerOption:{
          icon:L.icon({
            iconUrl: './tool/theme/img/location.png',
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
          })
        },

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
