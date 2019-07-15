<template>
  <div class="latlng_location_content">
    <div class="latlng_location_ele_box">
      <span class="latlng_location_text">经度:</span>
      <el-input placeholder="请输入经度,范围<73.66666~135.0416666>" v-model="inputLng"  class="latlng_location_input" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
    </div>

    <div class="latlng_location_ele_box">
     <span class="latlng_location_text">纬度:</span>
      <el-input placeholder="请输入纬度,范围<3.8666666~53.55>" v-model="inputLat" class="latlng_location_input" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'latlngLocation',
    components: {
    },
    data () {
      return {
        inputLng: '',
        inputLat: ''
      }
    },
    methods:{
      rightPopCallBackFun:function(){
        let lng=this.inputLng;
        let lat=this.inputLat;
        if(lng*1>135.0416666||lng*1<73.66666){
          alert("请输入国界范围内经度");
          return;
        }else if(lat*1>53.55||lat*1<3.8666666){
          alert("请输入国界范围内纬度")
          return;
        }
        let mapNew = this.$store.getters["mainStore/getMapFn"];
        mapNew.panTo(new L.LatLng(lat, lng), {
          animate: true,
          duration: 0.5
        })
      }
    },
  }
</script>
