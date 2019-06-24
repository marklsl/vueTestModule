<template>
    <l-polyline :lat-lngs="lineGroup" :color="lineColor" />
</template>
<script>
  import { LPolyline, LPopup } from 'vue2-leaflet';

  export default {
    name: 'lineEle',
    components: {
      LPolyline,
      LPopup
    },
    data () {
      return {
        lineGroup: [
          [47.334852, -1.509485],
          [47.342596, -1.328731],
          [47.241487, -1.190568],
          [47.234787, -1.358337]
        ],
        lineColor: "green",
        text: 'this is a line'
      }
    },
    methods:{

    },
    mounted(){
    }
  }
</script>


