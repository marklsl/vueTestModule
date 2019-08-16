<template>
  <div class="line_box">
    <div class="line_dis" v-for="lineSign in lineArr">
      <l-polyline :lat-lngs="lineSign.lineGroup" :color="lineSign.lineColor" />
    </div>
  </div>
</template>
<script>
  import { LPolyline, LPopup } from 'vue2-leaflet';
  import {mapState} from 'vuex';

  export default {
    name: 'lineEle',
    components: {
      LPolyline,
      LPopup
    },
    data () {
      return {}
    },
    methods:{},
    computed: {
      ...mapState("signStore",
        {lineArr:state => state.staticLineArr.tool.sign}
        )
    },
    mounted(){
    }
  }
</script>


