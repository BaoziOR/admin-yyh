<template>
  <!--  查看详情页  -->
  <div class="detail">
    <h2>提现信息</h2>
    <div>提现单号：{{formData.orderNo}}</div>
    <Row style="border:1px solid #ccc">
      <Col span="12">
        <Card>
          <Form label-position="right" :label-width="120">
            <FormItem label="商户名称：">{{formData.merchantName}}</FormItem>
            <FormItem label="省市：">{{formData.provinceName}}/{{formData.cityName}}</FormItem>
            <FormItem label="存款账号类型：">{{merchantTypeOption[formData.merchantType]}}</FormItem>
            <FormItem label="银行账号：">{{formData.account}}</FormItem>
            <FormItem label="开户名称：">{{formData.accountName}}</FormItem>
            <FormItem label="开户行：">{{formData.openBank}}</FormItem>
          </Form>
        </Card>
      </Col>
      <Col span="12">
        <Card>
          <Form label-position="right" :label-width="120">
            <FormItem label="提现前余额：">{{formData.accountBalance}}</FormItem>
            <FormItem label="提现金额：">{{formData.applyAmount}}</FormItem>
            <FormItem label="提现服务费：">{{formData.withdrawFee}}</FormItem>
            <FormItem label="提现平台收取：">{{formData.platformFee}}</FormItem>
            <FormItem label="提现时间：">{{formData.applyTime}}</FormItem>
            <FormItem label="提现人姓名：">{{formData.bankUserName}}</FormItem>
            <FormItem label="提现人手机：">{{formData.bankUserPhone}}</FormItem>
          </Form>
        </Card>
      </Col>
    </Row>

    <h2>审核结果</h2>
    <template v-if="action.type=='detail'">
      <div>审核日志</div>
      <Form label-position="right" :label-width="120">
        <FormItem label="审核结果：">{{statusOption[formData.auditStatus]}}</FormItem>
        <FormItem label="原因：" v-if="formData.auditStatus!=1">
          <Row>
            <Col span="16">
              <Input
                v-model="formData.remarks"
                type="textarea"
                style="width:300px;resize: none;"
                :autosize="{minRows: 8,maxRows: 8}"
                :maxlength="100"
                disabled
              />
            </Col>
          </Row>
        </FormItem>
      </Form>

      <!-- <Log :id="action.id"></Log> -->
    </template>
    <template v-else-if="action.type=='audit'">
      <Audit :id="action.id" @refresh="closeDialog"></Audit>
    </template>
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px" @click="closeDialog">关闭</Button>
    </div>
  </div>
</template>
<script>
// // 日志表格
// import Log from "./Log";
// // 审核
import Audit from "./Audit";

export default {
  name: "detail",
  components: { Audit },
  inject: {
    info: {
      default: () => {
        return {
          obj: {
            // corporateWithdrawFee: { total: 10, bank: 8, platform: 2 },
            // individualWithdrawFee: { total: 1, bank: 1 },
            // payPipelineFeeRate: { wx: 0.6, aliPay: 0.6 },
            // shareProfitRate: { merchant: 97, platform: 3 }
          }
        };
      }
    }
  },
  props: {
    action: {
      type: Object,
      default: function() {
        return {
          title: "",
          _id: Math.random(),
          id: "",
          type: "", //add/edit/detail/audit
          data: {}
        };
      }
    },
    showDetail: {
      type: Boolean,
      default: true
    },
    detailData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  watch: {
    action: {
      handler(val, oldVal) {
        let { type, data } = this.action;
        data = JSON.parse(JSON.stringify(data));
        this.formData = data;
        this.withdrawUserTableData = data.withdrawUserTableData;
        console.log("mounte detail", this.formData);

        if (type == "detail") {
        } else if (type == "audit") {
        }
      },
      deep: true,
      immediate: true
    }
  },
  // created() {
  mounted() {},
  data() {
    return {
      // 新增、修改 任务抽奖banner
      title: "扣款信息",
      // merchantType 商户/品牌
      // businessTypeLabel: "商户",
      // merchantTypeOption: {
      //   0: "本地商户（单店）",
      //   1: "本地商户（多店）",
      //   2: "商超门店",
      //   3: "零售商"
      // },
      //  '商户类型 0-本地商户（单店），1-本地商户（多店）' 2 商超门店、3 零售商
      merchantTypeOption: { 0: "本地商户（单店）", 1: "本地商户（多店）" },
      statusOption: {
        "1": "待审核",
        "2": "审核通过",
        "3": "审核失败"
      },
      // merchantTypeOption: [
      //   {
      //     value: 0,
      //     label: "本地商户（单店）"
      //   },
      //   {
      //     value: 1,
      //     label: "本地商户（多店）"
      //   }
      // ],
      formData: {
        merchantType: 0,
        merchantTypeName: "",
        businessId: "",
        businessName: "",
        merchantId: "",
        merchantName: "",
        brandId: "", //
        brandName: "", //
        reduceUbay: "", //消耗U贝
        remark: "remarks" //备注 必填
      },
      withdrawUserTableData: []
    };
  },
  methods: {
    closeDialog() {
      //关闭对话框清除表单数据
      // this.$refs.formValidate.resetFields();
      console.log("closeDialog");
      this.$emit(`update:showDetail`, false);
    }
  }
};
</script>
<style scoped>
.ivu-form-item {
  margin-bottom: 0;
}
.demo-drawer-footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>