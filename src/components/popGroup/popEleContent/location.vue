<template>
  <div class="location_content_box">
    <div class="latlng_location_content">
      <div class="latlng_location_ele_box">
        <span class="latlng_location_text">经度:</span>
        <el-input code="inputLngCode" placeholder="73.67~135.04" @blur="loseBlueFun($event)"
                  v-model="inputLng" class="latlng_location_input"
                  oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
        <div class="latlng_location_ele_error">*请输入国界范围内经度</div>
      </div>

      <div class="latlng_location_ele_box">
        <span class="latlng_location_text">纬度:</span>
        <el-input code="inputLatCode" placeholder="3.87~53.55" @blur="loseBlueFun($event)" v-model="inputLat"
                  class="latlng_location_input" oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
        <div class="latlng_location_ele_error">*请输入国界范围内纬度</div>
      </div>
      <el-button class="right_pop_button tool_btn_public" @click="changeLocationMethod(0)">地名地址定位</el-button>
      <el-button class="right_pop_button tool_btn_public" @click="rightPopCallBackFun">定位</el-button>
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
        <template slot-scope="{item}">
          <div class="name_box">
            <span class="name">{{ item.name }}</span>
            <span class="addr">{{ item.address }}</span>
            <span class="location hide_class">{{ item.lonlat }}</span>
          </div>
        </template>
      </el-autocomplete>
      <el-button class="right_pop_button tool_btn_public" @click="changeLocationMethod(1)">经纬度定位</el-button>
    </div>
    <div class="poisArr_box" v-if="poisArr.length>0&&showPlaceNameList">
      <div class="list_ele_div" @click="locationPlaceName(elePoi.lonlat)" :class="index%2==0?'odd':'even'"
           v-for="(elePoi,index) in poisArr">
        <span class="location_name">地名：{{elePoi.name}}</span>
        <span class="phone">联系方式：{{elePoi.phone}}</span>
      </div>
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
        poisArr: [],
        showPlaceNameList: true,
        ptMarkerIcon: {
          iconUrl: require('@/components/mapComponent/tool/theme/img/location_sml.png'),
          shadowUrl: require('@/components/mapComponent/tool/theme/img/location_shadow.png'),
          iconSize: [23, 32],
          iconAnchor: [11, 32],
          popupAnchor: [0, -18],
          shadowSize: [20, 10],
          shadowAnchor: [3, 12],
        },
        bigMarkerIcon: {
          iconUrl: require('@/components/mapComponent/tool/theme/img/location_big.png'),
          shadowUrl: require('@/components/mapComponent/tool/theme/img/location_shadow.png'),
          iconSize: [32, 45],
          iconAnchor: [15, 43],
          popupAnchor: [0, -18],
          shadowSize: [30, 15],
          shadowAnchor: [3, 12],
        }
      }
    },
    methods: {
      //输入框失去焦点事件
      loseBlueFun: function (ele) {
        if ($(ele.currentTarget).attr("code") == "inputLngCode") {
          if (this.inputLng * 1 > 135.04 || this.inputLng * 1 < 73.67) {
            $(ele.currentTarget).parent().next().css("display", "table");
          } else {
            $(ele.currentTarget).parent().next().hide();
          }
        } else {
          if (this.inputLat * 1 > 53.55 || this.inputLat * 1 < 3.87) {
            $(ele.currentTarget).parent().next().css("display", "table");
          } else {
            $(ele.currentTarget).parent().next().hide();
          }
        }
      },
      //按钮点击事件
      rightPopCallBackFun: function () {
        let lng = this.inputLng;
        let lat = this.inputLat;
        this.placeNamePositioning(lat, lng, false, false);
      },
      /**
       * 切换定位方式
       */
      changeLocationMethod(code) {
        this.clearLocation();
        if (code == 0) {
          $(".latlng_location_content").animate({left: "100%"}, 300);
          this.showPlaceNameList = true;
        } else if (code == 1) {
          $(".latlng_location_content").animate({left: "0%"}, 300);
          this.showPlaceNameList = false;
        }
      },
      /**
       * 地名地址搜索
       * @param placeName
       * @param cb
       */
      queryLocationName(placeName, cb) {
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
        let _self = this;
        let tkStr = this.$store.getters["serveUrl/getTkFn"];
        let param1 = "{'yingjiType':0,'sourceType':0,'keyWord':'" + ele.name + "'," +
          "'level':18,'queryType':1,'start':0,'mapBound':'73.66,3.86,135.05,53.55'," +
          "'count':10,'queryTerminal':10000,'specifyAdminCode':\"" + ele.gbCode + "\"}";
        let param2 = "&type=query&tk=" + tkStr;
        let param = param1 + param2;
        //地名地址code查询服务地址
        let locationService = this.$store.getters["serveUrl/getNameLocationFn"];
        let resultUrl = locationService + "?postStr=" + param;
        getMethod(resultUrl).then(function (data) {
          _self.locationName = ele.name;
          _self.poisArr = [];
          if (data.data.pois && data.data.pois.length > 0) {
            _self.poisArr.push(...data.data.pois);
          }
          _self.locationPtPoint(_self.poisArr);
        }).catch(function (erro) {
          console.error(erro)
        });
      },
      //点击单个地名地址定位
      locationPlaceName(lngLat) {
        this.placeNamePositioning(lngLat.split(" ")[1], lngLat.split(" ")[0], true, true);
      },
      //多个地名地址定位
      locationPtPoint(arr) {
        if (arr && arr.length > 0) {
          arr.forEach((item) => {
            this.placeNamePositioning(item.lonlat.split(" ")[1], item.lonlat.split(" ")[0], true, false);
          })
        }
      },
      /**
       * 绘制点
       * @param lat
       * @param lng
       * @param isSaveOldPoint：是否保留之前绘制的点
       * @param isBigPoint:是否是大图标
       */
      placeNamePositioning(lat, lng, isSaveOldPoint, isBigPoint) {
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
            markerIcon: isBigPoint ? this.bigMarkerIcon : this.ptMarkerIcon,
            text: 'this is a marker',
            options: {
              isBigPoint: isBigPoint
            }
          };
          if (!isSaveOldPoint) {
            oldMarkerArr.tool.location = []
          }
          ;
          let newLocationMarker = [];
          //删除大图标
          if (oldMarkerArr.tool.location && oldMarkerArr.tool.location.length > 0) {
            oldMarkerArr.tool.location.forEach((item) => {
              if (!item.options.isBigPoint) {
                newLocationMarker.push(item);
              }
            })
          }
          newLocationMarker.push(eleMarker);
          oldMarkerArr.tool.location = newLocationMarker;
          this.$store.dispatch("signStore/setMarkerArr", oldMarkerArr);

          L.circle([lat,lng],{color:'#FF0000',fillColor:'#FF0000',radius:100,fillOpacity:1}).addTo(mapNew)
        }
      },
      clearLocation(){
        //清空绘制
        let oldMarkerArr = this.$store.getters["signStore/getMarkerArrFn"];
        oldMarkerArr.tool.location = [];
        this.$store.dispatch("signStore/setMarkerArr", oldMarkerArr);
        //清空经纬度和地名地址
        this.inputLng="";
        this.inputLat="";
        this.locationName="";
        this.poisArr=[];
      }
    },
  }
</script>
