export default{
  namespaced:true,//限定命名空间
  // 1. state
  state: {
    markerArr: {
      tool:{
        sign:[],
        location:[],
      }
    },//静态点数组
    staticLineArr: {
      tool:{
        sign:[]
      }
    },//静态线数组
    staticAreaArr: {
      tool:{
        sign:[]
      }
    }//静态面数组
  },

  // // 2. getters
  getters:{
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
    setMarkerArr(state, markerArr){
      state.markerArr = markerArr;
    },
    setStaticLineArr(state, staticLineArr){
      state.staticLineArr = staticLineArr;
    },
    setStaticAreaArr(state, staticArea){
      state.staticAreaArr = staticArea;
    }
  },
  // 4. actions
  // 通常跟api接口打交道
  actions:{
    setMarkerArr({commit,state}, markerArr){
      commit("setMarkerArr", markerArr);
    },
    setStaticLineArr({commit,state},staticLineArr){
      commit("setStaticLineArr", staticLineArr);
    },
    setStaticAreaArr({commit,state},staticArea){
      commit("setStaticAreaArr", staticArea);
    }
  }
}
