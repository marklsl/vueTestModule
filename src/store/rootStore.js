import Vue from "vue";
import Vuex from "vuex";
import mainStore from "./mainStore";
import signStore from "./signStore";
import popStore from "./popStore";
import thematic from "./thematic";

Vue.use(Vuex);
export default new Vuex.Store({
  // 通过modules属性引入login 模块。
  modules: {
    mainStore: mainStore,
    signStore: signStore,
    popStore: popStore,
    thematic: thematic
  }
})
