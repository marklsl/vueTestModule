export default{
  namespaced:true,//限定命名空间
  // 1. state
  state: {
    ifThematic:false
  },

  // // 2. getters
  getters:{
    getIfThematicFn(state){
      return state.ifThematic;
    }
  },
  // 3. mutations
  mutations:{
    setIfThematic(state, ifThematic){
      state.ifThematic = ifThematic;
    }
  },
  // 4. actions
  // 通常跟api接口打交道
  actions:{
    setIfThematicFun({commit,state}, ifThematic){
      commit("setIfThematic", ifThematic);
    }
  }
}
