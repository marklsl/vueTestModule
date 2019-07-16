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
        //如果点击的跟之前是同一个
        if($(ele.currentTarget).parents().find("div[class=onClick]")){
          if($(ele.currentTarget).attr("code")!=$(ele.currentTarget).parents().find("div[class=onClick]").attr("code")){
            $(ele.currentTarget).parents().find("div").removeClass("onClick");
            $(ele.currentTarget).addClass("onClick");
            if ($(ele.currentTarget).attr("code") == "latLngLocation") {//点击的是经纬度定位
              this.$store.dispatch("popStore/setIfPop",true);
              this.$store.dispatch("popStore/setTitleNamePop","经纬度定位");
              this.$store.dispatch("popStore/setTextContentCodePop","latlngLocation");
              this.$store.dispatch("popStore/setButtonNamePop","定位");
              this.$store.dispatch("popStore/setDtClassPop","mr_height_width");
            } else if ($(ele.currentTarget).attr("code") == "nameLocation") {//点击的是地名地址定位
              this.$store.dispatch("popStore/setIfPop",true);
            }
          }else{
            $(ele.currentTarget).parents().find("div").removeClass("onClick");
            this.$store.dispatch("popStore/setIfPop",false);
          }
        }


      }
    }
  }
</script>
