<template>
  <div>
    <div @click="choiceCity">假装点击按钮</div>
    <div>{{city}}</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods:{
      choiceCity:function(){
        this.$router.push("/hello/testBegin");
      }
    },
    computed:{
      city:function() {
        // 通过vuex的getters方法来获取state里面的数据
        return this.$store.getters.getCityFn;
      }
    }
  }
</script>
