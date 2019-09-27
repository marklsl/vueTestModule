<template>
  <div class="latlng_location_content">
    <div class="latlng_location_ele_box">
      <span class="latlng_location_text">经度:</span>
      <el-input code="inputLngCode" placeholder="请输入经度,范围<73.67~135.04>" @blur="loseBlueFun($event)" v-model="inputLng"  class="latlng_location_input" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
      <div class="latlng_location_ele_error">*请输入国界范围内经度</div>
    </div>

    <div class="latlng_location_ele_box">
     <span class="latlng_location_text">纬度:</span>
      <el-input code="inputLatCode" placeholder="请输入纬度,范围<3.87~53.55>"  @blur="loseBlueFun($event)" v-model="inputLat" class="latlng_location_input" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
      <div class="latlng_location_ele_error">*请输入国界范围内纬度</div>
    </div>
    <el-button type="success" class="right_pop_button" @click="rightPopCallBackFun">定位</el-button>

<!--    <el-autocomplete-->
<!--      class="inline-input"-->
<!--      v-model="locationName"-->
<!--      :fetch-suggestions="queryLocationName"-->
<!--      placeholder="地名"-->
<!--      :trigger-on-focus="false"-->
<!--      clearable-->
<!--    >-->
<!--      <template slot-scope="{item}">-->
<!--        <div class="name_box" @click="setLocationName($event)">-->
<!--          <span class="name">{{ item.DMMC }}</span>-->
<!--          <span class="addr">{{ item.DMDZ }}</span>-->
<!--          <span class="location hide_class">{{ item.WZ }}</span>-->
<!--        </div>-->
<!--      </template>-->
<!--    </el-autocomplete>-->
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
        inputLat: '',
        locationName:"",
        item:{
            DMMC:"",
            DMDZ:"",
            WZ:""
        }
      }
    },
    methods:{
      //输入框失去焦点事件
      loseBlueFun:function(ele){
        if($(ele.currentTarget).attr("code")=="inputLngCode"){
          if(this.inputLng*1>135.04||this.inputLng*1<73.67){
            $(ele.currentTarget).parent().next().show();
          }else{
            $(ele.currentTarget).parent().next().hide();
          }
        }else{
          if(this.inputLat*1>53.55||this.inputLat*1<3.87){
            $(ele.currentTarget).parent().next().show();
          }else{
            $(ele.currentTarget).parent().next().hide();
          }
        }
      },
      //按钮点击事件
      rightPopCallBackFun:function(){
        let lng=this.inputLng;
        let lat=this.inputLat;
        if(!(this.inputLng*1>135.04||this.inputLng*1<73.67||this.inputLat*1>53.55||this.inputLat*1<3.87)){
          let mapNew = this.$store.getters["mainStore/getMapFn"];
          mapNew.panTo(new L.LatLng(39.99533655479004,116.51018142700197), {
            animate: true,
            duration: 0.5
          })
          //绘制点图片
          let oldMarkerArr = this.$store.getters["signStore/getMarkerArrFn"];
          let eleMarker = {
            latLng: L.latLng(39.99533655479004,116.51018142700197),
            markerIcon: {
              iconUrl: require('@/components/mapComponent/tool/theme/img/nameLocation.png'),
              iconSize: [32, 45],
              iconAnchor: [17, 50],
              popupAnchor: [0, -18]
            },
            text: 'this is a marker'
          };
          oldMarkerArr.tool.location=[];
          oldMarkerArr.tool.location.push(eleMarker);
          this.$store.dispatch("signStore/setMarkerArr", oldMarkerArr);

          mapNew.on("click testLocation", function (e) {
            console.log(e.latlng.lat+","+e.latlng.lng)
          });
        }
      },
      queryLocationName(){

      },
      setLocationName(){

      }
    },
  }
</script>
