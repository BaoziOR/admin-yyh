<template>
    <div class="supermarket-list-box">
        <Modal  width="800"
                v-model="viewDialogVisible"
                title="商超选择"
                :closable="false"
                :mask-closable="false"
                footer-hide>
            <div>
                <row>
                    <Form ref="searchItem" :model="searchItem" inline :label-width="70" class="search-form">
                        <!-- 商超名称 shopName   零售商名称 venderName    -->
                        <FormItem label="商超名称">
                            <Input
                                    type="text"
                                    v-model="searchItem.shopName"
                                    clearable
                                    placeholder="请输入商超名称"
                                    style="width: 150px"
                            />
                        </FormItem>
                        <FormItem label="零售商名称" :label-width="80">
                            <Input
                                    type="text"
                                    v-model="searchItem.venderName"
                                    clearable
                                    placeholder="请输入零售商名称"
                                    style="width: 150px"
                            />
                        </FormItem>
                        <FormItem style label="所在地区">
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
                            <Button @click="search" type="primary" icon="ios-search">搜索</Button>
                            <Button @click="refresh">重置</Button>
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
                        @on-selection-change="handleSelect"
                ></Table>
                <Row type="flex" justify="end" class="page">
                    <Page
                            :total="total"
                            show-total
                            show-elevator
                            @on-change="changeCurrent"
                            style="float: right"
                            :current.sync="current"
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
    import { getShopList } from "@/api/sys";
    import { postRequest } from "@/libs/axios";
    export default {
        name: "shop-modal",
        props: {
            viewDialogVisible: { type: Boolean, default: false }
        },
        data() {
            return {
                searchItem: {
                    enabled: 1, //门店状态 正常
                    shopName: "", //门店名称
                    venderName: "" //零售商名称
                },
                choice: {
                    id: "", //知而行店号 shopId
                    shopName: "", //门店名称
                    venderName: "" //零售商名称
                },
                edit_loading: false,
                isCheckDisabled: false,
                checkResult: 0,
                tableColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: "知而行编号",
                        key: "shopId",
                        minWidth: 80,
                        align: "center"
                    },
                    {
                        title: "商超名称",
                        key: "shopName",
                        minWidth: 145,
                        align: "center"
                    },
                    {
                        title: "零售商名称",
                        key: "venderName",
                        minWidth: 130,
                        align: "center"
                    },
                    {
                        title: "详细地址",
                        align: "center",
                        width: 340,
                        key: "address",
                        render: (h, params) => {
                            const { province, city, district, address } = params.row;
                            let str = `${province}${city}${district}${address}`;
                            return h("span", str);
                        }
                    }
                ],
                selectDataList:[],
                tableData: [],
                current: 1, //开始条数 pageNum
                total: 0, //总条数
                tableLoading: false,
                provincelist: [],
                citylist: [],
                arealist: []
            };
        },

        methods: {
            resetRow(list){
                this.tableData = list;
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
            // 关闭商户选择框
            cancel() {
                this.closeDialog();
            },
            handleSelect(selection, index) {
                this.selectDataList = selection;
            },
            search() {
                this.current = 1; //开始条数
                this.total = 0; //总条数
                this.queryTableData();
            },
            // 获取商户列表
            async queryTableData() {
                // 加载动画
                this.tableLoading = true;

                const {
                    code,
                    msg,
                    data: { records, current, total }
                } = await getShopList(this.searchItem, this.current);
                if (code == 200) {
                    this.tableData = records;
                    // 分页
                    this.current = current;
                    this.total = total;
                } else {
                    this.msgErr(msg);
                }
                // 结束加载动画
                this.tableLoading = false;
            },

            closeDialog() {
                this.$emit('setViewDialogVisible', []);
            },
            //确定选择商户
            selectMerchant() {
                this.$emit('setViewDialogVisible', this.selectDataList);
            },
            //重置商户搜索条件
            refresh() {
                // this.updateTableList(this.params);
                this.searchItem = {
                    enabled: 1, //门店状态 正常
                    shopName: "", //门店名称
                    venderName: "" //零售商名称
                };
                this.queryTableData();
            },

            //分页
            changeCurrent(current) {
                this.current = current;
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
