<template>
  <div class="bussiness-list-box">
    <Modal
      v-model="isShow"
      title="商户列表"
      width="900"
      footer-hide
      :closable="true"
      :mask-closable="false"
      @on-cancel="closeDialog"
      :styles="{top: '20px'}"
    >
      <div>
        <row>
          <Form ref="searchItem" :model="searchData" inline :label-width="70" class="search-form">
            <FormItem label="商户编号">
              <Input
                type="text"
                v-model="searchData.merchantId"
                clearable
                placeholder="请输入商户编号"
                style="width: 150px"
              />
            </FormItem>
            <FormItem label="商户名称">
              <Input
                type="text"
                v-model="searchData.merchantName"
                clearable
                placeholder="请输入商户名称"
                style="width: 150px"
              />
            </FormItem>
            <FormItem style label="所在地区">
              <Select
                v-model="searchData.provinceCode"
                style="width:150px"
                clearable
                @on-change="getcitylist"
              >
                <Option
                  v-for="(item,index) in provincelist"
                  :key="index"
                  :value="item.provinceCode"
                >{{item.provinceName}}</Option>
              </Select>
              <Select
                v-model="searchData.cityCode"
                style="width:150px"
                clearable
                @on-change="getarealist"
              >
                <Option
                  v-for="(item,index) in citylist"
                  :key="index"
                  :value="item.cityCode"
                >{{item.cityName}}</Option>
              </Select>
              <Select v-model="searchData.areaId" style="width:150px" clearable>
                <Option
                  v-for="(item,index) in arealist"
                  :key="index"
                  :value="item.areaCode"
                >{{item.areaName}}</Option>
              </Select>
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
          ref="refTable"
          size="small"
          :columns="tableColumns"
          :data="tableData"
          :loading="tableLoading"
          class="bussiness-list"
        ></Table>
        <Row type="flex" justify="end" class="page">
          <Page
            :total="totalSize"
            show-total
            show-elevator
            @on-change="changeCurrent"
            style="float: right"
            :current.sync="current"
          ></Page>
          <div></div>
          <Page
            show-total
            show-elevator
            :current="page.pageNum"
            :page-size="page.pageSize"
            :total="page.total"
            @on-change="changeCurrent"
          ></Page>
        </Row>
      </div>

      <Row style="margin-left:350px; margin-top: 30px">
        <Button style="margin-right: 20px" @click="cancel">取消</Button>
        <Button type="primary" @click="selectMerchant">确定</Button>
      </Row>
    </Modal>
  </div>
</template>
<script>
import { getMerchantList, addStaff, editStaff } from "@/api/sys";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  uploadFileRequest
} from "@/libs/axios";
import { uniqueArray } from "@/libs/date";

export default {
  name: "business-list",
  data() {
    return {
      isShow: true,
      //选中的数据
      choice: {
        id: "",
        name: "",
        row: {}
      },
      provincelist: [],
      citylist: [],
      arealist: [],
      tableColumns: [
        {
          title: "选择",
          key: "merchantId",
          width: 70,
          align: "center",
          render: (h, params) => {
            // params: {index, column, row;}
            const { merchantId: id, merchantName: name } = params.row;
            params.row.id = id;
            params.row.name = name;
            let flag = false;
            if (this.choice.id == id) {
              flag = true;
            } else {
              flag = false;
            }
            return (
              <div>
                <Radio
                  value={flag}
                  onOn-change={checked => {
                    this.choice = {
                      merchantType: 0,
                      id,
                      name,
                      row: params.row
                    };
                  }}
                ></Radio>
              </div>
            );
          }
        },
        {
          title: "商户编号",
          align: "center",
          minWidth: 130,
          key: "merchantId"
        },
        {
          title: "商户名称",
          align: "center",
          width: 230,
          key: "merchantName"
        },
        {
          title: "所属地区",
          align: "center",
          width: 340,
          key: "address",
          render: (h, params) => {
            let { provinceName, cityName } = params.row;
            return <span>{`${provinceName}${cityName}`}</span>;
          }
        }
      ],
      searchData: {
        type: 0,
        merchantId: "",
        merchantName: "",
        provinceCode: "",
        cityCode: "",
        areaId: ""
      },
      page: {
        pageNum: 1, //页码
        pageSize: 10, //每页数量
        total: 0 //数据总数
      },
      tableLoading: false,
      tableData: [],
      current: 1,
      totalSize: 0, //总条数
      pageNum: 1 //开始条数
    };
  },

  methods: {
    //获取省份信息数据
    getprovincelist() {
      const url = "/system/area/province/list";
      postRequest(url).then(res => {
        if (res.code == 200) {
          this.provincelist = res.data;
        } else {
          this.msgErr(res.msg);
        }
      });
    },
    //根据省份code获取城市信息数据
    getcitylist() {
      const url = "/system/area/city/" + this.searchData.provinceCode;
      getRequest(url).then(res => {
        if (res.code == 200) {
          this.citylist = res.data;
          this.searchData.areaId = "";
        } else {
          this.msgErr(res.msg);
        }
      });
    },
    //根据城市code获取区县信息数据
    getarealist() {
      const url = "/system/area/district/" + this.searchData.cityCode;
      getRequest(url).then(res => {
        if (res.code == 200) {
          this.arealist = res.data;
        } else {
          this.msgErr(res.msg);
        }
      });
    },
    // 关闭商户选择框
    cancel() {
      this.closeDialog();
    },
    search() {
      this.queryTableData();
    },
    // 分页（点击第几页）
    changeCurrent(pageNum) {
      this.queryTableData(pageNum);
    },
    // 获取商户列表
    async queryTableData(pageNum) {
      this.page.pageNum = pageNum || 1;
      this.tableLoading = true;

      // 获取成功开户的商户信息,type=0 商户;type = 1 品牌
      const url = "/trade/merchant/fund/account/basic/success";

      let {
        code,
        data: { records, current, total, size }
      } = await postRequest(url, {
        ...this.searchData,
        ...this.page
      });
      if (code == 200) {
        this.totalSize = total;
        this.tableData = records;
        this.page.pageNum = current; //分页查询起始记录
        this.page.total = total; //列表总数
        this.page.pageSize = size; //每页数据
      } else {
        this.msgErr(res.msg);
      }
      this.tableLoading = false;
    },
    closeDialog() {
      //关闭对话框清除表单数据
      // this.$refs.formValidate.resetFields();
      console.log("closeDialog showBusinessList");
      this.$emit(`update:showBusinessList`, false);
    },
    //确定选择商户
    selectMerchant() {
      if (this.choice.id) {
        this.$emit("seclectedTr-event", this.choice);
        this.closeDialog();
      } else {
        this.msgErr("至少选一个商户");
      }
    },
    //重置搜索条件
    reset() {
      // 重置查询参数
      this.searchData = {
        type: 0,
        merchantId: "",
        merchantName: "",
        provinceCode: "",
        cityCode: "",
        areaId: ""
      };
      this.page = {
        pageNum: 1, //页码
        pageSize: 10, //每页数量
        total: 0 //数据总数
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
  },
  mounted() {
    this.queryTableData();
    this.getprovincelist();
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
