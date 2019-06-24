<template>
  <l-circle :lat-lng="center" :radius="radius" />
</template>
<script>
  import { LCircle, LPopup } from 'vue2-leaflet';

  export default {
    name: 'circleEle',
    components: {
      LCircle,
      LPopup
    },
    data () {
      return {
        center:L.latLng(47.41322, -1.0482),
        radius: 4500,
        text: 'this is a circle'
      }
    },
    methods:{

    },
    mounted(){
    }
  }
</script>


