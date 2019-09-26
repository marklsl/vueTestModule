<template>
  <div class="boder">
    <!--    遮罩-->
    <div class="boder_loading">
      <div class="loadding_inf">
        <i class="el-icon-loading"></i>
        <div>正在加载。。。</div>
      </div>
    </div>
    <div class="screenshots_header">
      <el-input v-model="needEmpty.screenShotsTitle" placeholder="请输入标题" maxlength="30"></el-input>
    </div>
    <div class="screenshots_left"></div>
    <div class="screenshots_right"></div>
    <div class="screenshots_center_bottom">
      <div class="screenshots_static_info">
        描述:
        <el-input class="screenshots_static_input" placeholder="请输入内容" v-model="needEmpty.screenShotsTextarea"
                  maxlength="70">
        </el-input>
      </div>
      <div class="screenshots_static_time">
        时间：
        <el-date-picker v-model="needEmpty.screenShotsTime" format="yyyy年MM月dd日" type="datetime"
                        placeholder="选择日期时间"></el-date-picker>
      </div>
    </div>
    <div class="screenshots_bottom">
      <div class="screenshots_static_btn">
        <div class="screenshots_task_btn">
          攻略名称：
          <el-select
            class="inline-input"
            v-model="needEmpty.taskValue"
            placeholder="请选择"
          >
            <el-option v-for="item in allTask" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="screenshots_update_btn">
          <el-button plain size="mini" @click="closeScreenshots">取消</el-button>
          <el-button plain size="mini" @click="screenShots">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import html2canvas from 'html2canvas';
    import canvasToImage from 'canvas2image';
    import {getData} from "../../../../../assets/js/api/interface";

    export default {
        name: "screenshotsStatic",
        data() {
            return {
                needEmpty: {
                    screenShotsTitle: "",
                    screenShotsTextarea: "",
                    screenShotsTime: "",
                    taskValue: "",
                    id: ""
                },
                img: null,
                needDis: [],
                allTask: []
            };
        },
        methods: {
            //测试数据
            async getAllData(){
                const resultData = await getData();
                if (resultData.status == 200) {
                }
            },
            hideModel() {

            },
            //编辑页面
            async getSingleScreenshotsFun(id) {
            },
            //存储专题图
            screenShots() {
            },
            //获取整个图片
            getOuterImg() {
                let self = this;
                $(".boder_loading").show();
                try {
                    let test = document.querySelector('#app'); //将jQuery对象转换为dom对象
                    html2canvas(test).then(function (canvas) {
                        // canvas宽度
                        let canvasWidth1 = canvas.width;
                        // canvas高度
                        let canvasHeight1 = canvas.height;
                        canvas.id = 'myCanvasStatic';
                        test.appendChild(canvas);
                        self.img = canvasToImage.convertToImage(canvas, canvasWidth1, canvasHeight1);
                    }).then(function () {
                        self.getNeedImg();
                    });
                } catch (e) {
                    $(".boder_loading").hide();
                    console.error("画布绘制问题");
                }
            },
            //在整个图片上截取需要的图片
            getNeedImg() {
                let canvasWidth = $(".screenshots_header").width();
                let canvasHeight = $(".screenshots_header").height() + $(".screenshots_left").height() + $(".screenshots_center_bottom").height();
                let canvasTop = $(".screenshots_header").position().top;
                let canvasLeft = $(".screenshots_header").position().left;
                let retCanvas = document.createElement('canvas');
                let retCtx = retCanvas.getContext('2d');
                retCanvas.width = canvasWidth;
                retCanvas.height = canvasHeight;
                retCanvas.style.background = "#ffffff";
                retCtx.drawImage(this.img, canvasLeft, canvasTop, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
                let img2 = canvasToImage.convertToImage(retCanvas, canvasWidth, canvasHeight);
                this.confirm(this.convertBase64UrlToBlob(img2.src));
            },
            //将base64图片转为blob格式
            convertBase64UrlToBlob(dataurl) {
                try {
                    let arr = dataurl.split(','),
                        mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]),
                        n = bstr.length,
                        u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    return new Blob([u8arr], {
                        type: 'image/png'
                    });
                } catch (err) {
                    $(".boder_loading").hide();
                    console.log(err.message);
                }
            },
            //图片发送
            confirm(file) {
                let formData = new FormData();
                formData.append("filename", "my-file");  // 文件名
                formData.append("operation", "upload_file")
                formData.append("file", file);

                formData.append("angle1", "0");
                formData.append("angle2", "0");
                formData.append("angle3", "0");
                formData.append("height", "0");
                formData.append("planId", "0");
                formData.append("path", "");
                formData.append("title", this.needEmpty.screenShotsTitle);
                formData.append("urgentReqId", this.needEmpty.taskValue);
                formData.append("remark", this.needEmpty.screenShotsTextarea);
                let time = "";
                if (typeof (this.needEmpty.screenShotsTime) == "object") {
                    let year = this.needEmpty.screenShotsTime.getFullYear();
                    let month = this.needEmpty.screenShotsTime.getMonth() + 1;
                    let date = this.needEmpty.screenShotsTime.getDate();
                    time = year + "-" + month + "-" + date;
                } else {
                    time = this.needEmpty.screenShotsTime.split(" ")[0];
                }
                formData.append("time", time);
                if (this.needEmpty.id) {
                    formData.append("id", this.needEmpty.id);
                    this.sendUpdateFile(formData);
                } else {
                    this.sendAddFile(formData);
                }
            },
            //向后台传输数据
            async sendAddFile(formData) {
                const resultData = await sendAddFile(formData);
                if (resultData.status == 200) {
                    this.closeScreenshots();
                    $(".boder_loading").hide();
                    console.log("成功")
                } else {
                    $(".boder_loading").hide();
                    console.error("网络原因");
                }
            },
            //向后台传输数据
            async sendUpdateFile(formData) {
                const resultData = await sendUpdateFile(formData);
                if (resultData.status == 200) {
                    this.closeScreenshots();
                    $(".boder_loading").hide();
                    console.log("成功")
                } else {
                    $(".boder_loading").hide();
                    console.error("网络原因");
                }
            },
            //关闭功能
            closeScreenshots() {
                let screenshots = this.$store.getters.screenshots;
                screenshots.isShowScreenshots = false;
                this.closeCallBack();
            },
            // 关闭回调
            closeCallBack() {
                let arr = this.needDis;
                if (arr.length > 0) {
                    arr.forEach((item, index) => {
                        let classArr = item.split(" ");
                        let strClass = "";
                        classArr.forEach((item2, index) => {
                            strClass = "." + item2 + strClass;
                        })
                        $(strClass).show();
                    })
                    this.needDis = [];
                }
            }
        },
        computed: {},
        mounted() {
          // this.getAllData();
        }
    };
</script>
<style>
  @import "theme/css/style.css";
</style>
