export default{
  namespaced:true,//限定命名空间
  // 1. state
  state: {
    nameLocation:"http://api.tianditu.gov.cn/search"
  },

  // // 2. getters
  getters:{
    getNameLocationFn(nameLocation){
      return state.nameLocation;
    }
  },
  // 3. mutations
  mutations:{
    setNameLocation(state, nameLocation){
      state.nameLocation = nameLocation;
    }
  }
}
