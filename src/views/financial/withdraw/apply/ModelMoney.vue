<template>
  <div class="supermarket-list-box">
    <Modal
      v-model="isShow"
      footer-hide
      :closable="true"
      :mask-closable="false"
      @on-cancel="closeDialog"
      width="1200"
      :styles="{top: '20px'}"
    >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>
          待提现审核用户明细
          <strong>9-20</strong>
        </span>
      </p>
      <div>
        <Table
          border
          ref="selection"
          size="small"
          :columns="tableColumns"
          :data="tableData"
          class="bussiness-list"
        ></Table>
      </div>
      <Row style="margin-top: 30px; text-align: center;">
        <Button type="primary" @click="closeDialog">关闭</Button>
      </Row>
    </Modal>
  </div>
</template>
<script>
import { getShopList } from "@/api/sys";
import { getRequest, postRequest } from "@/libs/axios";
export default {
  name: "super-market-list",
  props: {
    moneyData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShow: true,
      tableColumns: [
        {
          title: "邀请好友数",
          key: "inviteAmount",
          align: "center"
        },
        {
          title: "好友领券数",
          key: "couponAmount",
          align: "center"
        },
        {
          title: "好友核销数",
          key: "verifyAmount",
          align: "center"
        },
        {
          title: "邀请好友获得u贝数",
          align: "center",
          key: "inviteAward"
        },
        {
          title: "总计赚取U贝数",
          align: "center",
          key: "totalAward"
        },
        {
          title: "赚取U贝总计与邀请赚U贝差额",
          align: "center",
          key: "awardDiff"
        },
        {
          title: "差额百分比",
          align: "center",
          key: "awardDiffPer"
        }
      ],
      tableData: []
    };
  },

  methods: {
    // 关闭商户选择框
    cancel() {
      this.closeDialog();
    },
    closeDialog() {
      //关闭对话框清除表单数据 SuperMarket
      // this.$refs.formValidate.resetFields();
      console.log("closeDialog showModelMoney");
      this.$emit(`update:showModelMoney`, false);
    }
  },
  mounted() {
    this.tableData = this.moneyData;
  }
};
</script>

<style scoped>
.form > div {
  display: inline-block;
}
</style>

<style lang="less">
.supermarket-list-box {
  /*调整table cell间隔和行高*/
  .ivu-table-cell {
    padding-left: 1px;
    padding-right: 1px;
  }
  .ivu-table-small td {
    height: 30px;
  }
}
</style>
