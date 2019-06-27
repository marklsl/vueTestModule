<template>
  <div class="area_box">
    <div class="area_dis" v-for="areaSign in areaArr">
      <l-polygon :lat-lngs="areaSign.polygonGroup" :color="areaSign.polygonColor" />
    </div>
  </div>
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
        areaArr:[]
      }
    },
    methods:{},
    computed: {
      getStartAreaArr() {
        return this.$store.state.staticAreaArr;
      }
    },
    watch: {
      getStartAreaArr(val) {
        this.areaArr=val;
      }
    },
    mounted(){}
  }
</script>


