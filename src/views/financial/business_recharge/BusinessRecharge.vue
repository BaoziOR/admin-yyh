<template>
  <div class="xxx">
    <!-- <h2 class="header">财务中心 > 商户账务 > 商户预充值</h2> -->
    <div class="query-row">
      <Card :bordered="false" style="margin-bottom:2px">
        <Form inline>
          <FormItem label="商户类型：" :label-width="80">
            <Select v-model="searchData.merchantType" style="width:150px" clearable>
              <Option
                v-for="item in merchantTypeOption"
                :value="item.value"
                :key="item.value+item.label"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>

          <FormItem label="商户/品牌/商超/零售商名称：" :label-width="185">
            <Input
              style="width:200px"
              type="text"
              v-model="searchData.merchantName"
              placeholder="请输入"
            ></Input>
          </FormItem>

          <FormItem :label-width="0">
            <Button type="primary" icon="ios-search" @click="queryTableData()">搜索</Button>
            <Button icon="md-refresh" class="marginLeft20" @click="reset">重置</Button>
          </FormItem>
        </Form>
        <Row type="flex" justify="start">
          <Button icon="md-refresh" class="marginLeft20" @click="refresh">刷新</Button>
          <Button
            type="success"
            class="marginLeft20"
            @click="changeComp('recharge-management')"
          >充值管理</Button>
          <Button type="success" class="marginLeft20" @click="changeComp('ubay-management')">U贝管理</Button>
        </Row>
      </Card>
    </div>
    <Card :bordered="false">
      <Table border :show-index="true" :loading="loading" :columns="columns" :data="tableData">
        <template slot-scope="{ row }" slot="action">
          <!-- @click="inputUnbinding(row)" -->
          <Button type="text" size="small" @click="linkTo('funds-details',row)">资金明细</Button>
          <Button type="text" size="small" @click="linkTo('ubay-details',row)">U贝明细</Button>
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
  </div>
</template>
<script>
import { postRequest } from "@/libs/axios";
import { queryBusinessRechargeList } from "@/api/sys";
import columns, { division100 } from "./columns";

export default {
  name: "business-recharge",
  inject: ["merchantTypeOption", "getMoneyAndUbay", "msgOk", "msgErr"],
  data() {
    return {
      id: "",
      // 查询参数
      searchData: {
        merchantType: "", //商户类型
        merchantName: "" //商户名称
      },
      loading: false, //列表加载动画
      page: {
        pageNum: 1, //页码
        pageSize: 10, //每页数量
        total: 0 //数据总数
      },
      columns,
      tableData: []
    };
  },
  created() {
    // console.log("getMoneyAndUbay", this.getMoneyAndUbay);
    // console.log("okkk", this.msgOk);

    this.queryTableData();
  },
  methods: {
    handleChange(value, selectedData) {
      console.log("handleChange:", value, selectedData);
    },
    linkTo(compName, data) {
      let { merchantType } = this.searchData;
      let { id: acountId, merchantId, name: merchantName } = data;
      this.$store.dispatch("financial/showRechargeDetail", {
        compName,
        acountId,
        merchantId,
        merchantName
      });
    },
    changeComp(compName) {
      // this.$emit("changeComp", compName);
      this.$store.dispatch("financial/changeCompName", compName);
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

      const {
        code,
        data: { current, total, size, records },
        msg
      } = await queryBusinessRechargeList({
        ...this.searchData,
        ...this.page
      });
      if (code == 200) {
        // merchantTypeName
        this.tableData = records.map(item => {
          let merchantType = item.merchantType;
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

          this.merchantTypeOption.some(({ value, label }) => {
            let r = merchantType === value;
            if (r) {
              item.merchantTypeName = label;
            }
            return r;
          });

          // /100
          const arr = ["money"];
          arr.forEach(name => {
            item[name] = division100(item[name]);
          });

          return item;
        });
        this.page.pageNum = current; //分页查询起始记录
        this.page.total = total; //列表总数
        this.page.pageSize = size; //每页数据
        this.loading = false;
      } else {
        this.$Message.error(code + " 数据加载失败!", 3);
      }
      this.loading = false;
    },
    reset() {
      // 重置查询参数
      this.searchData = {
        merchantType: "", //商户类型
        merchantName: "" //商户名称
      };

      this.page = {
        pageNum: 1, //页码
        pageSize: 10, //每页数量
        total: 0 //数据总数
      };

      //重新查询一遍
      this.queryTableData();
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