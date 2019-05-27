<template>
  <div>
    <div @click="choiceCity">假装点击按钮</div>
    <div>{{city}}</div>
    <div>{{isCommon}}</div>
    <div>我是城市名称{{totalStr}}</div>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        city:"我是初始化城市",
        test_city:"我是测试数据",
        isCommon:this.$store.getters.getIsCommonFn
      }
    },
    methods:{
      choiceCity:function(){
        this.$store.dispatch('setCityName','我是action入口进入');
        this.city=this.$store.getters.getCityFn;

        this.$store.commit('changeComon');
        this.isCommon=this.$store.getters.getIsCommonFn;
      }
    },
    computed:{
      totalStr(){
        return this.city+"----"+this.isCommon;
      }
    }
  }
</script>
