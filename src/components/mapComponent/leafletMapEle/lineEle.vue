<template>
  <div class="line_box">
    <div class="line_dis" v-for="lineSign in lineArr">
      <l-polyline :lat-lngs="lineSign.lineGroup" :color="lineSign.lineColor" />
    </div>
  </div>
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
        lineArr:[]
      }
    },
    methods:{},
    computed: {
      getStartLineArr() {
        return this.$store.state.staticLineArr;
      }
    },
    watch: {
      getStartLineArr(val) {
        this.lineArr=val;
      }
    },
    mounted(){
    }
  }
</script>


