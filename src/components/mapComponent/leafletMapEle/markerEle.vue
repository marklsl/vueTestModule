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
  import {mapState} from 'vuex';

  export default {
    name: 'markerEle',
    components: {
      LMarker,
      LPopup,
      LIcon
    },
    data () {
      return {}
    },
    methods:{},
    computed: {
      ...mapState("signStore",
          {
              markerArr: function (state) {
                  return state.markerArr.tool.sign.concat(state.markerArr.tool.location)
              }
          }
        )
    }
  }
</script>


