<template>
  <div></div>
</template>
<script>
    import html2canvas from 'html2canvas';
    import canvasToImage from 'canvas2image';
    import {setFile} from "../../api/satellite";
    export default {
        name: "screenshotsDynamic",
        data() {
            return {
            };
        },
        methods: {
            screenShot(){
                let _this = this;
                this.cutFlag = true;
                let img,canvasWidth,canvasHeight;
                let test = document.querySelector('#app'); //将jQuery对象转换为dom对象
                html2canvas(test).then(function(canvas) {
                    // canvas宽度
                    canvasWidth = canvas.width;
                    // canvas高度
                    canvasHeight = canvas.height;
                    canvas.id = 'myCanvas';
                    test.appendChild(canvas);
                    img = canvasToImage.convertToImage(canvas,canvasWidth, canvasHeight);
                    let wId = "w";
                    let index = 0;
                    let startX = 0,startY = 0;
                    let flag = false;
                    let retcLeft = "0px",retcTop = "0px", retcHeight = "0px",retcWidth = "0px";
                    let canvasLeft = 0,canvasTop = 0,canvasHeight = 0,canvasWidth = 0;
                    document.onmousedown = function(e) {
                        if(!flag && _this.cutFlag){
                            flag = true;
                            try {
                                let evt = window.event || e;
                                let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                                let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
                                startX = evt.clientX + scrollLeft;
                                startY = evt.clientY + scrollTop;
                                index++;
                                let div = document.createElement("div");
                                div.id = wId + index;
                                div.className = "cut_box";
                                div.style.marginLeft = startX + "px";
                                div.style.marginTop = startY + "px";
                                document.body.appendChild(div);
                            } catch (e) {
                                console.error("画布创建问题");
                            }
                        } else{
                            flag = false;
                        }
                    }
                    document.onmouseup = function(e) {
                        if (flag&& _this.cutFlag) {
                            try {
                                let evt = window.event || e;
                                if(startX !== evt.clientX || startY!== evt.clientY){
                                    _this.cutFlag = false;
                                    let arr = document.getElementsByClassName("cut_box");
                                    let retCanvas = document.createElement('canvas');
                                    let retCtx = retCanvas.getContext('2d');
                                    retCanvas.width = canvasWidth;
                                    retCanvas.height = canvasHeight;
                                    retCanvas.style.background="#ffffff";
                                    retCtx.drawImage(img, canvasLeft,canvasTop,canvasWidth,canvasHeight,0,0,canvasWidth,canvasHeight);
                                    let img2 = canvasToImage.convertToImage(retCanvas, canvasWidth, canvasHeight);
                                    _this.confirm(_this.convertBase64UrlToBlob(img2.src));
                                    _this.clearSelected();
                                } else {
                                    _this.cutFlag = false;
                                    _this.clearSelected();
                                }
                            } catch (e){
                                console.error("画布绘制问题");
                            }
                        }else{
                            _this.clearSelected();
                        }
                    }
                    document.onmousemove = function(e) {
                        if (flag&& _this.cutFlag) {
                            try {
                                let evt = window.event || e;
                                let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                                let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
                                retcLeft = (startX - evt.clientX - scrollLeft > 0 ? evt.clientX + scrollLeft : startX) + "px";
                                canvasLeft = startX - evt.clientX - scrollLeft > 0 ? evt.clientX + scrollLeft : startX;
                                retcTop = (startY - evt.clientY - scrollTop > 0 ? evt.clientY + scrollTop : startY) + "px";
                                canvasTop = startY - evt.clientY - scrollTop > 0 ? evt.clientY + scrollTop : startY;
                                retcHeight = Math.abs(startY - evt.clientY - scrollTop) + "px";
                                canvasHeight = Math.abs(startY - evt.clientY - scrollTop);
                                retcWidth = Math.abs(startX - evt.clientX - scrollLeft) + "px";
                                canvasWidth = Math.abs(startX - evt.clientX - scrollLeft);
                                $("#"+[wId + index]).css({"marginLeft":retcLeft,"marginTop":retcTop});
                                if(evt.clientX > window.innerWidth){
                                    $("#"+[wId + index]).css("width",window.innerWidth - retcLeft);
                                } else {
                                    $("#"+[wId + index]).css("width",retcWidth);
                                }
                                if(evt.clientY > window.innerHeight){
                                    $("#"+[wId + index]).css("height",window.innerHeight - retcTop);
                                } else {
                                    $("#"+[wId + index]).css("height",retcHeight);
                                }
                            } catch (e) {
                                console.error("移动时出现问题");
                            }
                        }
                    }
                });
            },
            /**
             * 清除选中框
             */
            clearSelected(){
                let arr = document.getElementsByClassName("cut_box");
                for(let i=0; i<arr.length; i++){
                    if (arr[i] != null){
                        arr[i].parentNode.removeChild(arr[i]);
                    }
                }
                if(document.querySelector('#myCanvas')){
                    let canvas2 = document.querySelector('#myCanvas');
                    canvas2.remove();
                }
            },
            //将base64图片转为blob格式
            convertBase64UrlToBlob(dataurl) {
                try{
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
                } catch(err) {
                    console.log(err.message);
                }
            },
            //图片发送
            confirm(file){
                //blob转换成dataUrl
                let data = window.URL.createObjectURL(file);
                console.log("图片地址：" + data)
                // let formData = new FormData();
                // formData.append("filename", "my-file");  // 文件名
                // formData.append("operation","upload_file")
                // formData.append("file", file);
                // this.sendFile(formData);
            },
            /**
             * 向后台传输数据
             * @param formData
             * @returns {Promise<void>}
             */
            async sendFile(formData) {
                const resultData = await setFile(formData);
                if(resultData.status==200){
                    console.log("成功")
                }else{
                    console.error("网络原因");
                }
            },
        },
        mounted() {

        }
    };
</script>

<style lang="scss">
  #myCanvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    overflow: hidden;
  }
  .screenShots_box{
    background-color: red;
    width: 100%;
    height: 100%;
  }
  .cut_box{
    position: absolute;
    background-color: #fff;
    opacity: 0.5;
    z-index: 1;
    border: 1px dashed #fff;
  }
</style>
