<template>
  <!-- 优惠券 商户 /zex-mgr/coupon/merchant/list -->
  <div class="coupon-list-box">
    <row>
      <Form ref="searchItem" :model="searchItem" inline :label-width="100" class="search-form">
        <FormItem label="品牌编码：">
          <Input
            type="text"
            v-model="searchItem.brandCode"
            clearable
            placeholder="请输入商户名称："
            style="width: 150px"
          />
        </FormItem>
        <FormItem label="品牌名称：">
          <Input
            type="text"
            v-model="searchItem.brandName"
            clearable
            placeholder="请输入优惠券名称"
            style="width: 150px"
          />
        </FormItem>
        <FormItem style="margin-left:-35px;" class="br">
          <Button @click="search" type="primary" icon="ios-search">搜索</Button>
          <Button @click="reset">重置</Button>
        </FormItem>
      </Form>
    </row>

    <!-- 商户列表 -->
    <Table
      border
      ref="selection"
      size="small"
      :columns="tableColumns"
      :data="tableData"
      :loading="tableLoading"
      class="bussiness-list"
      @on-selection-change="handleSelectChange"
      @on-row-dblclick="handleOnRowDbclick"
    ></Table>
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

    <Row style="margin-left:350px; margin-top: 30px">
      <Button style="margin-right: 20px" @click="cancel">取消</Button>
      <Button type="primary" @click="selectMerchant">确定</Button>
    </Row>
  </div>
</template>
<script>
import { postRequest } from "@/libs/axios";

export default {
  name: "CompBrandList",
  props: {
    tab: {
      type: Object,
      default: function() {
        return {
          name: "merchant",
          couponType: 1,
          label: "商户",
          compName: "CompBrandList",
          url: "/campagin/listGoodBrand"

          //http://localhost:8088/zex-mgr/campagin/listGoodBrand?pageNum=1&pageSize=10
          // {
          //  "brandCode":"111",
          //  "brandName":"222"
          // }
        };
      }
    },
    id: {
      type: [Number, String],
      default: ""
    },
    checked: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShow: true,
      //选中的数据
      choices: [
        /*{ id: "", name: "", row: {} } */
      ],
      edit_loading: false,
      isCheckDisabled: false,
      checkResult: 0,
      tableColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        // 商户名称 省/市 优惠券名称 有效期
        {
          title: "品牌编码",
          align: "center",
          key: "brandCode"
        },
        {
          title: "品牌名称",
          align: "center",
          key: "brandName"
        }
      ],
      tableData: [],
      page: {
        pageNum: 1, //页码
        pageSize: 10, //每页数量
        total: 0 //数据总数
      },
      tableLoading: false,
      searchItem: {
        brandCode: "", //000790500001
        brandName: ""
      }
    };
  },

  methods: {
    // 确定选择商户
    selectMerchant() {
      this.choices = this.tableData.filter(item => item._checked);

      console.log(
        this.choices.map(item =>
          JSON.stringify({
            id: item.id,
            _checked: item._checked
          })
        )
      );

      this.$emit("seclectedTr-event", this.choices);
      this.closeDialog();
      // if (this.choices.length) {
      //   this.$emit("seclectedTr-event", this.choices);
      //   this.closeDialog();
      // } else {
      //   this.msgErr("至少选一项");
      // }
    },
    handleSelectChange(selection) {
      this.tableData = this.tableData.map(item => {
        item._checked = false;
        for (let i = 0; i < selection.length; i++) {
          if (item.id == selection[i].id) {
            item._checked = true;
          }
        }
        return item;
      });
      console.log(
        this.tableData.map(item =>
          JSON.stringify({
            id: item.id,
            _checked: item._checked
          })
        )
      );
    },
    handleOnRowDbclick(row, index) {
      let { brandId, _checked } = row;

      _checked = !_checked;
      row._checked = _checked;
      this.tableData.splice(index, 1, row);
      console.log(
        this.tableData.map(item =>
          JSON.stringify({
            id: item.id,
            _checked: item._checked
          })
        )
      );
    },
    // 关闭商户选择框
    cancel() {
      this.closeDialog();
    },
    search() {
      this.queryTableData();
    },
    // 获取商户列表
    queryTableData(pageNum) {
      this.page.pageNum = pageNum || 1;
      this.tableLoading = false;
      const reqParams = {
        ...this.searchItem,
        ...this.page
      };
      postRequest(this.tab.url, reqParams).then(res => {
        const {
          code,
          data: { current, total, size, records },
          msg
        } = res;

        if (code == 200) {
          this.tableData = records.map(item => {
            item._checked = false;
            for (let i = 0; i < this.checked.length; i++) {
              let r = item.id == this.checked[i];
              if (r) {
                item._checked = true;
              }
            }
            return item;
          });
          this.page.pageNum = current; //分页查询起始记录
          this.page.total = total; //列表总数
          this.page.pageSize = size; //每页数据
        } else {
          this.msgErr(msg);
        }
        this.tableLoading = false;
      });
    },
    closeDialog() {
      //关闭对话框清除表单数据
      // this.$refs.formValidate.resetFields();
      this.$emit(`closeDialog`);
    },
    reset() {
      // 重置查询参数
      this.searchItem = {
        brandCode: "",
        brandName: ""
      };

      this.page = {
        pageNum: 1, //页码
        pageSize: 10, //每页数量
        total: 0 //数据总数
      };

      this.queryTableData();
    },
    // 分页（点击第几页）
    changeCurrent(page) {
      this.queryTableData(page);
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
  },
  mounted() {
    this.queryTableData();
  }
};
</script>

<style scoped>
.form > div {
  display: inline-block;
}
</style>

<style lang="less">
.bussiness-list-box {
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
