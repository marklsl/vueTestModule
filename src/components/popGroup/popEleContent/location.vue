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
        @select="setLocationName($event)"
        clearable
      >
        <div class="poisArr_box" v-if="poisArr.length>0">
          <div v-for="elePoi in poisArr">
            <span>地名：{{elePoi.name}}</span>
            <span>联系方式：{{elePoi.phone}}</span>
          </div>
        </div>
        <template slot-scope="{item}">
          <div class="name_box">
            <span class="name">{{ item.name }}</span>
            <span class="addr">{{ item.address }}</span>
            <span class="location hide_class">{{ item.lonlat }}</span>
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
                isLatLngLocation: true,
                poisArr:[]
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
            /**
             * 地名地址搜索
             * @param placeName
             * @param cb
             */
            queryLocationName(placeName,cb) {
                let tkStr = this.$store.getters["serveUrl/getTkFn"];
                let param1 = "{'keyWord':'" + placeName + "','sourceType':'0','level':'18','mapBound':'73.66,3.86,135.05,53.55'," +
                    "'yingjiType':'1','queryType':'4','count':'10','start':'0'}";
                let param2 = "&type=query&tk=" + tkStr;
                let param = param1 + param2;
                //地名地址服务
                let locationService = this.$store.getters["serveUrl/getNameLocationFn"];
                let resultUrl = locationService + "?postStr=" + param;
                getMethod(resultUrl).then(function (data) {
                    if (data.status && data.data.suggests) {
                        cb(data.data.suggests);
                    }
                }).catch(function (erro) {
                    console.error(erro)
                });
            },
            //点击搜索具体的地名
            setLocationName(ele) {
                let _self=this;
                let tkStr = this.$store.getters["serveUrl/getTkFn"];
                let param1 = "{'yingjiType':0,'sourceType':0,'keyWord':'" + ele.name + "'," +
                    "'level':18,'queryType':1,'start':0,'mapBound':'73.66,3.86,135.05,53.55'," +
                    "'count':10,'queryTerminal':10000,'specifyAdminCode':\""+ele.gbCode+"\"}";
                let param2 = "&type=query&tk=" + tkStr;
                let param = param1 + param2;
                //地名地址code查询服务地址
                let locationService = this.$store.getters["serveUrl/getNameLocationFn"];
                let resultUrl = locationService + "?postStr=" + param;
                getMethod(resultUrl).then(function (data) {
                    _self.locationName=ele.name;
                    debugger
                    if(data.data.pois&&data.data.pois.length>0){
                        _self.poisArr.push(...data.data.pois);
                        // _self.poisArr=data.data.pois;
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
