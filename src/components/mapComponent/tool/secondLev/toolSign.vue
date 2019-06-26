<template>
  <div class="ele_tool">
    <div code="point" @click="dynamicMapping($event)">标点</div>
    <div code="line" @click="dynamicMapping($event)">标线</div>
    <div code="area" @click="dynamicMapping($event)">标面</div>
  </div>
</template>

<script>
  export default {
    name: 'toolSign',
    components: {
    },
    data () {
      return {
        linePoints:[],
        lineNum:0,
      }
    },
    methods:{
      //标绘的单击事件
      dynamicMapping:function(ele){
        //绘制点
        // let param={};
        // param.L=this.$store.getters.getLeafletFn;
        // param.map=this.$store.getters.getMapFn;
        // let utilJs=new utilFunction(param);
        // var pointParam={
        //   latlng:[47.413220, -1.219482],
        //   radius:10,
        //   color:'#ff0000',
        //   fillColor:'#000000',
        //   fillColor:'0.8',
        // };
        // utilJs.drawPoint(pointParam);
        let _self=this;
        let mapNew=_self.$store.getters.getMapFn;
        if($(ele.currentTarget).hasClass("onClick")){
          $(ele.currentTarget).removeClass("onClick");
          mapNew.off();
        }else{
          $(ele.currentTarget).addClass("onClick");
          $(".vue2leaflet-map").addClass("move_cursor");
          mapNew.off();
          if($(ele.currentTarget).attr("code")=="point"){//点击的是点
            mapNew.on("click",function(e){
              let oldMarkerArr=_self.$store.getters.getMarkerArrFn;
              let eleMarker={
                latLng:L.latLng(e.latlng.lat, e.latlng.lng),
                markerIcon:{
                  iconUrl: require('@/components/mapComponent/tool/theme/img/location.png'),
                  iconSize: [32, 32],
                  iconAnchor: [16, 30],
                  popupAnchor: [0, -18]
                },
                text: 'this is a marker'
              };
              oldMarkerArr.push(eleMarker);
              _self.$store.dispatch("setMarkerArr",oldMarkerArr);
            });
          }else if($(ele.currentTarget).attr("code")=="line") {//点击的是线
            mapNew.on("click", function (e) {
              if (_self.linePoints.length > 0) {//如果不是新开的一条线
                _self.linePoints.push([e.latlng.lat, e.latlng.lng]);
                let staticLineArr= _self.$store.getters.getStaticLineArrFn;
                let lineEle = staticLineArr[_self.lineNum];//取没有完成绘制的线
                let lineLatLngArr = lineEle.lineGroup;
                lineLatLngArr.push([e.latlng.lat, e.latlng.lng]);
              } else {//如果是线的起点
                let staticLineArr = _self.$store.getters.getStaticLineArrFn;
                let eleLine = {
                  lineGroup: [
                    [47.334852, -1.509485],
                    [47.342596, -1.328731],
                    [47.241487, -1.190568],
                    [47.234787, -1.358337]
                  ],
                  lineColor: "green",
                  text: 'this is a line'
                }
                staticLineArr.push(eleLine);
              }
            });
            mapNew.on("mousemove", function (e) {
              if (_self.linePoints.length > 0) {
                let moveLine = {
                  lineGroup: [self.linePoints[self.linePoints.length - 1], [e.latlng.lat, e.latlng.lng]],
                  lineColor: "green",
                  text: 'this is a line'
                }
                this.$store.dispatch("setMoveLineArr", moveLine);
              }
            })
            mapNew.on("dblclick", function (e) {
              let staticLineArr = _self.$store.getters.getStaticLineArrFn;
              _self.lineNum=staticLineArr.length;
              _self.linePoints = [];
              map.off('mousemove')
            })
            // else if($(ele.currentTarget).code=="area"){
            //
            // }
          }
        }
      }
    }
  }
</script>
