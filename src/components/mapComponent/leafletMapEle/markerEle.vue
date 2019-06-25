<template>
  <div class="marker_box">
    <div class="marker_dis" v-for="markerSign in markerArr">
      <l-marker :lat-lng="markerSign.latLng">
        <l-icon :iconUrl="markerSign.markerIcon.iconUrl" :iconSize="markerSign.markerIcon.iconSize" :iconAnchor="markerSign.markerIcon.iconAnchor" :popupAnchor="markerSign.markerIcon.popupAnchor" />
        <l-popup :content="markerSign.text"/>
      </l-marker>
    </div>
  </div>
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
        markerArr:[]
      }
    },
    methods:{},
    computed: {
      getarkerArr() {
        return this.$store.state.markerArr;
      }
    },
    watch: {
      getarkerArr(val) {
        this.markerArr=val;
      }
    },
    mounted(){
    }
  }
</script>


