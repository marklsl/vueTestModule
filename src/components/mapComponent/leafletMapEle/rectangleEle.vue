<template>
  <l-rectangle :bounds="bounds" :l-style="style" />
</template>
<script>
  import { LRectangle, LPopup } from 'vue2-leaflet';

  export default {
    name: 'rectangleEle',
    components: {
      LRectangle,
      LPopup
    },
    data () {
      return {
        bounds: [[47.341456, -1.397133], [47.303901, -1.243813]],
        style: { color: "red", weight: 5 },
        text: 'this is a rectangle'
      }
    },
    methods:{

    },
    mounted(){
    }
  }
</script>


