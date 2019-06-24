<template>
  <l-marker :lat-lng="markerLocation">
    <l-icon :iconUrl="markerIcon.iconUrl" :iconSize="markerIcon.iconSize" :iconAnchor="markerIcon.iconAnchor" :popupAnchor="markerIcon.popupAnchor"></l-icon>
    <l-popup :content="text"></l-popup>
  </l-marker>
</template>
<script>
  import { LMarker, LPopup,LIcon } from 'vue2-leaflet';

  export default {
    name: 'markerEle',
    components: {
      LMarker,
      LPopup,
      LIcon
    },
    data () {
      return {
        markerLocation: L.latLng(47.413220, -1.219482),
        markerIcon:{
          iconUrl: require('@/components/mapComponent/tool/theme/img/location.png'),
          iconSize: [32, 32],
          iconAnchor: [16, 30],
          popupAnchor: [0, -18]
        },
        text: 'this is a marker'
      }
    },
    methods:{

    },
    mounted(){
    }
  }
</script>


