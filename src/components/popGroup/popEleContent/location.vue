<template>
  <div class="location_content_box">
    <div class="latlng_location_content">
      <div class="latlng_location_ele_box">
        <span class="latlng_location_text">经度:</span>
        <el-input code="inputLngCode" placeholder="请输入经度,范围<73.67~135.04>" @blur="loseBlueFun($event)"
                  v-model="inputLng" class="latlng_location_input"
                  oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
        <div class="latlng_location_ele_error">*请输入国界范围内经度</div>
      </div>

      <div class="latlng_location_ele_box">
        <span class="latlng_location_text">纬度:</span>
        <el-input code="inputLatCode" placeholder="请输入纬度,范围<3.87~53.55>" @blur="loseBlueFun($event)" v-model="inputLat"
                  class="latlng_location_input" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
        <div class="latlng_location_ele_error">*请输入国界范围内纬度</div>
      </div>
      <el-button type="success" class="right_pop_button" @click="rightPopCallBackFun">定位</el-button>
      <el-button type="success" class="right_pop_button" @click="changeLocationMethod(0)">地名地址定位</el-button>
    </div>

    <div class="name_location">
      <el-autocomplete
        class="inline-input"
        v-model="locationName"
        :fetch-suggestions="queryLocationName"
        placeholder="地名"
        :trigger-on-focus="false"
        clearable
      >
        <template slot-scope="{item}">
          <div class="name_box" @click="setLocationName(item.name)">
            <span class="name">{{ item.name }}</span>
            <span class="addr">{{ item.address }}</span>
            <span class="location hide_class">{{ item.gbCode }}</span>
          </div>
        </template>
      </el-autocomplete>
      <el-button type="success" class="right_pop_button" @click="changeLocationMethod(1)">经纬度定位</el-button>
    </div>

  </div>
</template>

<script>
    import {getMethod} from '../../../assets/js/api/interface.js'

    export default {
        name: 'latlngLocation',
        components: {},
        data() {
            return {
                inputLng: '',
                inputLat: '',
                locationName: "",
                item: {
                    address: "",
                    gbCode: "",
                    name: ""
                },
                isLatLngLocation: true
            }
        },
        methods: {
            //输入框失去焦点事件
            loseBlueFun: function (ele) {
                if ($(ele.currentTarget).attr("code") == "inputLngCode") {
                    if (this.inputLng * 1 > 135.04 || this.inputLng * 1 < 73.67) {
                        $(ele.currentTarget).parent().next().show();
                    } else {
                        $(ele.currentTarget).parent().next().hide();
                    }
                } else {
                    if (this.inputLat * 1 > 53.55 || this.inputLat * 1 < 3.87) {
                        $(ele.currentTarget).parent().next().show();
                    } else {
                        $(ele.currentTarget).parent().next().hide();
                    }
                }
            },
            //按钮点击事件
            rightPopCallBackFun: function () {
                let lng = this.inputLng;
                let lat = this.inputLat;
                this.pointPositioning(lat,lng);
            },
            /**
             * 切换定位方式
             */
            changeLocationMethod(code) {
                if (code == 0) {
                    $(".latlng_location_content").animate({left: "100%"}, 300)
                } else if (code == 1) {
                    $(".latlng_location_content").animate({left: "0%"}, 300)
                }
            },
            queryLocationName(placeName,cb) {
                let self = this;
                let tkStr = this.$store.getters["serveUrl/getTkFn"];
                let param1 = "{'keyWord':'" + placeName + "','level':'15','mapBound':'-180,-90,180,90','queryType':'4','count':'10','start':'0'}";
                let param2 = "&type=query&tk=" + tkStr;
                let param = param1 + param2;
                //地名地址服务
                let locationService = this.$store.getters["serveUrl/getNameLocationFn"];
                let resultUrl = locationService + "?postStr=" + param;
                getMethod(resultUrl).then(function (data) {
                    if (data.status && data.data) {
                        cb(data.data.suggests);
                    }
                }).catch(function (erro) {
                    console.error(erro)
                });
            },
            //点击搜索具体的地名
            setLocationName(placeName) {
                let self = this;
                let tkStr = this.$store.getters["serveUrl/getTkFn"];
                let param1 = "{'keyWord':'" + placeName + "','level':'15','mapBound':'-180,-90,180,90','queryType':'1','count':'10','start':'0'}";
                let param2 = "&type=query&tk=" + tkStr;
                let param = param1 + param2;
                //地名地址服务
                let locationService = this.$store.getters["serveUrl/getNameLocationFn"];
                let resultUrl = locationService + "?postStr=" + param;
                getMethod(resultUrl).then(function (data) {
                    if (data.status && data.data) {
                        self.locationName=placeName;
                        this.pointPositioning(lat,lng);
                    }
                }).catch(function (erro) {
                    console.error(erro)
                });
            },
            //画点定位
            pointPositioning(lat,lng){
                if (!(lng * 1 > 135.04 || lng * 1 < 73.67 || lat * 1 > 53.55 || lat * 1 < 3.87)) {
                    let mapNew = this.$store.getters["mainStore/getMapFn"];
                    mapNew.panTo(new L.LatLng(lat, lng), {
                        animate: true,
                        duration: 0.5
                    })
                    //绘制点图片
                    let oldMarkerArr = this.$store.getters["signStore/getMarkerArrFn"];
                    let eleMarker = {
                        latLng: L.latLng(lat, lng),
                        markerIcon: {
                            iconUrl: require('@/components/mapComponent/tool/theme/img/nameLocation.png'),
                            iconSize: [32, 45],
                            iconAnchor: [17, 50],
                            popupAnchor: [0, -18]
                        },
                        text: 'this is a marker'
                    };
                    oldMarkerArr.tool.location = [];
                    oldMarkerArr.tool.location.push(eleMarker);
                    this.$store.dispatch("signStore/setMarkerArr", oldMarkerArr);

                    mapNew.on("click testLocation", function (e) {
                        console.log(e.latlng.lat + "," + e.latlng.lng)
                    });
                }
            }
        },
    }
</script>
