
<template>
  <div class="search">
    <Row v-if="!merchantEditPage && !merchantCouponPage  && !merchantStaffPage">
      <Col>
        <Card>
          <Row>
            <Form ref="searchItem" :model="searchItem" inline :label-width="70" class="search-form">
              <FormItem label="商户名称：" :label-width="80">
                <Input
                  type="text"
                  v-model="searchItem.name"
                  clearable
                  placeholder="请输入商户名称"
                  style="width: 200px"
                />
              </FormItem>

              <FormItem label="标签：">
                <Select v-model="searchItem.isTag" style="width:120px" clearable>
                  <Option v-for="(v,k) in tagOptions" :value="k" :key="k">{{ v }}</Option>
                </Select>
              </FormItem>

              <FormItem label="关联商超名称：" :label-width="120">
                <Input
                  type="text"
                  v-model="searchItem.superMarketingName"
                  clearable
                  placeholder="请输入关联商超名称"
                  style="width: 200px"
                />
              </FormItem>

              <FormItem :label-width="0">
                <span>所在地区：</span>
                <Select
                  v-model="searchItem.provinceId"
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
                  v-model="searchItem.cityId"
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
                <Select v-model="searchItem.areaId" style="width:150px" clearable>
                  <Option
                    v-for="(item,index) in arealist"
                    :key="index"
                    :value="item.areaCode"
                  >{{item.areaName}}</Option>
                </Select>
              </FormItem>
              <FormItem style="margin-left:-35px;" class="br">
                <Button @click="queryTableList" type="primary" icon="ios-search">搜索</Button>
                <Button @click="refresh">重置</Button>
                <!-- <a class="drop-down" @click="dropDown">
                  {{dropDownContent}}
                  <Icon :type="dropDownIcon"></Icon>
                </a>-->
              </FormItem>
            </Form>
          </Row>
        </Card>
        <Card>
          <Row class="operation">
            <Button type="primary" icon="md-add" @click="addInfo()">新增</Button>
            <Button @click="updateTableList" icon="md-refresh">刷新</Button>
            <!-- 排序导入  排序导出 -->
            <Button type="success" class="marginLeft20" @click="upload">排序导入</Button>
            <Button type="success" class="marginLeft20" @click="download">排序导出</Button>
          </Row>

          <Row>
            <Table
              :loading="TableLoading"
              border
              :columns="tableColumns"
              :data="table_list"
              sortable="custom"
              ref="table"
            >
              <!--     商户名称 name 新店 isNew -->

              <template slot-scope="{ row }" slot="name">
                <!-- style="width:74px;height:43px;" -->
                <img v-if="row.isNew==1" style="width:40px;" src="/images/newShop.png" />
                {{row.name}}
              </template>
              <template
                slot-scope="{ row }"
                slot="address"
              >{{row.province}} {{row.city}} {{row.district}} {{row.address}}</template>

              <template slot-scope="{ row }" slot="logoImg">
                <img :src="row.logoImg" style="width:74px;height:43px;" @click="showBigImg(row)" />
              </template>

              <template slot-scope="{ row }" slot="operate">
                <Button type="text" size="small" style="color:#2db7f5" @click="editInfo(row)">编辑</Button>
                <Button type="text" size="small" style="color:#ed4014" @click="copyInfo(row)">复制</Button>
                <Button type="text" size="small" style="color:#2db7f5" @click="setTag(row)">打标签</Button>
              </template>
            </Table>
          </Row>
          <Row type="flex" justify="end" class="page">
            <Page
              :total="totalSize"
              show-total
              show-elevator
              @on-change="changeCurrent"
              style="float: right"
              :current.sync="current"
            ></Page>
          </Row>
        </Card>
      </Col>
    </Row>

    <div v-if="merchantEditPage">
      <merchantEdit @changeStatus="showMerchantEditStatus" :merchantId="merchantId"></merchantEdit>
    </div>

    <div v-if="merchantCouponPage">
      <merchantCoupon @changeStatus="showMerchantCouponStatus" :merchantId="merchantId"></merchantCoupon>
    </div>

    <div v-if="merchantStaffPage">
      <merchantStaff @changeStatus="showMerchantStaffStatus" :merchantId="merchantId"></merchantStaff>
    </div>

    <Modal v-model="bigImgDialog" title="查看大图" width="600" @on-cancel="bigImgCancel">
      <img style="width: 100%" :src="big_Image_url" />
    </Modal>

    <FileImport
      v-if="showFileImport"
      :showFileImport.sync="showFileImport"
      @refresh="queryTableData"
    ></FileImport>

    <SetTag
      v-if="showTag"
      :id="id"
      :showTag.sync="showTag"
      :tagData="tagData"
      @refresh="updateTableList"
    ></SetTag>
  </div>
</template>

<script>
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  uploadFileRequest,
  downloadSteam
} from "@/libs/axios";

import { formatDate } from "@/libs/date";
import merchantEdit from "./merchantEdit";
import merchantCoupon from "../merchant-coupon/merchantCoupon";
import merchantStaff from "../merchant-staff/merchant-staff";
import FileImport from "./FileImport";
import SetTag from "./SetTag";

export default {
  name: "merchant-information",
  components: {
    merchantEdit,
    merchantCoupon,
    merchantStaff,
    FileImport,
    SetTag
  },
  data() {
    return {
      showFileImport: false,
      //打标签 已打标签、未打标签
      showTag: false,
      tagOptions: {
        1: "已打标签",
        0: "未打标签"
      },
      tagData: [],
      merchantEditPage: false,
      merchantCouponPage: false,
      merchantStaffPage: false,
      id: "",
      merchantId: "",
      drop: false,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      searchItem: {
        name: "",
        // 是否有标签 0-未打标签 1-已打标签
        isTag: "",
        superMarketingName: "",
        provinceId: "",
        cityId: "",
        areaId: ""
      },
      current: 1,
      totalSize: 0, //总条数
      pageNum: 1, //开始条数
      limit: 10, //每页记录数
      TableLoading: false,
      table_list: [],
      self: this,
      bigImgDialog: false, //显示大图
      big_Image_url: "",
      tableColumns: [
        {
          title: "商户id",
          key: "merchantId",
          sortable: true,
          align: "center",
          minWidth: 140
        },
        {
          title: "商户名称",
          key: "name",
          align: "center",
          minWidth: 200,
          slot: "name" //新店
        },
        //        {
        //          title: "商户行业",
        //          key: "industry",
        //          align: "center",
        //          slot: "industry",
        //          minWidth: 220
        //        },
        {
          title: "商户logo信息",
          align: "center",
          minWidth: 120,
          key: "logoImg",
          slot: "logoImg"
        },
        {
          title: "主品牌",
          key: "mainBrandName",
          align: "center",
          minWidth: 120
        },
        {
          title: "主营类目",
          key: "industryName",
          align: "center",
          minWidth: 120
        },
        {
          title: "商户地址",
          key: "address",
          align: "center",
          slot: "address",
          minWidth: 220
        },
        {
          title: "营业状态",
          key: "operatingStatusName",
          align: "center",
          minWidth: 120
        },
        {
          title: "创建人",
          key: "createBy",
          align: "center",
          minWidth: 120
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          minWidth: 120
        },
        {
          title: "编辑人",
          key: "updateBy",
          align: "center",
          minWidth: 120
        },
        {
          title: "编辑时间",
          key: "updateTime",
          align: "center",
          minWidth: 120
        },
        {
          title: "操作",
          key: "action",
          fixed: "left",
          align: "center",
          slot: "operate",
          minWidth: 200
        }
      ],
      staffList: [],
      res_list: [],
      provincelist: [],
      citylist: [],
      arealist: []
    };
  },
  methods: {
    upload() {
      this.showFileImport = true;
    },
    async download() {
      const url = "/merchant/sort/excel/download";

      const res = await downloadSteam(url);

      console.log(111111111111111111, res);

      const content = res.data;
      const { filename } = res.headers;

      console.log(111111111111111111, res);
      const blob = new Blob([content], { type: "application/vnd.ms-excel" });
      const oA = document.createElement("a");
      if ("download" in oA) {
        // 非IE下载
        oA.download = decodeURI(filename);
        oA.style.display = "none";
        oA.href = URL.createObjectURL(blob);
        document.body.appendChild(oA);
        oA.click();
        URL.revokeObjectURL(oA.href); // 释放URL 对象
        document.body.removeChild(oA);
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, filename);
      }
    },
    setTag(row) {
      // merchantId
      this.id = row.merchantId;
      this.showTag = true;
      this.tagData = row.merchantTags;
    },
    init() {
      this.updateTableList();
      this.queryTableData();
      this.getprovincelist();
    },
    //获取省份信息数据
    getprovincelist() {
      postRequest("/system/area/province/list").then(res => {
        if (res.code == 200) {
          this.provincelist = res.data;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //根据省份code获取城市信息数据
    getcitylist() {
      getRequest("/system/area/city/" + this.searchItem.provinceId).then(
        res => {
          if (res.code == 200) {
            this.citylist = res.data;
            this.searchItem.areaId = "";
          } else {
            this.$Message.error(res.msg);
          }
        }
      );
    },
    //根据城市code获取区县信息数据
    getarealist() {
      getRequest("/system/area/district/" + this.searchItem.cityId).then(
        res => {
          if (res.code == 200) {
            this.arealist = res.data;
          } else {
            this.$Message.error(res.msg);
          }
        }
      );
    },

    //获取商业数据
    queryTableData() {
      const reqParams = {
        dictCode: "merchant_industry"
      };

      postRequest(
        "/system/sys-dict-data/list?pageNum=1&pageSize=30",
        reqParams
      ).then(res => {
        if (res.code == 200) {
          this.res_list = res.data.records;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    dropDown() {
      if (this.drop) {
        this.dropDownContent = "展开";
        this.dropDownIcon = "ios-arrow-down";
      } else {
        this.dropDownContent = "收起";
        this.dropDownIcon = "ios-arrow-up";
      }
      this.drop = !this.drop;
    },

    //	刷新页面
    refresh() {
      // this.updateTableList(this.params);
      this.searchItem = {
        name: "",
        // 是否有标签 0-未打标签 1-已打标签
        isTag: "",
        superMarketingName: "",
        provinceId: "",
        cityId: "",
        areaId: ""
      };
      this.updateTableList();
    },

    //搜索
    queryTableList() {
      this.current = 1;
      this.totalSize = 0; //总条数
      this.pageNum = 1; //开始条数
      this.updateTableList();
    },

    //分页
    changeCurrent(current) {
      this.pageNum = current;
      this.updateTableList();
    },

    updateTableList() {
      this.TableLoading = true;
      const reqParams = this.searchItem;
      postRequest(
        "/merchant/merchantInfo/list?pageNum=" +
          this.pageNum +
          "&pageSize=" +
          this.limit,
        reqParams
      ).then(res => {
        this.TableLoading = false;
        if (res.isSuccess) {
          this.totalSize = res.data.total;
          this.table_list = res.data.records;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },

    //新增
    addInfo() {
      this.setStore("camp_pageStatus", "add");
      this.merchantEditPage = true;
    },

    //编辑
    editInfo(item) {
      console.log(item);
      this.setStore("camp_pageStatus", "edit");
      this.merchantId = item.merchantId;
      this.merchantEditPage = true;
    },

    //复制
    copyInfo(item) {
      this.setStore("camp_pageStatus", "copy");
      this.merchantId = item.merchantId;
      this.merchantEditPage = true;
    },

    showMerchantEditStatus(e) {
      this.merchantEditPage = e;
      this.updateTableList();
    },

    merchantCouponInfo(item) {
      this.merchantId = item.merchantId;
      this.merchantCouponPage = true;
    },

    showMerchantCouponStatus(e) {
      this.merchantCouponPage = e;
      this.updateTableList();
    },

    merchantStaffInfo(item) {
      this.merchantId = item.merchantId;
      this.merchantStaffPage = true;
    },

    showMerchantStaffStatus(e) {
      this.merchantStaffPage = e;
      this.updateTableList();
    },

    // 显示大图
    showBigImg: function(row) {
      this.bigImgDialog = true;
      this.big_Image_url = row.logoImg;
    },
    bigImgCancel: function() {
      this.bigImgDialog = false;
    },

    //更改列表上下架
    changeStatus(item) {
      const self = this;

      let msg = "";
      let msg1 = "";
      let new_status = "";
      switch (item.status) {
        case 0:
          new_status = "1";
          msg = "发布成功";

          break;
        case 1:
          new_status = "-1";
          msg = "下架成功";
          msg1 = "下架后商户关联的员工和优惠券都会失效,</br>";
          break;
        case -1:
          new_status = "1";
          msg = "发布成功";
          break;
      }

      const req = {
        merchantId: item.merchantId
      };
      postRequest(
        "/merchant/merchantEmployee/list?isAsc=DESC&orderByColumn=1&pageNum=1" +
          "&pageSize=" +
          this.limit,

        req
      ).then(res => {
        this.staffList = res.data.records;
        if (this.staffList.length > 0 || item.status == 1) {
          this.$Modal.confirm({
            title: "更改状态",
            content: msg1 + `是否继续更改状态？ `,

            onOk: function() {
              const reqParams = {
                merchantId: item.merchantId,
                status: new_status
              };

              postRequest(
                "/merchant/merchantInfo/updateStatus/?merchantId=" +
                  item.merchantId +
                  "&status=" +
                  new_status,
                reqParams
              ).then(res => {
                self.loading = false;

                if (res.code == "200") {
                  self.$Message.info(msg);

                  setTimeout(() => {
                    self.updateTableList();
                  }, 3200);
                } else {
                  self.$Message.error(res.msg);
                }
              });
            },
            onCancel: () => {
              self.$Message.info("点击了取消");
            }
          });
        } else {
          this.$Modal.error({
            title: "提醒",
            content: `至少存在一个员工，才允许商户发布上线 `
          });
        }
      });
    },

    //删除

    removeInfo(item) {
      const self = this;

      this.$Modal.confirm({
        title: "删除确认",
        content: `删除后不可恢复，是否继续删除？`,
        onOk: function() {
          var req = {
            merchantId: item.merchantId
          };
          postRequest(
            "/merchant/merchantInfo/delete?merchantId=" + item.merchantId,
            req
          ).then(res => {
            self.loading = false;

            if (res.code == "200") {
              self.$Message.info("删除成功！");

              setTimeout(() => {
                self.pageNum = 1;
                self.updateTableList();
              }, 1200);
            } else {
              self.$Message.error(res.msg);
            }
          });
        },
        onCancel: () => {
          self.$Message.info("点击了取消");
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>


<style lang="less" scoped>
.operation {
  margin-bottom: 2vh;
}
.select-count {
  font-size: 13px;
  font-weight: 600;
  color: #40a9ff;
}
.select-clear {
  margin-left: 10px;
}
.page {
  margin-top: 2vh;
}
.drop-down {
  font-size: 13px;
  margin-left: 5px;
}
</style>
