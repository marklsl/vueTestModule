<template>
  <div class="right_pop_box" :class="dtClass">
    <div class="pop_head">
      <span class="pop_title">{{titleName}}</span>
    </div>
    <div class="pop_content">
      <div v-if="bouncedContent=='latlngLocation'">
        <LATLNGLOCATION></LATLNGLOCATION>
      </div>
    </div>
    <el-button type="success" class="right_pop_button">{{buttonName}}</el-button>
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
