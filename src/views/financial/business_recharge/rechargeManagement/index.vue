<template>
  <div class="xxx">
    <!-- <h2 class="header">财务中心 > 商户账务 > 商户预充值</h2> -->
    <div class="query-row">
      <Card :bordered="false" style="margin-bottom:2px">
        <Form inline>
          <!-- 商户/品牌名称 -->
          <FormItem label="商户/品牌/商超/零售商名称：" :label-width="185">
            <Input
              style="width:200px"
              type="text"
              v-model="searchData.merchantName"
              placeholder="请输入"
            ></Input>
          </FormItem>

          <FormItem label="审核状态：" :label-width="80">
            <Select v-model="searchData.status" style="width:100px">
              <Option v-for="(v,k) in statusOption" :value="k" :key="v">{{ v }}</Option>
            </Select>
          </FormItem>

          <FormItem label="创建时间：" :label-width="80">
            <DatePicker
              type="daterange"
              placeholder="请选择日期"
              style="display:inline-block;width: 200px"
              :value="daterange"
              @on-change="changeStartDate"
            ></DatePicker>
          </FormItem>

          <FormItem :label-width="0">
            <Button type="primary" icon="ios-search" @click="queryTableData()">搜索</Button>
            <Button icon="md-refresh" class="marginLeft20" @click="reset">重置</Button>
          </FormItem>
        </Form>
        <Row type="flex" justify="start">
          <Button type="dashed" icon="md-arrow-round-back" @click="goback">返回列表</Button>
          <Button icon="md-refresh" class="marginLeft20" @click="refresh">刷新</Button>
          <Button type="primary" class="marginLeft20" @click="showRecharge=true">充值</Button>
          <Button type="primary" class="marginLeft20" @click="showDeduction=true">扣款</Button>
        </Row>
      </Card>
    </div>
    <Card :bordered="false">
      <Table border :show-index="true" :loading="loading" :columns="columns" :data="tableData">
        <template slot-scope="{ row }" slot="action">
          <Button type="text" size="small" @click="detail(row.id)">查看</Button>
        </template>
      </Table>
      <!-- 分页器 -->
      <Row type="flex" justify="end" class="page">
        <!-- show-total 显示总数 共{{ total }}条 -->
        <!-- show-elevator 显示电梯，可以快速切换到某一页  跳至 xx 页-->
        <Page
          show-total
          show-elevator
          :current="page.pageNum"
          :page-size="page.pageSize"
          :total="page.total"
          @on-change="changeCurrent"
        ></Page>
      </Row>
    </Card>

    <!-- @on-close="closeDialog" -->
    <Drawer
      v-model="showRecharge"
      :closable="true"
      :mask-closable="false"
      width="820"
      :styles="styles"
    >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>充值信息</span>
      </p>
      <Recharge v-if="showRecharge" :showRecharge.sync="showRecharge" @refresh="queryTableData"></Recharge>
    </Drawer>

    <Drawer
      v-model="showDeduction"
      :closable="true"
      :mask-closable="false"
      width="820"
      :styles="styles"
    >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>扣款信息</span>
      </p>
      <Deduction v-if="showDeduction" :showDeduction.sync="showDeduction" @refresh="queryTableData"></Deduction>
    </Drawer>

    <Drawer
      v-model="showDetail"
      :closable="true"
      :mask-closable="true"
      width="820"
      :styles="styles"
    >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>{{detailTitle}}</span>
      </p>
      <Detail v-if="showDetail" :showDetail.sync="showDetail" :detailData="detailData"></Detail>
    </Drawer>

    <!-- 
    <Recharge v-if="showRecharge" :showRecharge.sync="showRecharge" @refresh="queryTableData"></Recharge>
    <Deduction v-if="showDeduction" :showDeduction.sync="showDeduction" @refresh="queryTableData"></Deduction>-->
  </div>
</template>
<script>
import { queryRechargeMList, queyMoneyDetailById } from "@/api/sys";
import { division100, rechargeMColumns as columns } from "../columns";

import Recharge from "./Recharge";
import Deduction from "./Deduction";
import Detail from "./Detail";

import createTypeDate from "./typeData";
const typeData = createTypeDate();

export default {
  name: "recharge-management",
  components: {
    Recharge,
    Deduction,
    Detail
  },
  watch: {},
  data() {
    return {
      showRecharge: false,
      showDeduction: false,
      showDetail: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      // 状态： 全部 、 待审核 、 已通过 、 审核失败 ；默认全部
      // '审核状态 0-待审核 1-审核通过 2-审核失败',
      statusOption: {
        "": "全部",
        "0": "待审核",
        "1": "已通过",
        "2": "审核失败"
      },
      daterange: [],
      // 查询参数
      searchData: {
        merchantName: "", //商户名称
        // status: 0, //状态
        status: "", //状态
        gmtCreateStart: "", //开始时间
        gmtCreateEnd: "" //结束时间
      },
      loading: false, //列表加载动画
      page: {
        pageNum: 1, //页码
        pageSize: 10, //每页数量
        total: 0 //数据总数
      },
      columns,
      tableData: [],
      detailTitle: "充值信息", //充值信息 扣款信息
      detailData: {} //查看详情
    };
  },
  created() {
    this.queryTableData();
  },
  methods: {
    async detail(id) {
      // id = 14;
      const { code, data, msg } = await queyMoneyDetailById(id);
      if (code == 200) {
        const {
          merchantType: type, //0/1/2/3
          merchantName,
          brandName,
          changeType,
          // 充值
          receivables,
          merchantMoneyChargesRecords: arr,
          // 扣款
          anticipatedDeduction,
          actualDeduction
        } = data;

        let { label, desc } = typeData[`type${type}`];
        data.businessTypeLabel = label;
        data.merchantTypeName = desc;
        if (type == 0) {
          data.businessName = merchantName;
        } else {
          data.businessName = brandName;
        }

        this.detailTitle = changeType == 0 ? "充值信息" : "扣款信息";

        if (changeType == 0) {
          // 应收款:回显的时候除以100
          data.receivables = division100(receivables);

          data.merchantMoneyChargesRecords = arr.map(it => {
            // 实际收款金额
            it.actualAmount = division100(it.actualAmount);
            return it;
          });
        } else {
          // 应扣款 anticipatedDeduction  实扣款 actualDeduction
          data.anticipatedDeduction = division100(anticipatedDeduction);
          data.actualDeduction = division100(actualDeduction);
        }

        this.detailData = data;
        this.showDetail = true;
      } else {
        this.msgErr(msg);
      }
    },
    goback() {
      this.$store.dispatch("financial/changeCompName", "business-recharge");
    },
    linkTo(compName, data) {},
    changeComp(compName) {
      // this.$emit("changeComp", compName);
      this.$store.dispatch("financial/changeCompName", compName);
    },
    changeStartDate(arr) {
      // yyyy-MM-dd
      this.searchData.gmtCreateStart = `${arr[0]} 00:00:00`;
      this.searchData.gmtCreateEnd = `${arr[1]} 23:59:59`;
    },

    // 刷新搜索
    refresh() {
      this.queryTableData(this.page.pageNum);
    },
    // 分页（点击第几页）
    changeCurrent(pageNum) {
      this.queryTableData(pageNum);
    },
    // 查询
    async queryTableData(pageNum) {
      this.page.pageNum = pageNum || 1;
      this.loading = true;

      let {
        code,
        data: { records, current, total, size }
      } = await queryRechargeMList({
        ...this.searchData,
        ...this.page
      });
      if (code == 200) {
        this.tableData = records.map(item => {
          const arr = ["beforeAmount", "changeAmount", "afterAmount"];
          arr.forEach(name => {
            item[name] = division100(item[name]);
          });

          item.statusName = this.statusOption[item.status];
          item.changeTypeName = item.changeType == 0 ? "充值" : "扣款";
          /**
              merchantType:
                0 merchantName
                1 brandName
            */
          if (item.merchantType == 0) {
            item.name = item.merchantName;
          } else {
            item.name = item.brandName;
          }

          // beforeAmount > afterAmount  => -changeAmount
          if (item.beforeAmount > item.afterAmount) {
            item.changeAmount = -item.changeAmount;
          }

          return item;
        });

        this.page.pageNum = current; //分页查询起始记录
        this.page.total = total; //列表总数
        this.page.pageSize = size; //每页数据
      } else {
        this.$Message.error(code + " 数据加载失败!", 3);
      }
      this.loading = false;
    },
    reset() {
      this.daterange = [];
      // 重置查询参数
      this.searchData = {
        merchantName: "", //商户名称
        // status: 0, //状态
        status: "", //状态
        gmtCreateStart: "", //开始时间
        gmtCreateEnd: "" //结束时间
      };

      this.page = {
        pageNum: 1, //页码
        pageSize: 10 //每页数量
      };

      //重新查询一遍
      this.queryTableData();
    },
    // 全局提示
    msgOk(txt) {
      this.$Message.info({
        content: txt,
        duration: 3
      });
    },
    msgErr(txt) {
      this.$Message.error({
        content: txt,
        duration: 3
      });
    }
  }
};
</script>
<style scoped>
.underline {
  text-decoration: underline;
}
.table-box {
  min-height: 100px;
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
}
.marginLeft20 {
  margin-left: 20px;
}
</style>