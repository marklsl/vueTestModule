import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let store = new Vuex.Store({
  // 1. state
  state:{
    city:"城市名",
    isCommon:"我刚开始"
  },

  // // 2. getters
  getters:{
    // 参数列表state指的是state数据
    getCityFn(state){
      return state.city;
    },
    getIsCommonFn(state){
      return state.isCommon;
    }
  },
  // 3. mutations
  mutations:{
    // state指的是state的数据
    // name传递过来的数据
    setCity(state, name){
      state.city = name;//将传参设置给state的city
    },
    changeComon(state){
      state.isCommon = "不，你已经结束了";//将传参设置给state的city
    }
  },
  // 4. actions
  // 通常跟api接口打交道
  actions:{
    setCityName({commit,state}, name){
      commit("setCity", name);
    }
  },
});
export default store;
