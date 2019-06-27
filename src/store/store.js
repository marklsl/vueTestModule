import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let store = new Vuex.Store({
  // 1. state
  state:{
    city:"城市名",
    map:{},
    L:{},
    markerArr:[],
    staticLineArr:[],
    staticAreaArr:[]
  },

  // // 2. getters
  getters:{
    // 参数列表state指的是state数据
    getCityFn(state){
      return state.city;
    },
    getMapFn(state){
      return state.map;
    },
    getLeafletFn(state){
      return state.L;
    },
    getMarkerArrFn(state){
      return state.markerArr;
    },
    getStaticLineArrFn(state){
      return state.staticLineArr;
    },
    getStaticAreaArrFn(state){
      return state.staticAreaArr;
    }
  },
  // 3. mutations
  mutations:{
    // state指的是state的数据
    // name传递过来的数据
    setCity(state, name){
      state.city = name;//将传参设置给state的city
    },
    setMap(state, mapObj){
      state.map = mapObj;//将传参设置给state的city
    },
    setL(state, L){
      state.L = L;//将传参设置给state的city
    },
    setMarkerArr(state, markerArr){
      state.markerArr = markerArr;//将传参设置给state的city
    },
    setStaticLineArr(state, staticLineArr){
      state.staticLineArr = staticLineArr;//将传参设置给state的city
    },
    setStaticAreaArr(state, staticArea){
      state.staticAreaArr = staticArea;//将传参设置给state的city
    }
  },
  // 4. actions
  // 通常跟api接口打交道
  actions:{
    setCityName({commit,state}, name){
      commit("setCity", name);
    },
    setMapName({commit,state}, mapObj){
      commit("setMap", mapObj);
    },
    setMarkerArr({commit,state}, markerArr){
      commit("setMarkerArr", markerArr);
    },
    setStaticLineArr({commit,state},staticLineArr){
      commit("setStaticLineArr", staticLineArr);
    },
    setStaticAreaArr({commit,state},staticArea){
      commit("setStaticAreaArr", staticArea);
    }
  },
});
export default store;
