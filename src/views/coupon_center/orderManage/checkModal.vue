<template>
  <div class="modal" @click.stop>
    <!-- <Form ref="addOrEditModal" :label-width="100" label-position="left"> -->
    <Form label-position="right" :label-width="120">
      <h3>订单信息</h3>
      <FormItem label="订单编号：">{{ dataInfo.orderNo }}</FormItem>
      <FormItem label="订单状态：">{{ dataInfo.statusStr }}</FormItem>
      <FormItem label="数量：">{{ dataInfo.amount }}元</FormItem>
      <FormItem label="单价：">{{ dataInfo.price }}元</FormItem>
      <FormItem label="总价：">{{ dataInfo.totalPrice }}元</FormItem>
      <FormItem label="实付款："
        >{{ dataInfo.realPay }}元 &nbsp;&nbsp;&nbsp;&nbsp;U贝抵扣：{{ dataInfo.ubayDiscount }}元
        &nbsp;&nbsp;&nbsp;&nbsp;红包抵扣：{{ dataInfo.redEnvelopeDiscount }}元</FormItem
      >
      <FormItem label="渠道：">{{ dataInfo.source }}</FormItem>

      <h3>交易记录</h3>
      <FormItem label="下单时间：">{{ dataInfo.gmtCreate }}</FormItem>
      <FormItem label="付款时间：">{{ dataInfo.payTime }}</FormItem>
      <FormItem label="付款方式：">{{ dataInfo.payTypeStr }}</FormItem>
      <FormItem label="交易流水号：">{{ dataInfo.transactionNo }}</FormItem>

      <h3>买家信息</h3>
      <FormItem label="买家昵称：">{{ dataInfo.nickName }}</FormItem>
      <FormItem label="买家账号：">{{ dataInfo.phoneNumber }}</FormItem>

      <h3>优惠券信息</h3>
      <FormItem label="卡券编码：">{{ dataInfo.couponId }}</FormItem>
      <FormItem label="优惠券所属商户：">{{ dataInfo.merchantName }}</FormItem>
      <FormItem label="有效时间：">{{ dataInfo.endUseTime }}</FormItem>
      <FormItem label="售后信息：">{{ dataInfo.sale }}</FormItem>

      <h3>券码信息</h3>
      <div v-for="item in dataInfo.coupon" :key="item.id">
        <FormItem label="券码：">{{ item.barCode }}</FormItem>
        <FormItem label="状态：">{{ item.status }}</FormItem>

        <FormItem label="过期时间：" v-if="item.endUseTime">{{ item.endUseTime }}</FormItem>
        <FormItem label="核销时间：" v-if="item.useTime">{{ item.useTime }}</FormItem>
        <FormItem label="申请退款时间：" v-if="item.applyRefundTime">{{ item.applyRefundTime }}</FormItem>
        <FormItem label="退款时间：" v-if="item.refundTime">{{ item.refundTime }}</FormItem>
        <FormItem label="退款原因：" v-if="item.refundReason">{{ item.refundReason }}</FormItem>
        <FormItem label="交易流水号：" v-if="item.transactionNo">{{ item.transactionNo }}</FormItem>
        <FormItem label="操作人：" v-if="item.auditUser">{{ item.auditUser }}</FormItem>
        <FormItem label="核销人：" v-if="item.nickName">{{ item.nickName }}</FormItem>
        <FormItem label="手机号：" v-if="item.phoneNumber">{{ item.phoneNumber }}</FormItem>
        <FormItem label="核销门店：" v-if="item.merchantName">{{ item.merchantName }}</FormItem>
        <FormItem label="操作时间：" v-if="item.auditTime">{{ item.auditTime }}</FormItem>
        <FormItem label="备注：" v-if="item.remark">{{ item.remark }}</FormItem>
      </div>
    </Form>
    <Audit v-if="action == 'audit'" :id="orderRefundId" @refresh="refresh" @close="close"></Audit>

    <!-- <Form ref="addOrEditModal" :label-width="100" label-position="left">
      <Row class="padding-left-12">
        <Col span="18">
          <FormItem label="审核：" span="24" :labelWidth="80">
            <RadioGroup v-model="auditStatus" style="width: 100%;margin: 10px;">
              <Radio label="2">
                <span>通过</span>
              </Radio>
              <Radio label="3">
                <span>不通过</span>
              </Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row class="padding-left-12">
        <Col span="18">
          <FormItem label="备注：" span="24" :labelWidth="80">
            <Input v-model="remark" type="textarea" :rows="4" placeholder="请输入备注" />
          </FormItem>
        </Col>
      </Row>

      <FormItem>
        <Button type="primary" style="margin-left: 8px;float: right;" @click="check">确定</Button>
        <Button style="margin-left: 8px;float: right;" @click="close">关闭</Button>
      </FormItem>
    </Form>-->
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px" @click="close">关闭</Button>
    </div>
  </div>
  <!--</Modal>-->
</template>

<script>
import { postRequest, getRequest, getSyncRequest, uploadformData } from "@/libs/axios";

// 审核
import Audit from "./Audit";

export default {
  name: "show-detail-modal",
  props: {
    viewDialogVisible: { type: Boolean, default: false },
  },
  components: { Audit },
  data() {
    return {
      orderRefundId: "",
      action: "detail", //detail/audit
      auditStatus: "2",
      remark: "",
      statusList: [
        { value: 1, label: "未开始" },
        { value: 2, label: "进行中" },
        { value: 3, label: "已结束" },
        { value: 4, label: "已终止" },
      ],
      statusOptions: {
        1: "未使用",
        2: "已使用",
        3: "已过期",
        4: "退款中",
        5: "已退款",
        6: "退款失败",
      },
      dataInfo: {},
    };
  },
  methods: {
    refresh() {
      //关闭对话框清除表单数据
      this.close();
      //刷新列表数据
      this.$emit("refresh");
    },
    async resetRow(row, action) {
      const { id } = row;
      this.orderRefundId = id;
      this.action = action;
      if (row) {
        // /merchant/activity/award/activity/{id}
        // /trade/fund/account/order/refundOrderDetails/{id}
        const url = `/trade/fund/account/order/refundOrderDetails/${id}`;
        let { code, sale, coupon, merchantName, data } = await getRequest(url);
        if (code === "200") {
          this.dataInfo = data.retData;
          this.dataInfo.merchantName = merchantName;
          this.dataInfo.sale = sale;
          this.dataInfo.coupon = coupon;
        } else {
          this.$Message.error("获取数据失败");
        }
      }
    },
    close() {
      // this.$emit("setViewDialogVisible", false);
      this.$emit(`update:showDetail`, false);
    },
    check() {
      var params = {
        auditStatus: this.auditStatus,
        remark: this.remark,
        orderRefundId: this.orderRefundId,
      };
      const url = "/trade/fund/account/order/leafletRefundAudit";
      postRequest(url, params).then(res => {
        let { code, msg } = res;
        this.TableLoading = false;
        if (code === "200") {
          this.$emit("setViewDialogVisible", false);
        } else {
          this.$Message.error(msg);
        }
      });
    },
  },
};
</script>

<style scoped>
h3 {
  border-left: 3px solid #333;
  padding-left: 10px;
  margin: 15px 0;
}
.padding-left-12 {
  padding-left: 12px;
}
.colof-a2 {
  color: #a2a2a2;
}
.ivu-radio-group-vertical .ivu-radio-wrapper {
  height: auto;
}
.radio-item {
  width: 100%;
  border: 1px solid #f4f4f4;
  padding: 10px;
  margin: 10px 0;
  position: relative;
}

.ivu-form-item {
  margin-bottom: 0;
}
.demo-drawer-footer {
  width: 100%;
  position: fixed;
  z-index: 111;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
