<template>
  <!-- ContentArea 内容专区 -->
  <div class="cms">
    {{tab.label}}
    <Form
      label-position="right"
      ref="form"
      :model="formData"
      :rules="ruleValidate"
      :label-width="130"
    >
      <FormItem
        label="主标题："
        prop="mainTitle"
        :rules="{required: true,  validator: validateEmpty('请输入主标题',6)}"
      >
        <Tooltip trigger="focus" title="提醒" content="最多6个汉字" placement="right">
          <Input
            style="width:200px"
            v-model="formData.mainTitle"
            :maxlength="20"
            placeholder="请输入主标题"
            clearable
          />
        </Tooltip>
      </FormItem>
      <!-- :rules="{ required: formData.subTitle.length, message: '请输入副标题' }" -->
      <FormItem label="副标题：" prop="subTitle" :rules="subTitleRules">
        <Tooltip trigger="focus" title="提醒" content="最多12个汉字" placement="right">
          <Input
            style="width:200px"
            v-model="formData.subTitle"
            :maxlength="20"
            placeholder="请输入副标题"
            clearable
            @on-clear="clearValidateMsg('subTitle')"
          />
        </Tooltip>
      </FormItem>
      <div style="margin-top:20px;">
        <FormItem label>
          <Button type="primary" :disabled="submitDisabled" @click="handleSubmit('form')">保存</Button>
        </FormItem>
      </div>
    </Form>
  </div>
</template>
<script>
import { postRequest } from "@/libs/axios";

export default {
  name: "content-area",
  inject: ["msgOk", "msgErr"],
  props: {
    tab: {
      type: Object,
      default: function() {
        return {
          id: "ContentArea",
          type: 7,
          label: "内容专区",
          compName: "ContentArea"
        };
      }
    }
  },
  mounted() {},
  computed: {
    subTitleRules() {
      let obj = null;
      if (this.formData.subTitle.length) {
        obj = {
          required: true,
          validator: this.validateEmpty("请输入副标题", 12)
        };
      } else {
        obj = { required: false };
      }
      console.log(11111, obj);

      return obj;
    }
  },
  watch: {
    ["formData.subTitle"]() {
      this.formData.subTitle = this.formData.subTitle.trim();
      console.log(this.formData.subTitle);
      if (this.formData.subTitle.length) {
        this.$refs.form.validateField("subTitle");
      } else {
        //清空校验
        this.clearValidateMsg("subTitle");
      }
    }
  },
  data() {
    return {
      submitDisabled: false,
      formData: {
        id: "",
        type: "",
        mainTitle: "", //主标题：超值爆抢券
        subTitle: "", //副标题：大家都在领
        iconUrl: "" //副标题：大家都在领
      },

      ruleValidate: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const url = "/page/module/layout/getCommonSetting";
      const { type } = this.tab;
      const site = 1;
      let { code, msg, data } = await postRequest(url, { type, site });
      if (code == 200) {
        if (data == "") {
          data = {
            id: "",
            type: "",
            mainTitle: "", //主标题：超值爆抢券
            subTitle: "", //副标题：大家都在领
            iconUrl: "" //副标题：大家都在领
          };
        }
        this.formData = data;
      } else {
        this.msgErr(msg);
      }
    },
    validateEmpty(msg, len = 20) {
      return function(rule, value, callback) {
        value += "";
        value = value.trim();
        if (value == "") {
          return callback(msg);
        }
        if (value.length > len) {
          return callback(`最多只能输入${len}个汉字`);
        }
        callback();
      };
    },
    //清空校验
    clearValidateMsg(name) {
      this.$refs.form.fields.some(function(e) {
        let r = e.prop == name;
        r && e.resetField();
        return r;
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        console.log("valid", valid);
        if (!valid) {
          this.msgErr("数据验证失败！");
          // this.submitDisabled = false;
          return;
        }

        //清洗数据
        let formData = JSON.parse(JSON.stringify(this.formData));
        const { type } = this.tab;
        formData.site = 1;
        formData.type = type;

        // 超值爆抢首页配置
        const url = "/page/module/layout/saveCommonSetting";
        postRequest(url, formData).then(res => {
          if (res.code == 200) {
            this.msgOk("保存成功");
          } else {
            this.msgErr(res.msg);
          }
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>