export default{
  namespaced:true,//限定命名空间
  // 1. state
  state: {
    nameLocation:"http://api.tianditu.gov.cn/search",
    administrative:"http://api.tianditu.gov.cn/administrative",
    tk:"5a1fcd29503ab12ed52b66eea8d53d05"
  },

  // // 2. getters
  getters:{
    getNameLocationFn(state){
      return state.nameLocation;
    },
    getAdministrativeFn(state){
      return state.administrative;
    },
    getTkFn(state){
      return state.tk;
    }
  },
  // 3. mutations
  mutations:{
    setNameLocation(state, nameLocation){
      state.nameLocation = nameLocation;
    }
  }
}
