<template>
  <div>
    <div @click="handleOpen">
      <slot name="openImgCutter"></slot>
      <slot name="open"></slot>
    </div>
    <button
      v-if="!$slots.openImgCutter && !$slots.open"
      class="btn btn-primary"
      @click="handleOpen"
    >{{label}}</button>
    <transition name="fade">
      <div v-if="visible" class="mask vue-img-cutter" ref="mask">
        <div class="dialogBox" v-if="visible" :style="'height:'+ parseInt(boxHeight+150)+'px'">
          <transition
            name="fade"
            enter-class="fade-in-enter"
            enter-active-class="fade-in-active"
            leave-class="fade-out-enter"
            leave-active-class="fade-out-active"
          >
            <div class="dialogMain" :width="boxWidth+40+'px'">
              <div class="toolMain">
                <div class="tool-title">
                  图片裁剪
                  <span class="closeIcon" @click="handleClose">×</span>
                </div>
                <div
                  ref="toolBox"
                  :style="'height:'+boxHeight+'px;width:'+boxWidth+'px'"
                  v-on:mousemove="controlBtnMouseMove"
                  v-on:mouseup="controlBtnMouseUp"
                  v-on:mouseleave="controlBtnMouseUp"
                  class="toolBox"
                >
                  <!--选取图片-->
                  <div class="tips" v-show="!drawImg.img">
                    <div class="btn btn-warning btn-xs" @click="chooseImg">选择图片</div>
                  </div>
                  <!--工具栏-->
                  <div v-if="tool==true" class="dockMain" @mouseenter="dropImgOff">
                    <div class="dockBtn" v-if="rate">比例：{{rate}}</div>
                    <div
                      class="dockBtn"
                      @click="scaleReset"
                    >缩放：{{drawImg.swidth > 0 ? (drawImg.width / drawImg.swidth).toFixed(2) : '-'}}</div>
                    <div @click="turnImg(-90)" class="dockBtn">左转90°</div>
                    <div @click="turnImg(90)" class="dockBtn">右转90°</div>
                    <div @click="turnReset()" class="dockBtn">复位</div>
                    <div class="dockBtnScrollBar">
                      <div
                        ref="dockBtnScrollControl"
                        @mousemove="scrollBarControlMove"
                        @mousedown="scrollBarControlOn"
                        @mouseleave="scrollBarControlOff"
                        @mouseup="scrollBarControlOff"
                        :style="'left:'+ rotateControl.position + 'px'"
                        class="scrollBarControl"
                      ></div>
                      <div
                        v-if="rotateControl.active == true"
                        class="scrollBarText"
                        :style="'left:'+ rotateControl.position + 'px'"
                      >{{rotateImg.angle.toFixed(0) + '°'}}</div>
                    </div>
                  </div>
                  <!--裁剪区域-->
                  <div
                    v-show="drawImg.img!=null"
                    v-on:mousedown="toolBoxMouseDown"
                    v-on:mouseup="toolBoxMouseUp"
                    v-on:mousemove="toolBoxMouseMove"
                    v-on:mouseleave="toolBoxMouseLeave"
                    ref="toolBoxControl"
                    class="toolBoxControl"
                  >
                    <div class="controlBox">
                      <div class="selectArea">
                        宽:{{toolBox.width}} 高:{{toolBox.height}}
                        (x:{{toolBox.boxMove.moveTo.x}},y:{{toolBox.boxMove.moveTo.y}})
                      </div>
                      <div
                        data-name="leftUp"
                        v-on:mousedown="controlBtnMouseDown"
                        class="leftUp controlBtn"
                      ></div>
                      <div
                        data-name="leftDown"
                        v-on:mousedown="controlBtnMouseDown"
                        class="leftDown controlBtn"
                      ></div>
                      <div
                        data-name="rightUp"
                        v-on:mousedown="controlBtnMouseDown"
                        class="rightUp controlBtn"
                      ></div>
                      <div
                        data-name="rightDown"
                        v-on:mousedown="controlBtnMouseDown"
                        class="rightDown controlBtn"
                      ></div>

                      <div
                        data-name="topCenter"
                        v-on:mousedown="controlBtnMouseDown"
                        class="topCenter controlBtn"
                      ></div>
                      <div
                        data-name="downCenter"
                        v-on:mousedown="controlBtnMouseDown"
                        class="downCenter controlBtn"
                      ></div>
                      <div
                        data-name="leftCenter"
                        v-on:mousedown="controlBtnMouseDown"
                        class="leftCenter controlBtn"
                      ></div>
                      <div
                        data-name="rightCenter"
                        v-on:mousedown="controlBtnMouseDown"
                        class="rightCenter controlBtn"
                      ></div>

                      <div class="toolBoxControlLine toolBoxControlLineItem-1"></div>
                      <div class="toolBoxControlLine toolBoxControlLineItem-2"></div>
                      <div class="toolBoxControlLine toolBoxControlLineItem-3"></div>
                      <div class="toolBoxControlLine toolBoxControlLineItem-4"></div>
                    </div>
                  </div>
                  <!--画布-->
                  <canvas
                    class="canvasSelectBox"
                    ref="canvasSelectBox"
                    :width="boxWidth"
                    @mousedown="dropImgOn"
                    @mouseup="dropImgOff"
                    @mousemove="dropImgMove"
                    :height="boxHeight"
                  ></canvas>
                  <canvas class="canvas" ref="canvas" :width="boxWidth" :height="boxHeight"></canvas>
                </div>
              </div>
              <span class="i-dialog-footer">
                <input
                  v-show="false"
                  @change="putImgToCanv"
                  ref="inputFile"
                  type="file"
                  accept="image/*"
                />
                <div class="btn btn-primary btn-primary-plain" @click="chooseImg">选择图片</div>
                <div class="btn-group fr">
                  <div class="btn btn-default" @click="handleClose">取消</div>
                  <div
                    class="btn btn-primary"
                    :disabled="!drawImg.img"
                    type="primary"
                    @click="cropPicture"
                  >确定</div>
                </div>
              </span>
              <div class="copyright">
                <a
                  v-if="!DoNotDisplayCopyright"
                  target="_blank"
                  href="https://github.com/acccccccb/vue-img-cutter"
                  rel="nofollow"
                >vue-img-cutter</a>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "ImgCutter",
  props: {
    inerBox: {
      type: Object,
      default: () => ({ w: 0, h: 0 })
    },
    label: {
      type: String,
      default: "选择图片",
      required: false
    },
    boxWidth: {
      type: Number,
      default: 800,
      required: false
    },
    boxHeight: {
      type: Number,
      default: 400,
      required: false
    },
    rate: {
      type: Number,
      default: null,
      required: false
    },
    tool: {
      type: Boolean,
      default: true,
      required: false
    },
    DoNotDisplayCopyright: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  model: [
    "label",
    "boxWidth",
    "boxHeight",
    "rate",
    "tool",
    "DoNotDisplayCopyright"
  ],
  data() {
    let toolBoxWidth, toolBoxHeight;
    toolBoxWidth = this.boxWidth / 2;
    toolBoxHeight = this.boxHeight / 2;

    //使用用户自定义矩形框大小 :inerBox="{w:686,h:343}" 686*343
    if (this.inerBox.w !== 0) {
      toolBoxWidth = this.inerBox.w;
      toolBoxHeight = this.inerBox.h;
    }
    return {
      visible: false,
      drawImg: {
        img: null, //规定要使用的图像、画布或视频
        sx: 0, //开始剪切的 x 坐标位置
        sy: 0, //开始剪切的 y 坐标位置
        swidth: 0, //被剪切图像的宽度
        sheight: 0, //被剪切图像的高度
        x: 0, //在画布上放置图像的 x 坐标位置
        y: 0, //在画布上放置图像的 y 坐标位置
        width: 0, //要使用的图像的宽度
        height: 0 //要使用的图像的高度
      },
      toolBox: {
        disable: true,
        width: toolBoxWidth,
        height: toolBoxHeight,
        x: 0,
        y: 0,
        boxMove: {
          start: {
            x: 0,
            y: 0
          },
          moveTo: {
            x: 0,
            y: 0
          }
        }
      },
      dropImg: {
        active: false,
        pageX: 0,
        pageY: 0,
        params: {}
      },
      // 旋转
      rotateImg: {
        angle: 0
      },
      rotateControl: {
        active: false,
        start: {
          x: 0,
          y: 0
        },
        position: 100
      },
      // 缩放
      scaleImg: {
        rate: 0,
        params: {}
      },
      controlBox: {
        disable: true,
        btnName: "",
        start: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }
      },
      selectBox: false,
      selectBoxColor: "rgba(0,0,0,0.6)"
    };
  },
  methods: {
    handleOpen: function() {
      this.visible = true;
      this.$nextTick(() => {
        let mousewheelevt = /Firefox/i.test(navigator.userAgent)
          ? "DOMMouseScroll"
          : "mousewheel";
        if (mousewheelevt == "mousewheel") {
          this.$refs["toolBox"].onmousewheel = this.scaleImgWheel;
        } else {
          this.$refs["toolBox"].addEventListener(
            "DOMMouseScroll",
            this.scaleImgWheel
          );
        }
      });
    },
    handleClose: function() {
      this.clearAll();
      this.$nextTick(() => {
        this.visible = false;
      });
    },
    // 选择图片 e.stopPropagation();
    chooseImg: function() {
      this.$refs["inputFile"].click();
    },
    // 将选择的图片绘制到画布
    putImgToCanv: function(e) {
      let _this = this;
      let file = e.target.files[0] || null;
      if (file) {
        let reader = new FileReader();
        new Image();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          // 图片base64化
          let newUrl = e.target.result;
          let img = document.createElement("img");
          img.src = newUrl;
          let timmer = setInterval(function() {
            if (reader.readyState == 2) {
              clearInterval(timmer);
              let imgHeight = img.height;
              let imgWidth = img.width;
              let boxWidth = _this.boxWidth;
              let boxHeight = _this.boxHeight;
              let rate;
              let drawImg = { ..._this.drawImg };
              drawImg.img = img;
              _this.scaleImg.rate = imgWidth / imgHeight; // 缩放时用到此参数
              if (imgHeight < boxHeight && imgWidth < boxWidth) {
                rate = 1;
                drawImg.x = (boxWidth - imgWidth) / 2;
                drawImg.y = (boxHeight - imgHeight) / 2;
              } else {
                if (imgWidth / imgHeight <= boxWidth / boxHeight) {
                  // 计算宽高比
                  rate = boxHeight / imgHeight;
                  drawImg.x = (boxWidth - imgWidth * rate) / 2;
                } else {
                  rate = boxWidth / imgWidth;
                  drawImg.y = (boxHeight - imgHeight * rate) / 2;
                }
              }
              drawImg.swidth = imgWidth;
              drawImg.sheight = imgHeight;
              drawImg.width = imgWidth * rate;
              drawImg.height = imgHeight * rate;
              drawImg.x = (boxWidth - drawImg.width) / 2;
              drawImg.y = (boxHeight - drawImg.height) / 2;
              _this.$set(_this, "drawImg", drawImg);
              _this.printImg();
            }
          }, 200);
        };
        this.drawControlBox(
          this.toolBox.width,
          this.toolBox.height,
          this.toolBox.x,
          this.toolBox.y
        );
      }
    },
    // clear both
    clearAll: function() {
      let _this = this;
      let c = _this.$refs["canvas"];
      let ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);
      let c1 = _this.$refs["canvasSelectBox"];
      let ctx1 = c1.getContext("2d");
      ctx1.clearRect(0, 0, c1.width, c1.height);
      this.drawImg = {
        img: null, //规定要使用的图像、画布或视频
        sx: 0, //开始剪切的 x 坐标位置
        sy: 0, //开始剪切的 y 坐标位置
        swidth: 0, //被剪切图像的宽度
        sheight: 0, //被剪切图像的高度
        x: 0, //在画布上放置图像的 x 坐标位置
        y: 0, //在画布上放置图像的 y 坐标位置
        width: 0, //要使用的图像的宽度
        height: 0 //要使用的图像的高度
      };
      this.$refs["inputFile"].value = "";
      this.rotateImg.angle = 0;
      this.drawImg.img = null;
      this.turnReset();
    },
    // draw control
    drawControlBox: function(width, height, x, y) {
      if (width < 50 || height < 50) {
        return false;
      }
      let $toolBoxControl = this.$refs["toolBoxControl"];
      if (x < 0) {
        x = 0;
      }
      if (y < 0) {
        y = 0;
      }
      if (x + this.toolBox.width > this.boxWidth) {
        x = this.boxWidth - this.toolBox.width;
      }
      if (y + this.toolBox.height > this.boxHeight) {
        y = this.boxHeight - this.toolBox.height;
      }
      $toolBoxControl.style.top = y + "px";
      $toolBoxControl.style.left = x + "px";
      let c = this.$refs["canvasSelectBox"];
      let ctx = c.getContext("2d");
      ctx.fillStyle = this.selectBoxColor;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillRect(0, 0, c.width, c.height);
      if (this.rate) {
        let p = this.rate;
        ctx.clearRect(x, y, width, width / p);
        $toolBoxControl.style.width = width + "px";
        $toolBoxControl.style.height = width / p + "px";
        this.toolBox.height = width / p;
      } else {
        ctx.clearRect(x, y, width, height);
        $toolBoxControl.style.width = width + "px";
        $toolBoxControl.style.height = height + "px";
      }
      this.toolBox.boxMove.moveTo.x = x;
      this.toolBox.boxMove.moveTo.y = y;
    },
    // toolBoxMouseDown
    toolBoxMouseDown: function(e) {
      let $toolBox = this.$refs["toolBoxControl"];
      this.toolBox.x = parseInt($toolBox.style.left.split("px")[0]);
      this.toolBox.y = parseInt($toolBox.style.top.split("px")[0]);
      this.toolBox.disable = false;
      this.dropImg.active = false;
      this.toolBox.boxMove.start = {
        x: e.pageX,
        y: e.pageY
      };
    },
    toolBoxMouseMove: function(e) {
      if (this.dropImg.active) {
        this.dropImgMove(e);
      }
      if (this.toolBox.disable === false) {
        let offsetX = e.pageX - this.toolBox.boxMove.start.x;
        let offsetY = e.pageY - this.toolBox.boxMove.start.y;
        let x = this.toolBox.x + offsetX;
        let y = this.toolBox.y + offsetY;
        this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
      }
    },
    toolBoxMouseLeave: function() {
      this.toolBox.disable = true;
    },
    toolBoxMouseUp: function(e) {
      let $toolBox = this.$refs["toolBoxControl"];
      this.toolBox.x = parseInt($toolBox.style.left.split("px")[0]);
      this.toolBox.y = parseInt($toolBox.style.top.split("px")[0]);
      this.toolBox.disable = true;
      this.dropImg.active = false;
    },
    // 绘制图片
    printImg: function() {
      if (this.drawImg.img) {
        let canv = this.$refs["canvas"];
        let ctx = canv.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.translate(
          this.drawImg.x + this.drawImg.width / 2,
          this.drawImg.y + this.drawImg.height / 2
        );
        ctx.rotate((this.rotateImg.angle * Math.PI) / 180);
        ctx.translate(
          -(this.drawImg.x + this.drawImg.width / 2),
          -(this.drawImg.y + this.drawImg.height / 2)
        );
        ctx.translate(this.drawImg.x, this.drawImg.y);
        ctx.drawImage(
          this.drawImg.img,
          this.drawImg.sx,
          this.drawImg.sy,
          this.drawImg.swidth,
          this.drawImg.sheight,
          0,
          0,
          this.drawImg.width,
          this.drawImg.height
        );
        ctx.translate(-this.drawImg.x, -this.drawImg.y);
        ctx.restore();
      }
    },
    // 拖动图片
    dropImgOn: function(e) {
      this.dropImg.active = true;
      this.dropImg.params = { ...this.drawImg };
      this.dropImg.pageX = e.pageX;
      this.dropImg.pageY = e.pageY;
    },
    dropImgOff: function() {
      this.dropImg.active = false;
    },
    dropImgMove: function(e) {
      let _this = this;
      if (this.dropImg.active && this.drawImg.img) {
        let drawImg = { ..._this.drawImg };
        drawImg.x = _this.dropImg.params.x - (_this.dropImg.pageX - e.pageX);
        drawImg.y = _this.dropImg.params.y - (_this.dropImg.pageY - e.pageY);
        _this.$set(_this, "drawImg", drawImg);
        _this.printImg();
        e.stopPropagation();
      }
    },
    // 缩放
    scaleReset: function() {
      this.drawImg.width = this.drawImg.swidth;
      this.drawImg.height = this.drawImg.sheight;
      this.printImg();
    },
    scaleImgWheel: function(e) {
      let _this = this;
      if (_this.drawImg.img) {
        let scale;
        // e是FF的事件。window.event是chrome/ie/opera的事件
        let ee = e || window.event;
        if (ee.wheelDelta) {
          //IE/Opera/Chrome
          scale = -(ee.wheelDelta / 40);
        } else if (ee.detail) {
          //Firefox
          scale = ee.detail;
        }
        let widthLimit = 50;
        _this.drawImg.x =
          _this.drawImg.width - scale * 9 > widthLimit
            ? _this.drawImg.x + scale * 3
            : _this.drawImg.x;
        _this.drawImg.y =
          _this.drawImg.width - scale * 9 > widthLimit
            ? _this.drawImg.y + scale * 3
            : _this.drawImg.y;
        _this.drawImg.width =
          _this.drawImg.width - scale * 9 > widthLimit
            ? _this.drawImg.width - scale * 9
            : widthLimit;
        _this.drawImg.height = _this.drawImg.width / _this.scaleImg.rate;
        _this.printImg();
      }
      let scrollTop = this.$refs["mask"].scrollTop;
      this.$refs["mask"].scrollTo(this.$refs["mask"].scrollLeft, scrollTop);
      return false;
    },
    // 旋转
    turnImg: function(angle) {
      let startAngle = this.rotateImg.angle;
      let turnAngle = startAngle + angle;
      if (turnAngle >= -180 && turnAngle <= 180) {
        this.rotateImg.angle = turnAngle;
        this.rotateControl.position = (turnAngle / 180) * 100 + 100;
        this.printImg("rotate");
      }
    },
    turnReset: function() {
      this.rotateImg.angle = 0;
      this.rotateControl.position = 100;
      this.printImg("rotate");
    },
    // control box
    controlBtnMouseDown: function(e) {
      this.controlBox.disable = false;
      this.controlBox.btnName = e.target.dataset.name;
      this.controlBox.start.x = e.clientX;
      this.controlBox.start.y = e.clientY;
      this.controlBox.start.width = this.toolBox.width;
      this.controlBox.start.height = this.toolBox.height;
      e.stopPropagation();
    },
    controlBtnMouseUp: function(e) {
      this.controlBox.disable = true;
      this.dropImgOff();
      e.stopPropagation();
    },

    controlBtnMouseMove: function(e) {
      if (this.controlBox.disable === false) {
        let offsetX = e.clientX - this.controlBox.start.x;
        let offsetY = e.clientY - this.controlBox.start.y;
        if (this.controlBox.btnName == "leftUp") {
          let x = this.toolBox.x + offsetX;
          let y = this.toolBox.y + offsetY;
          this.toolBox.width =
            this.controlBox.start.width - offsetX > 50
              ? this.controlBox.start.width - offsetX
              : 50;
          this.toolBox.height =
            this.controlBox.start.height - offsetY > 50
              ? this.controlBox.start.height - offsetY
              : 50;
          this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
        }
        if (this.controlBox.btnName == "rightUp") {
          let x = this.toolBox.x;
          let y = this.toolBox.y + offsetY;
          this.toolBox.width =
            this.controlBox.start.width + offsetX > 50
              ? this.controlBox.start.width + offsetX
              : 50;
          this.toolBox.height =
            this.controlBox.start.height - offsetY > 50
              ? this.controlBox.start.height - offsetY
              : 50;
          this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
        }
        if (this.controlBox.btnName == "rightDown") {
          let x = this.toolBox.x;
          let y = this.toolBox.y;
          this.toolBox.width =
            this.controlBox.start.width + offsetX > 50
              ? this.controlBox.start.width + offsetX
              : 50;
          this.toolBox.height =
            this.controlBox.start.height + offsetY > 50
              ? this.controlBox.start.height + offsetY
              : 50;
          this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
        }
        if (this.controlBox.btnName == "leftDown") {
          let x = this.toolBox.x + offsetX;
          let y = this.toolBox.y;
          this.toolBox.width =
            this.controlBox.start.width - offsetX > 50
              ? this.controlBox.start.width - offsetX
              : 50;
          this.toolBox.height =
            this.controlBox.start.height + offsetY > 50
              ? this.controlBox.start.height + offsetY
              : 50;
          this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
        }
        if (this.controlBox.btnName == "topCenter") {
          let x = this.toolBox.x;
          let y = this.toolBox.y + offsetY;
          this.toolBox.width = this.controlBox.start.width;
          this.toolBox.height =
            this.controlBox.start.height - offsetY > 50
              ? this.controlBox.start.height - offsetY
              : 50;
          this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
        }
        if (this.controlBox.btnName == "downCenter") {
          let x = this.toolBox.x;
          let y = this.toolBox.y;
          this.toolBox.width = this.controlBox.start.width;
          this.toolBox.height =
            this.controlBox.start.height + offsetY > 50
              ? this.controlBox.start.height + offsetY
              : 50;
          this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
        }
        if (this.controlBox.btnName == "leftCenter") {
          let x = this.toolBox.x + offsetX;
          let y = this.toolBox.y;
          this.toolBox.width =
            this.controlBox.start.width - offsetX > 50
              ? this.controlBox.start.width - offsetX
              : 50;
          this.toolBox.height = this.controlBox.start.height;
          this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
        }
        if (this.controlBox.btnName == "rightCenter") {
          let x = this.toolBox.x;
          let y = this.toolBox.y;
          this.toolBox.width =
            this.controlBox.start.width + offsetX > 50
              ? this.controlBox.start.width + offsetX
              : 50;
          this.toolBox.height = this.controlBox.start.height;
          this.drawControlBox(this.toolBox.width, this.toolBox.height, x, y);
        }
      }
      e.stopPropagation();
    },
    cropPicture: function() {
      let _this = this;
      // get img
      let c = this.$refs["canvas"];
      let tempImg = new Image();
      tempImg.src = c.toDataURL();
      if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
          value: function(callback, type, quality) {
            var canvas = c;
            setTimeout(function() {
              var binStr = atob(canvas.toDataURL(type, quality).split(",")[1]);
              var len = binStr.length,
                arr = new Uint8Array(len);

              for (var i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
              }

              callback(new Blob([arr], { type: type || "image/png" }));
            });
          }
        });
      }
      c.toBlob(blob => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function() {
          let timmer = setInterval(function() {
            if (reader.readyState == 2) {
              clearInterval(timmer);
              let newCanv = document.createElement("canvas");
              newCanv.width = _this.toolBox.width;
              newCanv.height = _this.toolBox.height;
              let ctx = newCanv.getContext("2d");
              let params = _this.toolBox;
              if (this.rate) {
                let p = this.rate.split(":")[0] / this.rate.split(":")[1];
                ctx.drawImage(
                  tempImg,
                  params.x,
                  params.y,
                  params.width,
                  params.width * p,
                  0,
                  0,
                  params.width,
                  params.width * p
                );
              } else {
                ctx.drawImage(
                  tempImg,
                  params.x,
                  params.y,
                  params.width,
                  params.height,
                  0,
                  0,
                  params.width,
                  params.height
                );
              }
              newCanv.toBlob(
                function(blob) {
                  _this.handleClose();
                  _this.$emit("cutDown", {
                    file: blob,
                    dataURL: newCanv.toDataURL()
                  });
                },
                "image/jpeg",
                0.95
              );
            }
          }, 200);
        };
      });
    },
    scrollBarControlMove: function(e) {
      if (this.rotateControl.active) {
        let offsetX = e.pageX - this.rotateControl.start.x;
        //                let rotate = this.rotateImg.angle/360*100 + offsetX/100*100;
        let position = this.rotateControl.start.position + offsetX;
        if (position <= 0) {
          position = 0;
        }
        if (position >= 200) {
          position = 200;
        }
        this.rotateControl.position = position;
        this.rotateImg.angle = ((position - 100) / 100) * 180;
        this.printImg();
      }
    },
    scrollBarControlOn: function(e) {
      this.rotateControl.active = true;
      this.rotateControl.start.x = e.pageX;
      this.rotateControl.start.y = e.pageY;
      this.rotateControl.start.position = this.rotateControl.position;
    },
    scrollBarControlOff: function() {
      this.rotateControl.active = false;
    }
  }
};
</script>
<style scoped>
.vue-img-cutter {
  font-size: 12px;
  line-height: 130%;
}
.fl {
  float: left;
}

.fr {
  float: right;
}

.i-dialog-footer {
  display: block;
  width: 100%;
  margin-top: 20px;
}

.mask {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  overflow-y: scroll;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.dialogBox {
  position: relative;
  padding-top: 100px;
  padding-bottom: 100px;
  clear: both;
}
.dialogMain {
  line-height: 125%;
  font-size: 16px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 3px;
  box-sizing: border-box;
  padding: 15px 15px 0 15px;
  background: #fff;
  z-index: 1000;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
  animation: dialogShow 0.3s;
}
@keyframes dialogShow {
  from {
    margin-top: -50px;
    opacity: 0;
  }
  to {
    margin-top: 0;
    opacity: 1;
  }
}
.toolMain {
  box-sizing: border-box;
}

.toolBox {
  border: 1px solid #dedede;
  background-image: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.25) 25%,
      transparent 0,
      transparent 75%,
      rgba(0, 0, 0, 0.25) 0
    ),
    linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.25) 25%,
      transparent 0,
      transparent 75%,
      rgba(0, 0, 0, 0.25) 0
    );
  background-color: #eee;
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  position: relative;
}

.tool-title {
  margin-bottom: 10px;
}

.canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}

.canvasSelectBox {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

.toolBoxControl {
  background: transparent;
  position: absolute;
  z-index: 101;
  box-sizing: border-box;
  border: 1px dashed #409eff;
}

.toolBoxControlLine {
  position: absolute;
}

.toolBoxControlLineItem-1 {
  top: 33%;
  width: 100%;
  height: 1px;
  box-sizing: border-box;
  border-bottom: 1px dashed #409eff;
}

.toolBoxControlLineItem-2 {
  top: 66%;
  width: 100%;
  height: 1px;
  box-sizing: border-box;
  border-bottom: 1px dashed #409eff;
}

.toolBoxControlLineItem-3 {
  left: 33%;
  border-right: 1px dashed #409eff;
  height: 100%;
  width: 1px;
  box-sizing: border-box;
}

.toolBoxControlLineItem-4 {
  left: 66%;
  border-right: 1px dashed #409eff;
  height: 100%;
  width: 1px;
  box-sizing: border-box;
}

.controlBox {
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: move;
}

.controlBtn {
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  background: #409eff;
  position: absolute;
  border-radius: 50%;
}

.leftUp {
  top: 0;
  left: 0;
  margin-left: -5px;
  margin-top: -5px;
  cursor: se-resize;
}

.leftDown {
  bottom: 0;
  left: 0;
  margin-left: -5px;
  margin-bottom: -5px;
  cursor: sw-resize;
}

.rightUp {
  top: 0;
  right: 0;
  margin-right: -5px;
  margin-top: -5px;
  cursor: sw-resize;
}

.rightDown {
  bottom: 0;
  right: 0;
  margin-right: -5px;
  margin-bottom: -5px;
  cursor: se-resize;
}

.topCenter {
  top: 0;
  right: 50%;
  margin-right: -5px;
  margin-top: -5px;
  cursor: s-resize;
}

.downCenter {
  bottom: 0;
  right: 50%;
  margin-right: -5px;
  margin-bottom: -5px;
  cursor: s-resize;
}

.leftCenter {
  top: 50%;
  left: 0;
  margin-left: -5px;
  margin-top: -5px;
  cursor: e-resize;
}

.rightCenter {
  top: 50%;
  right: 0;
  margin-right: -5px;
  margin-top: -5px;
  cursor: e-resize;
}

.toolBar {
  margin-top: 10px;
}

.selectArea {
  display: block;
  width: 260px;
  text-align: right;
  color: #fff;
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 10px;
  user-select: none;
}

.tips {
  position: absolute;
  top: 50%;
  left: 50%;
  color: red;
  z-index: 101;
  transform: translate(-50%, -50%);
}

.btn {
  display: inline-block;
  text-align: center;
  background: #dedede;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid;
  font-size: 14px;
  transition: background 0.3s, color 0.3s;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
}

.btn[disabled] {
  opacity: 0.6;
  color: #333;
  border-color: #dedede !important;
  background-color: #fff !important;
  cursor: default;
}

.btn[disabled]:hover {
  opacity: 0.6;
  color: #333 !important;
  border-color: #dedede !important;
  background-color: #fff !important;
}

.btn-default {
  color: #333;
  border-color: #dcdfe6;
  background-color: #fff;
  transition: background 0.3s, color 0.3s;
}

.btn-default:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.btn-primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  transition: background 0.3s, color 0.3s;
}

.btn-primary:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}

.btn-warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}

.btn-warning:hover {
  color: #fff;
  background-color: #eeba6c;
  border-color: #e6a23c;
  transition: background 0.3s, color 0.3s;
}

.btn-primary-plain {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
  transition: background 0.3s, color 0.3s;
}

.btn-primary-plain:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}

.btn-xs {
  height: 26px;
  line-height: 26px;
  padding: 0 10px;
  font-size: 12px;
}

.dialog-footer {
  float: right;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-in-enter {
  margin-top: -50px;
  opacity: 0;
  transition: margin-top 0.2s, opacity 0.2s;
}

.fade-out-enter {
  transition: margin-top 0.2s, opacity 0.2s;
}

.fade-in-active {
  transition: margin-top 0.2s, opacity 0.2s;
}

.fade-out-active {
  margin-top: -50px;
  opacity: 0;
  transition: margin-top 0.2s, opacity 0.2s;
}

.file-input {
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #dedede;
}

.file-input::placeholder {
  color: #c0c4cc;
}

.toolbar-item {
  display: inline-block;
}

.closeIcon {
  float: right;
  cursor: pointer;
  display: inline-block;
  background: #c6e2ff;
  color: #fff;
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  transition: transform 0.3s, background 0.3s;
  /*transform: rotate(90deg);*/
}
.closeIcon:hover {
  background: #409eff;
  transform: rotate(180deg);
}

.copyright {
  font-size: 10px !important;
  clear: both !important;
  width: 100% !important;
  text-align: right !important;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  display: block !important;
  opacity: 1 !important;
  position: relative !important;
}

.copyright a {
  color: #ebebeb !important;
  text-decoration: none !important;
  position: relative !important;
  opacity: 1 !important;
}

/*工具栏*/
.dockMain {
  position: absolute;
  z-index: 1002;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.5;
  transition: opacity 0.5s;
  width: 98%;
  box-sizing: border-box;
  padding: 10px 10px;
  border-radius: 5px;
  background: #fff;
}

.dockMain:hover {
  opacity: 1;
}

.dockBtn {
  font-size: 10px;
  cursor: pointer;
  display: inline-block;
  margin-right: 4px;
  color: #409eff;
  border: 1px solid #c6e2ff;
  background-color: #ecf5ff;
  padding: 1px 4px;
  border-radius: 3px;
  height: 20px;
  line-height: 20px;
  transition: background 0.2s, color 0.2s;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
}

.dockBtn:hover {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

/* 旋转进度条 */
.dockBtnScrollBar {
  display: inline-block;
  margin-right: 4px;
  margin-left: 10px;
  background: #409eff;
  width: 200px;
  height: 10px;
  border-radius: 5px;
  position: relative;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
}

.scrollBarControl {
  position: absolute;
  cursor: pointer;
  background: #fff;
  border: 2px solid #409eff;
  box-sizing: border-box;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 3px #1f5184;
}

.scrollBarText {
  position: absolute;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.7);
  padding: 2px;
  color: #fff;
  top: -16px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  font-size: 10px;
  border-radius: 3px;
  transform: translate(-50%, -50%);
}
</style>
