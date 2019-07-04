<template>
  <div class="right_pop_box" :class="dtClass">
    <div class="pop_head">
      <span class="pop_title">我是head</span>
    </div>
    <div class="pop_content">我是content</div>
    <div class="pop_button">我是button</div>
  </div>
</template>

<script>

  export default {
    name: 'rightPop',
    components: {
    },
    data () {
      return {
        dtClass:"mr_height_width"
      }
    },
    methods:{
    }
  }
</script>
<style>
  @import  'pop.css';
</style>
