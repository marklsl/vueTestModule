<template>
  <div class="ele_tool">
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <div code="point" @click="dynamicMapping($event)">标点</div>
      </el-dropdown-item>
      <el-dropdown-item>
        <div code="line" @click="dynamicMapping($event)">标线</div>
      </el-dropdown-item>
      <el-dropdown-item>
        <div code="area" @click="dynamicMapping($event)">标面</div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </div>
</template>

<script>
    export default {
        name: 'toolSign',
        components: {},
        data() {
            return {
                linePoints: [],
                areaPoints: [],
                lineNum: 0,
                isFirstLinePoint: true,
                oldMarkerArr: [],
                staticLineSignArr: [],
                areaNum: 0,
                isFirstAreaPoint: true,
                staticAreaSignArr: []
            }
        },
        methods: {
            //标绘的单击事件
            dynamicMapping: function (ele) {
                let _self = this;
                _self.removeEvent();
                let mapNew = _self.$store.getters["mainStore/getMapFn"];
                //如果点击的跟之前是同一个
                if ($(ele.currentTarget).parents().find("div[class=onClick]")) {
                    if ($(ele.currentTarget).attr("code") != $(ele.currentTarget).parents().find("div[class=onClick]").attr("code")) {
                        $(ele.currentTarget).parents().find("div").removeClass("onClick");
                        $(ele.currentTarget).addClass("onClick");
                        let clickIni = _self.mapIni(mapNew);
                        if ($(ele.currentTarget).attr("code") == "point") {//点击的是点
                            clickIni.markerMapClick();
                        } else if ($(ele.currentTarget).attr("code") == "line") {//线标绘
                            clickIni.lineMapClick();
                        } else if ($(ele.currentTarget).attr("code") == "area") {//面标绘
                            clickIni.areaMapClick();
                        }
                    } else {
                        $(ele.currentTarget).parents().find("div").removeClass("onClick");
                    }
                }
            },
            //地图监听
            mapIni: function (mapNew) {
                let util = {};
                let _self = this;
                //绘制图片时候的监听
                util.markerMapClick = function () {
                    mapNew.on("click markerAdd", function (e) {
                        _self.oldMarkerArr = _self.$store.getters["signStore/getMarkerArrFn"].tool.sign;
                        let eleMarker = {
                            latLng: L.latLng(e.latlng.lat, e.latlng.lng),
                            markerIcon: {
                                iconUrl: require('@/components/mapComponent/tool/theme/img/location.png'),
                                iconSize: [32, 32],
                                iconAnchor: [16, 30],
                                popupAnchor: [0, -18]
                            },
                            text: 'this is a marker'
                        };
                        _self.oldMarkerArr.push(eleMarker);
                    });
                };
                //绘制线的时候的监听
                util.lineMapClick = function () {
                    mapNew.on("click lineAdd", function (e) {
                        _self.linePoints.push([e.latlng.lat, e.latlng.lng]);
                        _self.staticLineSignArr = _self.$store.getters["signStore/getStaticLineArrFn"].tool.sign;
                        if (_self.linePoints.length > 1) {//如果不是新开的一条线
                            let lineEle = _self.staticLineSignArr[_self.lineNum];//取没有完成绘制的线
                            let lineLatLngArr = lineEle.lineGroup;
                            lineLatLngArr.push([e.latlng.lat, e.latlng.lng]);
                        } else {//如果是线的起点
                            let eleLine = {
                                lineGroup: [[e.latlng.lat, e.latlng.lng]],
                                lineColor: "green",
                                text: 'this is a line'
                            }
                            _self.staticLineSignArr.push(eleLine);
                        }
                        _self.isFirstLinePoint = true;
                        mapNew.on("mousemove lineAdd", _self.mouseMoveLine);
                    });
                    mapNew.on("dblclick lineAdd", function (e) {
                        _self.stopDrawLine(mapNew);
                    })
                };
                //绘制面的地图的监听
                util.areaMapClick = function () {
                    mapNew.on("click areaAdd", function (e) {
                        _self.areaPoints.push([e.latlng.lat, e.latlng.lng]);
                        _self.staticAreaSignArr = _self.$store.getters["signStore/getStaticAreaArrFn"].tool.sign;
                        if (_self.areaPoints.length > 1) {//如果不是新开的一个面
                            let areaEle = _self.staticAreaSignArr[_self.areaNum];//取没有完成绘制的面
                            let areaLatLngArr = areaEle.polygonGroup;
                            areaLatLngArr.push([e.latlng.lat, e.latlng.lng]);
                        } else {//如果是面的起点
                            let eleArea = {
                                polygonGroup: [[e.latlng.lat, e.latlng.lng]],
                                polygonColor: "green",
                                text: 'this is a line'
                            }
                            _self.staticAreaSignArr.push(eleArea);
                        }
                        _self.isFirstAreaPoint = true;
                        mapNew.on("mousemove areaAdd", _self.mouseMoveArea);
                    });
                    mapNew.on("dblclick areaAdd", function (e) {
                        _self.stopDrawArea(mapNew);
                    })
                }
                return util;
            },
            //绘制多线移动鼠标时监听
            mouseMoveLine: function (e) {
                if (this.linePoints.length > 0) {
                    let lineEle = this.staticLineSignArr[this.lineNum];//取没有完成绘制的线
                    let lineLatLngArr = lineEle.lineGroup;
                    if (this.isFirstLinePoint) {
                        lineLatLngArr.push([e.latlng.lat, e.latlng.lng]);
                        this.isFirstLinePoint = false;
                    } else {
                        lineLatLngArr.pop();
                        lineLatLngArr.push([e.latlng.lat, e.latlng.lng]);
                    }
                }
            },
            //线结束绘制
            stopDrawLine: function (map) {
                this.staticLineSignArr = this.$store.getters["signStore/getStaticLineArrFn"].tool.sign;
                this.lineNum = this.staticLineSignArr.length;
                this.linePoints = [];
                this.isFirstLinePoint = true;
                map.off("mousemove lineAdd");
            },
            //绘制面时鼠标移动监听
            mouseMoveArea: function (e) {
                if (this.areaPoints.length > 0) {
                    let areaEle = this.staticAreaSignArr[this.areaNum];//取没有完成绘制的线
                    let areaLatLngArr = areaEle.polygonGroup;
                    if (this.isFirstAreaPoint) {
                        areaLatLngArr.push([e.latlng.lat, e.latlng.lng]);
                        this.isFirstAreaPoint = false;
                    } else {
                        areaLatLngArr.pop();
                        areaLatLngArr.push([e.latlng.lat, e.latlng.lng]);
                    }
                }
            },
            //面结束绘制
            stopDrawArea: function (map) {
                this.staticAreaSignArr = this.$store.getters["signStore/getStaticAreaArrFn"].tool.sign;
                this.areaNum = this.staticAreaSignArr.length;
                this.areaPoints = [];
                this.isFirstAreaPoint = true;
                map.off("mousemove areaAdd");
            },
            //移除本模块的地图监听
            removeEvent: function () {
                let map = this.$store.getters["mainStore/getMapFn"];
                map.off("click markerAdd");
                map.off("click lineAdd");
                map.off("mousemove lineAdd");
                map.off("dblclick lineAdd");
                map.off("click areaAdd");
                map.off("mousemove areaAdd");
                map.off("dblclick areaAdd");
                this.stopDrawArea(map);
                this.stopDrawLine(map);
            },
            //关闭功能，清除所有绘制
            clearModel: function () {
                this.removeEvent();
                let markerArr=this.$store.getters["signStore/getMarkerArrFn"];
                markerArr.tool.sign=[];
                this.$store.dispatch("signStore/setMarkerArr",markerArr);

                let lineArr=this.$store.getters["signStore/getStaticLineArrFn"];
                lineArr.tool.sign=[];
                this.$store.dispatch("signStore/setStaticLineArr",lineArr);

                let areaArr=this.$store.getters["signStore/getStaticAreaArrFn"];
                areaArr.tool.sign=[];
                this.$store.dispatch("signStore/setStaticAreaArr",areaArr);
            }
        }
    }
</script>
