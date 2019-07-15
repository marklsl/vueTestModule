export default{
  namespaced:true,//限定命名空间
  // 1. state
  state: {
    ifPop: false,//是否展示详情框
    titleName:"标题名称",
    textContentCode:"latlngLocation",
    buttonName:"按钮名称",
    dtClass:"mr_height_width"
  },

  // // 2. getters
  getters:{
    getIfPopFn(state){
      return state.ifPop;
    },
    getTitleNameFn(state){
      return state.titleName;
    },
    getTextContentCodeFn(state){
      return state.textContentCode;
    },
    getButtonNameFn(state){
      return state.buttonName;
    },
    getDtClassFn(state){
      return state.dtClass;
    }
  },
  // 3. mutations
  mutations:{
    setIfPop(state, ifPop){
      state.ifPop = ifPop;
    },
    setTitleNamePop(state, titleName){
      state.titleName = titleName;
    },
    setTextContentCodePop(state, textContentCode){
      state.textContentCode = textContentCode;
    },
    setButtonNamePop(state, buttonName){
      state.buttonName = buttonName;
    },
    setDtClassPop(state, dtClass){
      state.dtClass = dtClass;
    }

  },
  // 4. actions
  // 通常跟api接口打交道
  actions:{
    setIfPop({commit,state},ifPop){
      commit("setIfPop", ifPop);
    },
    setTitleNamePop({commit,state},titleName){
      commit("setTitleNamePop", titleName);
    },
    setTextContentCodePop({commit,state},textContentCode){
      commit("setTextContentCodePop", textContentCode);
    },
    setButtonNamePop({commit,state},buttonName){
      commit("setButtonNamePop", buttonName);
    },
    setDtClassPop({commit,state},dtClass){
      commit("setDtClassPop", dtClass);
    }

  }
}