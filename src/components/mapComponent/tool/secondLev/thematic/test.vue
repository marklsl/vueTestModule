<template>
  <div class="ele_tool">
    <el-button type="success" @click="testaaa">我是按钮</el-button>
  </div>
</template>

<script>
    import {test} from "@/assets/js/api/interface"
    export default {
        name: 'test',
        components: {},
        data() {
            return {}
        },
        methods: {
            //静态截取
            testaaa: function () {
              test();
            }
        }
    }
</script>
