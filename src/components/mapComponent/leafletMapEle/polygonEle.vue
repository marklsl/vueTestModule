<template>
  <l-polygon :lat-lngs="polygonGroup" :color="polygonColor" />
</template>
<script>
  import { LPolygon, LPopup } from 'vue2-leaflet';

  export default {
    name: 'polygonEle',
    components: {
      LPolygon,
      LPopup
    },
    data () {
      return {
        polygonGroup: [
          [47.2263299, -1.6222],
          [47.21024000000001, -1.6270065],
          [47.237287, -1.6266632],
          [47.2263299, -1.6222]
        ],
        polygonColor: "#ff00ff",
        text: 'this is a polygon'
      }
    },
    methods:{

    },
    mounted(){
    }
  }
</script>


