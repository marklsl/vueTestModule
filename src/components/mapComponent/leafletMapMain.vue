<template>
  <div class="vue-leaflet">
    <l-map @ready="setMap" class="leafLet_map_box"
           :zoom="zoom" :center="center" :options="options">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <TOOLLAYERGROUP></TOOLLAYERGROUP>
    </l-map>
<!--    <div class="test_getData" @click="getData">我是请求数据的按钮</div>-->
    <div v-if="if_tool">
      <TOOLMAIN></TOOLMAIN>
    </div>
    <div v-if="if_pop">
      <POP></POP>
    </div>
    <div v-if="if_thematic">
      <STATICTHEMATIC></STATICTHEMATIC>
    </div>
  </div>
</template>

<script>
  import { LMap, LTileLayer} from 'vue2-leaflet';
  import TOOLMAIN from "@/components/mapComponent/tool/toolMain";
  import TOOLLAYERGROUP from "@/components/mapComponent/layerGroup/toolDraw";
  import POP from "@/components/popGroup/rightPopup";
  import STATICTHEMATIC from "@/components/mapComponent/tool/secondLev/thematic/staticThematic";
  import {mapState} from 'vuex';

  export default {
    name: 'VueLeaflet',
    components: {
      LMap,
      LTileLayer,
      TOOLMAIN,
      TOOLLAYERGROUP,
      POP,
      STATICTHEMATIC
    },
    data () {
      return {
        options:{
          attributionControl:false,
          zoomControl:false
        },
        zoom: 7,
        center: L.latLng(34.346554, 108.952789),
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        if_tool:true,//是否展示工具栏
        map: {}
      }
    },
    methods:{
      setMap(map){
        window.map=map;
        this.$store.dispatch("mainStore/setMapName",map);
        this.$store.commit('mainStore/setL',L);
        // map.on('whenReady',function(){
        //   // setTimeout(
        //   //   function() {
        //       map.panTo(new L.LatLng(39.916485, 116.405994), {
        //         animate: true,
        //         duration: 0.5
        //       })
        //     // },200)
        // })
      }
    },
    mounted(){},
    computed: {
      ...mapState("popStore",{
        if_pop: state => state.ifPop
      }),
      ...mapState("thematic",{
          if_thematic: state =>state.ifThematic
      })
    }
  }
</script>

<style>
  @import  'theme/css/leafletMap.css';
</style>
