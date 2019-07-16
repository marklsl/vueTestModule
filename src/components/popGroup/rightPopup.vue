<template>
  <div>
    <div class="right_pop_box" :class="dtClass">
      <div class="pop_head">
        <span class="pop_title">{{titleName}}</span>
        <i @click="closePopFun" class="el-icon-right self_close_btn_class"></i>
      </div>
      <div class="pop_content">
        <div v-if="bouncedContent=='latlngLocation'">
          <LATLNGLOCATION ref="mychild"></LATLNGLOCATION>
        </div>
      </div>
      <el-button type="success" class="right_pop_button" @click="btnCallFun">{{buttonName}}</el-button>
    </div>
    <div class="sml_btn_right">
      <el-button @click="unfoldPopFun" type="primary" icon="el-icon-arrow-left self_unfold_btn_class"></el-button>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex';
  import LATLNGLOCATION from '@/components/popGroup/popEleContent/latlngLocation'
  export default {
    name: 'rightPop',
    components: {
      LATLNGLOCATION:LATLNGLOCATION
    },
    data () {
      return {
      }
    },
    methods:{
      btnCallFun:function(){
        this.$refs.mychild.rightPopCallBackFun();
      },
      closePopFun:function(){
        $(".right_pop_box").animate({"width":"0"},function(){
          $(".sml_btn_right").show();
        });
      },
      unfoldPopFun:function(){
        $(".sml_btn_right").hide();
        $(".right_pop_box").animate({"width":"456px"});
      }
    },
    computed: {
      ...mapState("popStore",
        {
          dtClass:state => state.dtClass,
          titleName:state => state.titleName,
          bouncedContent:state => state.textContentCode,
          buttonName:state => state.buttonName,
        }
      )
    },
  }
</script>
<style>
  @import  'pop.css';
</style>
