export default{
  namespaced:true,//限定命名空间
  // 1. state
  state: {
    city: "城市名",
    map: {},
    L: {}
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
    }
  },
  // 3. mutations
  mutations:{
    // state指的是state的数据
    // name传递过来的数据
    setCity(state, name){
      state.city = name;
    },
    setMap(state, mapObj){
      state.map = mapObj;
    },
    setL(state, L){
      state.L = L;
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
    }
  }
}
