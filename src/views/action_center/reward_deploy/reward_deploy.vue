<template>
  <div style="margin-bottom: 20px;">
    <h3>奖励配置</h3>
    <div>
      <Table border width="100%" :columns="columns1" :data="list1" :loading="TableLoading1">
        <template slot-scope="{ row }" slot="action">
          <Button type="success" style="margin-right: 5px" size="small" @click="openModal1(row)">修改</Button>
        </template>
        <template slot-scope="{ row }" slot="value">
          <div v-if="row.type&&row.type=='3'">
            <img class="table-img" :src="row.value" alt />
          </div>
          <div v-else>
            <div v-if="row.code == '7'">{{row.value}}个</div>
            <div
              v-else-if="row.code == '8'||row.code == '18'||row.code == '19'||row.code == '21'||row.code == '26'"
            >{{row.value}}元</div>
            <div v-else-if="row.code == '9'">{{row.value}}U贝=1元</div>
            <div
              v-else-if="row.code == '10'||row.code=='27'||row.code=='31'||row.code=='33'||row.code=='34'||row.code=='35'"
            >{{row.value}}次</div>
            <div v-else-if="row.code == '11'||row.code == '12'||row.code == '13'||row.code == '14'">
              <p>第一名{{row.value.split(',')[0]}}U贝</p>
              <p>第二名{{row.value.split(',')[1]}}U贝</p>
              <p>第三名{{row.value.split(',')[2]}}U贝</p>
            </div>
            <div v-else-if="row.code == '15'">{{row.value}}天</div>
            <div v-else-if="row.code == '20'">{{row.value}}%</div>
            <div v-else-if="row.code == '36'">{{row.value}}分钟</div>
            <div v-else>{{row.value}}U贝</div>
          </div>
        </template>
      </Table>
    </div>

    <!--会员等级-->
    <h3>身份配置</h3>
    <div>
      <Table
        border
        width="100%"
        :show-header="false"
        :columns="columns2"
        :data="list2"
        :loading="TableLoading2"
      >
        <template slot-scope="{ row }" slot="action">
          <Button type="success" style="margin-right: 5px" size="small" @click="openModal2(row)">修改</Button>
        </template>
        <template slot-scope="{ row }" slot="verifyQuantityMin">
          <span>{{`核销好友数`+row.verifyQuantityMin+`名`}}</span>
        </template>
      </Table>
    </div>

    <h3>说明配置</h3>
    <div>
      <Table
        border
        width="100%"
        :show-header="false"
        :columns="columns3"
        :data="list3"
        :loading="TableLoading3"
      >
        <template slot-scope="{ row }" slot="action">
          <Button type="success" style="margin-right: 5px" size="small" @click="openModal3(row)">修改</Button>
        </template>
        <template slot-scope="{ row }" slot="context">
          <Tooltip max-width="500" placement="top">
            <span id="content-box" v-html="row.context"></span>
            <div slot="content" id="reward_deploy">
              <p v-html="row.context"></p>
            </div>
          </Tooltip>
        </template>
      </Table>
    </div>Modal36
    <!-- 进店群U贝奖励值 code 39 -->
    <Modal39 :modal="modal39" @refresh="getData1"></Modal39>

    <!-- 提现-开关 -->
    <WithdrawalSwitch></WithdrawalSwitch>
    <!-- 商户免审提现金额 -->
    <!-- <WithdrawalFreeAmount></WithdrawalFreeAmount> -->
    <!-- 支付券配置 -->
    <paymentVoucher></paymentVoucher>

    <!-- 微信号 -->
    <wxconfig></wxconfig>

    <!--奖励配置-->
    <Modal v-model="modal1.isopen" :title="modal1.name" :mask-closable="false" footer-hide>
      <Row v-if="modal1.type && modal1.type =='3'">
        <img style="width: 500px;text-align: center" :src="modal1.value" />
        <Upload
          ref="upload"
          :defaultList="defaultList"
          type="drag"
          :format="['jpg','jpeg','png','bmp']"
          :on-success="handleSuccess"
          :action="url"
          accept="image"
          :max-size="1024"
          :on-exceeded-size="handleMaxSize"
          :on-format-error="formatError"
          :headers="userToken"
          :show-upload-list="false"
          style="display: inline-block;width:90px;"
        >
          <!-- :before-upload="handleUploadicon"  :show-upload-list="false"-->
          <div style="width: 90px;height:90px;line-height: 90px;">
            <Icon type="ios-camera" size="20" />
          </div>
        </Upload>
        <!--<Upload-->
        <!--ref="upload"-->
        <!--:show-upload-list="false"-->
        <!--:default-file-list="defaultList"-->
        <!--:on-success="handleSuccess"-->
        <!--:format="['jpg','jpeg','png']"-->
        <!--:max-size="2048"-->
        <!--:on-format-error="handleFormatError"-->
        <!--:on-exceeded-size="handleMaxSize"-->
        <!--:before-upload="handleBeforeUpload"-->
        <!--multiple-->
        <!--type="drag"-->
        <!--action="//jsonplaceholder.typicode.com/posts/"-->
        <!--style="display: inline-block;width:58px;">-->
        <!--<div style="width: 58px;height:58px;line-height: 58px;">-->
        <!--<Icon type="camera" size="20"></Icon>-->
        <!--</div>-->
        <!--</Upload>-->
      </Row>
      <Form
        v-else
        :model="modal1"
        label-position="right"
        ref="modalErf1"
        :rules="ruleValidate1"
        :label-width="80"
      >
        <Row></Row>
        <Row v-if="modal1.code == '7'">
          <Col span="18">
            <FormItem label="数量">
              <InputNumber
                :min="0"
                :step="1"
                type="text"
                :precision="0"
                v-model="modal1.value"
                placeholder="请输入"
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4" offset="1">
            <span class="ivu-form-item-label">个</span>
          </Col>
        </Row>
        <Row
          v-else-if="modal1.code == '8'||modal1.code == '18'||modal1.code == '19'||modal1.code == '21'||modal1.code == '26'"
        >
          <Col span="18">
            <FormItem label="金额">
              <!--<InputNumber-->
              <!--:min="0"-->
              <!--:step="1"-->
              <!--type="text"-->
              <!--v-model="modal1.value"-->
              <!--:precision="2"-->
              <!--:active-change="true"-->
              <!--placeholder="请输入"-->
              <!--style="width: 100%"-->
              <!--&gt;</InputNumber>-->
              <div class="ivu-input-number ivu-input-number-default" style="width: 100%">
                <input
                  class="ivu-input-number-input"
                  min="0"
                  v-model="modal1.value"
                  v-numformatter="modal1.value"
                />
              </div>
            </FormItem>
          </Col>
          <Col span="4" offset="1">
            <span class="ivu-form-item-label">元</span>
          </Col>
        </Row>
        <Row v-else-if="modal1.code == '9'">
          <Col span="18">
            <FormItem>
              <InputNumber
                :min="0"
                :step="1"
                type="text"
                :precision="0"
                v-model="modal1.value"
                placeholder="请输入"
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4" offset="1">
            <span class="ivu-form-item-label">U贝=1元</span>
          </Col>
        </Row>
        <Row
          v-else-if="modal1.code == '10'||modal1.code == '27'||modal1.code == '31'||modal1.code=='33'||modal1.code=='34'||modal1.code=='35'"
        >
          <Col span="18">
            <FormItem label="次数">
              <InputNumber
                :min="0"
                :step="1"
                type="text"
                :precision="0"
                v-model="modal1.value"
                placeholder="请输入"
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4" offset="1">
            <span class="ivu-form-item-label">次</span>
          </Col>
        </Row>
        <Row
          v-else-if="modal1.code == '11'||modal1.code == '12'||modal1.code == '13'||modal1.code == '14'"
        >
          <Col span="18">
            <FormItem label="第一名">
              <InputNumber
                :min="0"
                :step="1"
                type="text"
                :precision="0"
                v-model="modal1.value1"
                placeholder="请输入"
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4" offset="1">
            <span class="ivu-form-item-label">U贝</span>
          </Col>
          <Col span="18">
            <FormItem label="第二名">
              <InputNumber
                :min="0"
                :step="1"
                type="text"
                :precision="0"
                v-model="modal1.value2"
                placeholder="请输入"
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4" offset="1">
            <span class="ivu-form-item-label">U贝</span>
          </Col>
          <Col span="18">
            <FormItem label="第三名">
              <InputNumber
                :min="0"
                :step="1"
                type="text"
                :precision="0"
                v-model="modal1.value3"
                placeholder="请输入"
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4" offset="1">
            <span class="ivu-form-item-label">U贝</span>
          </Col>
        </Row>
        <Row v-else-if="modal1.code == '15'">
          <Col span="18">
            <FormItem label="有效期">
              <InputNumber
                :min="0"
                :step="1"
                type="text"
                :precision="0"
                v-model="modal1.value"
                placeholder="请输入"
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4" offset="1">
            <span class="ivu-form-item-label">天</span>
          </Col>
        </Row>
        <Row v-else-if="modal1.code == '20'">
          <Col span="18">
            <FormItem label="提现个税">
              <InputNumber
                :min="0"
                :max="100"
                :step="1"
                type="text"
                :precision="0"
                v-model="modal1.value"
                placeholder="请输入"
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4" offset="1">
            <span class="ivu-form-item-label">%</span>
          </Col>
        </Row>
        <Row v-else-if="modal1.code == '36'">
          <Col span="18">
            <FormItem label="分钟">
              <InputNumber
                :min="0"
                :step="1"
                type="text"
                :precision="0"
                v-model="modal1.value"
                placeholder="请输入"
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4" offset="1">
            <span class="ivu-form-item-label">分钟</span>
          </Col>
        </Row>
        <Row v-else>
          <Col span="18">
            <FormItem label="U贝">
              <InputNumber
                :min="0"
                :step="1"
                type="text"
                :precision="0"
                v-model="modal1.value"
                placeholder="请输入"
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4" offset="1">
            <span class="ivu-form-item-label">个</span>
          </Col>
        </Row>
      </Form>
      <row>
        <Button style="float: right;margin-left: 20px" type="primary" @click="ok1('modalErf1')">确认</Button>
        <Button style="margin-left: 8px;float: right;" @click="modal1.isopen = false">关闭</Button>
      </row>
    </Modal>

    <!--会员等级弹窗-->
    <Modal v-model="modal2.isopen" :title="modal2.levelName" :mask-closable="false" footer-hide>
      <Form
        :model="modal2"
        label-position="right"
        ref="modalErf2"
        :rules="ruleValidate2"
        :label-width="120"
      >
        <Row>
          <Col span="18">
            <FormItem label="核销好友数">
              <InputNumber
                :min="0"
                :step="1"
                type="text"
                :precision="0"
                v-model="modal2.verifyQuantityMin"
                placeholder="请输入"
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Button style="float: right;margin-left: 20px" type="primary" @click="ok2('modalErf2')">确认</Button>
          <Button style="margin-left: 8px;float: right;" @click="modal2.isopen = false">关闭</Button>
        </FormItem>
      </Form>
    </Modal>

    <!--说明配置-->
    <Modal v-model="modal3.isopen" :title="modal3.name" :mask-closable="false" footer-hide>
      <Form :model="modal3" label-position="right" ref="modalErf3" :rules="ruleValidate3">
        <Row v-if="modal3.isEditor">
          <editor-bar
            v-model="modal3.context"
            :content="modal3.context"
            @on-change="change"
            @on-blur="blur"
          ></editor-bar>
        </Row>
        <Row v-if="!modal3.isEditor">
          <Input v-model="modal3.context" style="width: 300px" />
        </Row>
        <FormItem>
          <Button style="float: right;margin-left: 20px" type="primary" @click="ok3('modalErf3')">确认</Button>
          <Button style="margin-left: 8px;float: right;" @click="modal3.isopen = false">关闭</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { postRequest, getRequest } from "@/libs/axios";
import { uploadOperationImage2AliOssURl } from "@/api/index";
import EditorBar from "@/components/EditorBar";
import WithdrawalSwitch from "./WithdrawalSwitch";
import wxconfig from "./wxconfig";
import Modal39 from "./Modal39";

// import WithdrawalFreeAmount from "./WithdrawalFreeAmount";
import paymentVoucher from "./paymentVoucher";

import { columns1, columns2, columns3 } from "./columns";

export default {
  name: "reward_deploy",
  components: { EditorBar, WithdrawalSwitch, paymentVoucher, wxconfig, Modal39 },
  data() {
    return {
      userToken: {}, //用户token
      url: uploadOperationImage2AliOssURl,
      ruleValidate1: {
        value: [{ required: true, message: "请输入数量", trigger: "blur" }],
        value1: [{ required: true, message: "请输入数量", trigger: "blur" }],
        value2: [{ required: true, message: "请输入数量", trigger: "blur" }],
        value3: [{ required: true, message: "请输入数量", trigger: "blur" }],
      },
      ruleValidate2: {
        verifyQuantityMin: [{ required: true, message: "请输入数量", trigger: "blur" }],
      },
      ruleValidate3: {
        context: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      loading: true,
      defaultList: [],
      TableLoading1: false,
      TableLoading2: false,
      TableLoading3: false,
      visible: false,
      imgName: "",
      modal39: {
        isopen: false,
        name: "",
        id: "",
        code: "39",
        value: "",
      },
      modal1: {
        name: "",
        id: "",
        code: "",
        type: "",
        isopen: false,
        value: 0,
        value1: 0,
        value2: 0,
        value3: 0,
      },
      modal2: {
        levelName: "",
        isopen: false,
        level: "",
        verifyQuantityMin: 0,
      },
      modal3: {
        name: "",
        isopen: false,
        context: "",
        newcontext: "",
        isEditor: true,
      },
      columns1,
      columns2,
      columns3,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
    };
  },
  methods: {
    inputNum(e) {
      if (!String.fromCharCode(e.keyCode).match(/[0-9\.]/)) {
        return false;
      }
    },
    formatter(e) {
      // if ( !this.isNumber(e.keyCode) )  return false
      // let value = e.target.value;
      // if (value.indexOf('.')&&e.keyCode==190) return false
      // if (value.split('.')[1]&&value.split('.')[1].length>=2) return false
      console.log(e);
      e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
    },
    // 仅能输入数字
    isNumber(keyCode) {
      // 数字
      if (keyCode >= 48 && keyCode <= 57) return true;
      // 小数字键盘
      if (keyCode == 190) return true;
      // Backspace键
      if (keyCode == 8) return true;
      return false;
    },
    change(e) {
      this.modal3.newcontext = e;
    },
    blur(e) {
      this.modal3.newcontext = e;
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleSuccess(res, file) {
      this.model1.value = file.url;
      // 因为上传过程为实例，这里模拟添加 url
      file.url = "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
    },
    handleSuccess(res, file) {
      if (res.code == 200) {
        this.modal1.value = res.image_url;
        this.msgOk("上传图片成功");
      } else {
        this.msgErr("上传图片失败，请重新上传");
      }
    },
    formatError() {
      this.msgErr("只能上传jpg,jpeg,png,bmp格式,请重新上传");
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: "文件 " + file.name + " 太大，不能超过 2M。",
      });
    },
    handleBeforeUpload() {
      // const check = this.uploadList.length < 5;
      // if (!check) {
      //     this.$Notice.warning({
      //         title: '最多只能上传 1 张图片。'
      //     });
      // }
      // return check;
    },
    openModal1(item) {
      if (item.code == 39) {
        this.modal39 = {
          isopen: true,
          levelName: item.name,
          id: item.id,
          code: item.code,
          name: item.name,
          value: item.value,
        };
        return;
      }
      (this.defaultList = []), (this.modal1.name = item.name);
      this.modal1.code = item.code;
      this.modal1.id = item.id;
      this.modal1.type = item.type;
      this.modal1.isopen = true;
      if (item.type != "3") {
        this.modal1.value = Number(item.value) || 0;
        if (item.code == "11" || item.code == "12" || item.code == "13" || item.code == "14") {
          this.modal1.value1 = Number(item.value.split(",")[0]) || 0;
          this.modal1.value2 = Number(item.value.split(",")[1]) || 0;
          this.modal1.value3 = Number(item.value.split(",")[2]) || 0;
          this.modal1.value = 0;
        }
      } else {
        this.modal1.value = item.value;
      }
    },
    openModal2(item) {
      this.modal2.levelName = item.levelName;
      this.modal2.isopen = true;
      this.modal2.level = item.level;
      this.modal2.verifyQuantityMin = Number(item.verifyQuantityMin) || 0;
    },
    openModal3(item) {
      this.modal3.name = item.name;
      this.modal3.code = item.code;
      this.modal3.isopen = true;
      this.modal3.context = item.context;
      this.modal3.newcontext = item.context;
      if (item.code == "12" || item.code == "13") {
        this.modal3.isEditor = false;
      } else {
        this.modal3.isEditor = true;
      }
    },
    ok1(name) {
      if (!this.modal1.type || this.modal1.type != "3") {
        if (
          this.modal1.code == "11" ||
          this.modal1.code == "12" ||
          this.modal1.code == "13" ||
          this.modal1.code == "14"
        ) {
          this.modal1.value = this.modal1.value1 + "," + this.modal1.value2 + "," + this.modal1.value3;
        }
        if (this.modal1.value || this.modal1.value === 0) {
          this.saveChange1();
        } else {
          this.$Message.error("请检查表单");
        }
      } else if (this.modal1.value) {
        if (this.modal1.value) {
          this.saveChange1();
        } else {
          this.$Message.error("请上传图片");
        }
      }
    },
    cancel() {
      // this.$Message.info('Clicked cancel');
    },
    ok2(name) {
      // this.$Message.info('Clicked ok');
      if (this.modal2.verifyQuantityMin || this.modal2.verifyQuantityMin === 0) {
        this.saveChange2();
      } else {
        this.$Message.error("请检查表单");
      }
    },
    ok3(name) {
      if (!this.modal3.isEditor) {
        this.modal3.newcontext = this.modal3.context;
      }
      if (this.modal3.newcontext) {
        this.saveChange3();
      } else {
        this.$Message.error("请检查表单");
      }
    },
    getData1() {
      this.TableLoading1 = true;
      getRequest("/commonConfig/queryAllConfig").then(res => {
        if (res.code == 200) {
          this.TableLoading1 = false;
          if (res.data) {
            this.list1 = res.data.noOverallCommonConfigList || [];
            this.list1.forEach(function(v) {
              if (v.code == "8" || v.code == "18" || v.code == "19" || v.code == "21" || v.code == "26") {
                v.value = v.value / 100;
              }
            });
          }
        } else {
          this.$Message.error(res.msg);
          this.TableLoading1 = false;
        }
      });
    },
    getData2() {
      this.TableLoading2 = true;
      postRequest("/mini/userLevelRule/list", {}).then(res => {
        if (res.code == 200) {
          this.list2 = res.data || [];
          this.TableLoading2 = false;
        } else {
          this.$Message.error(res.msg);
          this.TableLoading2 = false;
        }
      });
    },
    getData3() {
      this.TableLoading3 = true;
      getRequest("/rewardNotice/queryNoticeAll").then(res => {
        if (res.code == 200) {
          this.list3 = res.data || [];
          this.TableLoading3 = false;
        } else {
          this.$Message.error(res.msg);
          this.TableLoading3 = false;
        }
      });
    },
    saveChange1() {
      var that = this;
      postRequest("/commonConfig/updateConfigById", {
        overallCommonConfig: {
          id: this.modal1.id,
          code: this.modal1.code,
          value: this.modal1.value,
        },
      }).then(res => {
        if (res.code == 200) {
          // this.list2.forEach(function(v){
          //     if(v.level == that.modal2.level){
          //         v.verifyQuantityMin = that.modal2.verifyQuantityMin;
          //     }
          // })
          this.getData1();
          setTimeout(() => {
            that.modal1.isopen = false;
          }, 500);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    saveChange2() {
      var that = this;
      postRequest("/mini/userLevelRule/add", {
        verifyQuantityMin: this.modal2.verifyQuantityMin,
        level: this.modal2.level,
      }).then(res => {
        if (res.code == 200) {
          // this.list2.forEach(function(v){
          //     if(v.level == that.modal2.level){
          //         v.verifyQuantityMin = that.modal2.verifyQuantityMin;
          //     }
          // })
          this.getData2();
          setTimeout(() => {
            that.modal2.isopen = false;
          }, 500);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    saveChange3() {
      var that = this;

      postRequest("/rewardNotice/updateNotice", {
        code: this.modal3.code,
        context: this.modal3.newcontext,
      }).then(res => {
        if (res.code == 200) {
          // this.list2.forEach(function(v){
          //     if(v.level == that.modal2.level){
          //         v.verifyQuantityMin = that.modal2.verifyQuantityMin;
          //     }
          // })
          this.getData3();
          setTimeout(() => {
            that.modal3.isopen = false;
          }, 500);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    // 全局提示
    msgOk(txt) {
      this.$Message.info({
        content: txt,
        duration: 3,
      });
    },

    msgErr(txt) {
      this.$Message.error({
        content: txt,
        duration: 3,
      });
    },
  },
  created() {
    this.getData1();
    this.getData2();
    this.getData3();
    this.userToken = {
      jwttoken: localStorage.getItem("jwttoken"),
    };
  },
};
</script>

<style scoped>
h3 {
  display: inline-block;
  border: 1px solid #d8d3d3;
  padding: 5px 10px;
  margin: 10px 0;
}
.over-hidden {
  cursor: pointer;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 46px;
}
/*.over-hidden-hover{*/
/*display: none;*/
/*padding: 10px 14px;*/
/*border: 1px solid #ddd;*/
/*border-radius: 5px;*/
/*position: absolute;*/
/*top: -50px;*/
/*left: -30px;*/

/*}*/
.over-hidden-box {
  /*position: relative;*/
  /*overflow: visible;*/
}
/*.over-hidden-box:hover .over-hidden-hover{*/
/*display: block;*/
/*}*/
.table-img {
  width: 74px;
  height: 43px;
  padding: 5px;
}
#content-box {
  height: 18px;
  line-height: 18px;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ivu-table-wrapper {
  overflow: visible;
}
.ivu-tooltip {
  width: 100%;
}
</style>
<style>
#reward_deploy {
  max-height: 300px;
  overflow: scroll;
}
#content-box * {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

