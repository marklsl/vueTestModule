<template>
  <div class="latlng_location_content">
    <div class="latlng_location_ele_box">
      <span class="latlng_location_text">经度:</span>
      <el-input placeholder="请输入经度" v-model="inputLng"  class="latlng_location_input" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
    </div>

    <div class="latlng_location_ele_box">
     <span class="latlng_location_text">纬度:</span>
      <el-input placeholder="请输入纬度" v-model="inputLat" class="latlng_location_input" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
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
    },
  }
</script>
