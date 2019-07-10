<template>
  <div class="ele_tool">
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <div code="latLngLocation" @click="locationFun($event)">经纬度定位</div>
      </el-dropdown-item>
      <el-dropdown-item>
        <div code="nameLocation" @click="locationFun($event)">地名定位</div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </div>
</template>

<script>

  export default {
    name: 'toolLocation',
    components: {
    },
    data () {
      return {
        hasPop:false
      }
    },
    methods:{
      locationFun:function(ele){
        $(ele.currentTarget).parent().find("div").removeClass("onClick");
        $(ele.currentTarget).addClass("onClick");
        if ($(ele.currentTarget).attr("code") == "latLngLocation") {//点击的是经纬度定位
          this.$store.dispatch("setIfPop",true);
        } else if ($(ele.currentTarget).attr("code") == "nameLocation") {//点击的是地名地址定位
          this.$store.dispatch("setIfPop",true);
        }
      }
    }
  }
</script>
