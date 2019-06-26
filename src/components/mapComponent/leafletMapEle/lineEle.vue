<template>
  <div class="line_box">
    <div class="line_dis" v-for="lineSign in lineArr">
      <l-polyline :lat-lngs="lineSign.lineGroup" :color="lineSign.lineColor" />
    </div>
    <l-polyline :lat-lngs="moveLine.lineGroup" :color="moveLine.lineColor" />
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
        lineArr:[],
        moveLine:{
          lineGroup: [
            [47.334852, -1.509485],
            [47.342596, -1.328731]
          ],
          lineColor: "green",
          text: 'this is a line'
        }
      }
    },
    methods:{},
    computed: {
      getLineArr() {
        return this.$store.state.lineArr;
      }
    },
    watch: {
      getLineArr(val) {
        this.lineArr=val;
      }
    },
    mounted(){
    }
  }
</script>


