<template>
  <div id="map" ref="rootmap">
  </div>
</template>

<script>
  import "ol/ol.css";
  import { Map, View} from "ol";
  import TileLayer from "ol/layer/Tile";
  import OSM from "ol/source/OSM";

  import {get as getProjection} from 'ol/proj';
  import WMTS from 'ol/source/WMTS';
  import WMTSTileGrid from "ol/tilegrid/WMTS";
  export default {
    data() {
      return {
        map: null
      };
    },
    mounted() {
      // let mapcontainer = this.$refs.rootmap;
      // let layer=new TileLayer({
      //   source: new OSM()
      // })
      // this.map = new Map({
      //   target: "map",
      //   layers: [layer],
      //   view: new View({
      //     projection: "EPSG:4326",    //使用这个坐标系
      //     center: [114.064839,22.548857],  //深圳
      //     zoom: 12
      //   })
      // });


      function init(){
        // 基本属性
        let gridsetName = 'testGridset';
        let gridNames = ['testGridset:0', 'testGridset:1', 'testGridset:2', 'testGridset:3', 'testGridset:4'];
        let baseUrl = 'http://localhost:8080/geoserver/gwc/service/wmts';
        let style = '';
        let format = 'image/png';
        let infoFormat = 'text/html';
        let layerName = 'lslSelf:gaode_1';
        // let projectionSelf = new getProjection({
        //   code: 'EPSG:4326'
        // });
        let resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125];
        let baseParams = ['VERSION','LAYER','STYLE','TILEMATRIX','TILEMATRIXSET','SERVICE','FORMAT'];

        let params = {
          'VERSION': '1.0.0',
          'LAYER': layerName,
          'STYLE': style,
          'TILEMATRIX': gridNames,
          'TILEMATRIXSET': gridsetName,
          'SERVICE': 'WMTS',
          'FORMAT': format
        };
        // 构建layer的source
        function constructSource() {
          let url = baseUrl+'?'
          for (let param in params) {
            if (baseParams.indexOf(param.toUpperCase()) < 0) {
              url = url + param + '=' + params[param] + '&';
            }
          }
          url = url.slice(0, -1);

          let source = new WMTS({
            url: url,
            layer: params['LAYER'],
            matrixSet: params['TILEMATRIXSET'],
            format: params['FORMAT'],
            projection: 'EPSG:4326',
            tileGrid: new WMTSTileGrid({
              tileSize: [256,256],
              extent: [-180.0,-90.0,180.0,90.0],
              origin: [-180.0, 90.0],
              resolutions: resolutions,
              matrixIds: params['TILEMATRIX']
            }),
            style: params['STYLE'],
            wrapX: true
          });
          return source;
        }
        // 构建layer
        let layer = new TileLayer({
          source: constructSource()
        });
        // 构建view
        let view = new View({
          center: [0,0],
          zoom: 2,
          projection: 'EPSG:4326',
          extent: [-180.0,-90.0,180.0,90.0]
        });
        // 构建map
        let map = new Map({
          layers: [layer],
          target: 'map',
          view: view
        });
        map.getView().fit([0.0,0.0,179.99999999999784,85.05112877980643], map.getSize());
      }
      init();
    }
  };
</script>

<style>
  #map{height:100%;}
  /*隐藏ol的一些自带元素*/
  .ol-attribution,.ol-zoom { display: none;}

</style>
