<template>
  <div class="label_manage">
    <Card>
      <Form ref="searchForm" :model="searchForm" inline :label-width="70" class="search-form">
        <Form-item label="省/市" prop="status">
          <Select
            v-model="searchForm.provinceCode"
            placeholder="请选择省"
            style="width:100px"
            @on-change="proviceChange($event)"
          >
            <Option v-for="item in proviceSelect" :value="item.provinceCode" :key="item.provinceCode">{{
              item.provinceName
            }}</Option>
          </Select>
          /
          <Select v-model="searchForm.cityCode" placeholder="请选择市" style="width:100px">
            <Option v-for="item in citySelect" :value="item.cityCode" :key="item.cityCode">{{ item.cityName }}</Option>
          </Select>
        </Form-item>

        <FormItem label="有效期" prop="settleTime">
          <DatePicker
            transfer
            type="daterange"
            placeholder="请选择有效期"
            @on-change="[searchForm.beginTime, searchForm.endTime] = $event"
            v-model="searchForm.time"
            style="width: 200px"
          >
          </DatePicker>
        </FormItem>

        <Form-item label="状态" prop="status">
          <Select v-model="searchForm.status" placeholder="请选择状态" clearable style="width: 150px;">
            <Option :value="-1">全部</Option>
            <Option :value="0">待发布</Option>
            <Option :value="1">进行中</Option>
            <Option :value="2">已终止</Option>
            <Option :value="3">已结束</Option>
          </Select>
        </Form-item>

        <Form-item class="br">
          <Button @click="search" type="primary" icon="ios-search">搜索</Button>
          <Button @click="resetForm('searchForm')">重置</Button>
        </Form-item>
      </Form>
    </Card>
    <Card style="margin-top: 1vh;">
      <Row class="operation">
        <Button type="primary" icon="md-add" @click="addManualDisplayFn">新增</Button>
      </Row>

      <!-- 用户列表 -->
      <Table :loading="TableLoading" border :columns="tableColumns" :data="table_list" sortable="custom" ref="table">
        <template slot-scope="{ row }" slot="operate">
          <ButtonGroup>
            <!-- 0-待发布、1-进行中、2-已终止、3-已结束 -->
            <Button size="small" @click="viewCouponDetailFn(row)">查看</Button>
            <!-- 只有为"待发布、进行中"的状态，才显示"编辑"按钮。 -->
            <Button
              size="small"
              type="success"
              :disabled="!(row.status == 0 || row.status == 1)"
              @click="recommendCouponDetailFn(row)"
              >编辑</Button
            >
            <!-- 只有为"进行中"的状态，才显示"终止"按钮。 -->
            <Button size="small" type="info" :disabled="row.status != 1" @click="recommendCouponStopFn(row)"
              >终止</Button
            >
            <!-- 只有为"待发布"的状态，才显示"删除"按钮。 -->
            <Button size="small" type="error" :disabled="row.status != 0" @click="recommendCouponDelFn(row)"
              >删除</Button
            >
          </ButtonGroup>
        </template>
        <template slot-scope="{ row }" slot="province">
          <p>{{ row.provinceName }}/{{ row.cityName }}</p>
        </template>
        <template slot-scope="{ row }" slot="time">
          <p>{{ row.beginTime }}--{{ row.endTime }}</p>
        </template>
      </Table>
      <!-- 用户列表 -->
      <!-- 分页 -->
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
      <!-- 分页 -->
    </Card>

    <Modal v-model="modalAddShow" title="推荐券" :mask-closable="false" @on-cancel="modalAddShow = false">
      <Form :model="modalAddData" ref="modalAddForm2" :label-width="70" class="search-form" :rules="modalAddValidate">
        <Form-item label="推荐城市" required>
          <Select
            v-model="modalAddData.provinceCode"
            placeholder="请选择省"
            style="width:100px"
            :disabled="modalAddData.status == 1"
            @on-change="
              proviceChange($event);
              couponList = [];
            "
          >
            <Option v-for="item in proviceSelect" :value="item.provinceCode" :key="item.provinceCode">{{
              item.provinceName
            }}</Option>
          </Select>
          /
          <Select
            v-model="modalAddData.cityCode"
            :disabled="modalAddData.status == 1"
            placeholder="请选择市"
            style="width:100px"
          >
            <Option v-for="item in citySelect" :value="item.cityCode" :key="item.cityCode">{{ item.cityName }}</Option>
          </Select>
          <span style="color:#999;margin-left:1vh;">改变推荐城市优惠券将清空</span>
        </Form-item>

        <Form-item label="有效期" prop="time">
          <DatePicker
            transfer
            type="daterange"
            placeholder="请选择有效期"
            @on-change="[modalAddData.beginTime, modalAddData.endTime] = $event"
            v-model="modalAddData.time"
            :disabled="modalAddData.status == 1"
            :options="options1"
            style="width: 200px"
          >
          </DatePicker>
        </Form-item>
        <Form-item label="优惠券" required>
          <Row
            ><Button @click="showCouponListAdd">添加</Button>
            <span style="color:#999;margin-left:1vh;">拖动调整顺序</span></Row
          >
          <CompSortDrag :list="couponList">
            <template v-for="(item, index) in couponList">
              <Row :key="index"
                ><Tag closable @on-close="couponListRemove(index)">{{ item.name }}</Tag></Row
              >
            </template>
          </CompSortDrag>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modalAddShow = false">取消</Button>
        <Button type="primary" :loading="modalAddBtnShow" @click="modalAddOk('modalAddForm2')">保存</Button>
      </div>
    </Modal>

    <Modal v-model="modalEditShow" title="查看优惠券" :mask-closable="false" @on-cancel="modalEditShow = false">
      <Form :label-width="80" class="search-form">
        <Form-item label="推荐城市：">
          <p>{{ merchantData.provinceName }} > {{ merchantData.cityName }}</p>
        </Form-item>
        <Form-item label="有效期：">
          <p>{{ merchantData.beginTime }} -- {{ merchantData.endTime }}</p>
        </Form-item>
        <Form-item label="优惠券：">
          <p v-for="(item, index) in merchantData.coupons" :key="index">
            {{ item.couponName }}（ID：{{ item.couponId }} | 库存：{{ item.couponSurplusStock || 0 }}）
          </p>
        </Form-item>
        <Form-item label="状态：">
          <p>{{ merchantData.statusDesc }}</p>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modalEditShow = false">取消</Button>
      </div>
    </Modal>

    <CouponList
      v-if="showCouponList"
      :showCouponList.sync="showCouponList"
      :searchForm="searchForm2"
      @seclectedTr-event="selectedCouponItem"
    ></CouponList>
  </div>
</template>
<script>
import {
  settleBillDownload,
  settleBillRegen,
  settleBillDelete,
  settleBillList,
  settleBillSave,
  settleBillApply,
} from "@/api/financial";

import * as cms from "@/api/cms";

import CouponList from "./components/CouponList";
import CompSortDrag from "@/components/CompSortDrag";

const columns = [
  {
    title: "操作",
    width: 220,
    align: "center",
    fixed: "left",
    slot: "operate",
  },
  {
    title: "省/市",
    width: 140,
    align: "center",
    key: "province",
    slot: "province",
  },
  {
    title: "有效期",
    align: "center",
    key: "time",
    width: 220,
    slot: "time",
  },
  {
    title: "状态",
    align: "center",
    key: "statusDesc",
  },
  {
    title: "创建人",
    width: 100,
    align: "center",
    key: "createBy",
  },
  {
    title: "创建时间",
    align: "right",
    width: 190,
    key: "gmtCreate",
  },
];

export default {
  components: { CouponList, CompSortDrag },
  data() {
    return {
      searchForm: {
        pageNum: 1,
        pageSize: 10,
        status: -1,
        beginTime: "",
        endTime: "",
        time: "",
        provinceCode: "",
        cityCode: "",
      },
      searchForm2: {}, // CMS

      current: 1,
      totalSize: 1, //总条数
      // pageNum: 1, //开始条数
      TableLoading: false,
      table_list: [],
      tableColumns: columns,

      loading: false,
      modalAddShow: false,
      modalAddBtnShow: false,
      modalAddData: {},
      modalAddValidate: {
        time: {
          required: true,
          message: "有效期不能为空",
          validator: (rule, value, callback) => {
            if (value) {
              callback();
            } else {
              callback(new Error("请选择有效期"));
            }
          },
        },
      },
      merchantData: {},

      proviceSelect: [],
      citySelect: [],
      showCouponList: false,
      couponList: [],

      modalEditShow: false,
      options1: {
        disabledDate(date) {
          return date.valueOf() < Date.now() - 1000 * 60 * 60 * 24;
        },
      },
    };
  },
  mounted() {
    this.getList();
    cms.filterProvince().then(res => {
      if (res.isSuccess) {
        this.proviceSelect = res.data;
      }
    });
  },
  methods: {
    search() {
      this.searchForm.pageNum = 1;
      this.getList();
    },
    getList() {
      this.TableLoading = true;
      let body = {
        ...this.searchForm,
      };
      delete body.time;
      cms.recommendCouponList(body).then(res => {
        this.TableLoading = false;
        if (res && res.code == 200) {
          this.table_list = res.data.records;
          this.totalSize = res.data.total;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    changeCurrent(current) {
      this.searchForm.pageNum = current;
      this.getList();
    },
    // 重置form表单
    resetForm(name) {
      this.$refs[name].resetFields();
      this.searchForm.status = -1;
      this.searchForm.cityCode = "";
      this.searchForm.provinceCode = "";
      this.searchForm.time = [];
      this.searchForm.beginTime = "";
      this.searchForm.endTime = "";
      if (name == "searchForm") {
        this.search();
      }
    },
    //手动添加结算清单
    addManualDisplayFn() {
      this.modalAddData = {};
      this.couponList = [];
      this.$refs["modalAddForm2"].resetFields();
      this.modalAddShow = true;
    },
    modalAddOk(name) {
      this.$refs[name].validate(valid => {
        if (!valid) return;

        let body = JSON.parse(JSON.stringify(this.modalAddData));
        delete body.time;

        if (!body.provinceCode || !body.cityCode) {
          this.$Message.error("请选择省市！");
          return;
        }

        if (this.couponList.length == 0) {
          this.$Message.error("请选择优惠券！");
          return;
        }

        body.coupons = this.couponList.map((item, index, list) => {
          return {
            couponId: item.id,
            rankNum: list.length - index,
            couponName: item.name,
            shareId: item.row.shareId,
          };
        });

        this.modalAddBtnShow = true;

        cms.recommendCouponSave(body).then(res => {
          this.modalAddBtnShow = false;
          if (res && res.code == 200) {
            this.$Message.success(body.id ? "编辑成功！" : "新增成功！");
            this.modalAddShow = false;
            this.search();
          } else {
            this.$Message.error(res.msg);
          }
        });
      });
    },
    recommendCouponStopFn(item) {
      this.$Modal.confirm({
        title: "终止",
        content: "<p>您确定要终止该记录吗？</p>",
        onOk: () => {
          cms.recommendCouponStop({ id: item.id }).then(res => {
            if (res && res.code == 200) {
              this.$Message.success("终止成功！");
              this.search();
            } else {
              this.$Message.error(res.msg);
            }
          });
        },
        onCancel: () => {},
      });
    },
    recommendCouponDelFn(item) {
      this.$Modal.confirm({
        title: "删除",
        content: "<p>您确定要删除该记录吗？</p>",
        onOk: () => {
          cms.recommendCouponDel({ id: item.id }).then(res => {
            if (res && res.code == 200) {
              this.$Message.success("删除成功！");
              this.search();
            } else {
              this.$Message.error(res.msg);
            }
          });
        },
        onCancel: () => {},
      });
    },
    recommendCouponDetailFn(item) {
      this.modalAddData = {};
      cms.recommendCouponDetail({ id: item.id }).then(res => {
        if (res && res.code == 200) {
          this.modalAddData = res.data;
          this.modalAddData.time = [res.data.beginTime, res.data.endTime];
          this.couponList = res.data.coupons.map(item => {
            return {
              couponId: item.couponId,
              id: item.couponId,
              name: item.couponName,
              row: { shareId: item.shareId },
            };
          });
          this.modalAddShow = true;
          this.proviceChange(res.data.provinceCode);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    viewCouponDetailFn(item) {
      cms.recommendCouponDetail({ id: item.id }).then(res => {
        if (res && res.code == 200) {
          this.merchantData = res.data;
          this.modalEditShow = true;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    proviceChange(provinceCode) {
      if (!provinceCode) return;
      this.searchForm.city = "";
      // cms.cityByProvinceCode(provinceCode).then(res => {
      //   if (res.isSuccess) {
      //     this.citySelect = res.data;
      //   }
      // });
      cms.filterCityByProvince(provinceCode).then(res => {
        if (res.isSuccess) {
          this.citySelect = res.data;
        }
      });
    },
    selectedCouponItem(data) {
      if (this.couponList.filter(item => item.shareId == data.shareId).length > 0) {
        this.$Message.error("优惠券有重复，请重新选择");
        return;
      }
      this.couponList.push(data);
    },
    couponListRemove(index) {
      this.couponList.splice(index, 1);
    },
    //添加优惠券判断
    showCouponListAdd() {
      console.info();
      if (this.modalAddData.provinceCode && this.modalAddData.cityCode) {
        this.searchForm2 = {
          cityCode: this.modalAddData.cityCode,
          provinceCode: this.modalAddData.provinceCode,
        };
        this.showCouponList = true;
        return;
      }
      this.$Message.error("请选择推荐城市！");
    },
  },
};
</script>
<style lang="less" scoped>
.operation {
  margin-bottom: 2vh;
}

.operation button {
  margin-right: 0;
}

.page {
  margin-top: 2vh;
}

.bohui-box {
  padding: 5px;
  font-size: 14px;
  white-space: normal;
  word-break: break-all;
}

.disabled {
  cursor: no-drop;
  color: #ccc;
}

.ivu-btn-primary[disabled] {
  border-color: #dcdee2 !important;
}
</style>
