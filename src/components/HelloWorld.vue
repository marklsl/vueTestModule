<template>
  <div class="hello">
    <div @click="routeJump">
      测试路由功能
    </div>
    <div v-if="isShow">
      <testvue></testvue>
    </div>
    <div>
      <testvuex></testvuex>
    </div>
  </div>
</template>

<script>
  import testvue from "@/components/routeMain/testRoute"
  import testvuex from "@/components/vuex-test/vuex-test"
  export default {
    name: 'HelloWorld',
    components:{
      testvue,
      testvuex,
    },
    data () {
      return {
        isShow: false
      }
    },
    methods:{
      routeJump:function(a,b){
        this.isShow=true;
      }
    }
  }
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
