<template>
    <Modal  width="800"
            v-model="viewDialogVisible"
            title="商户选择"
            :closable="false"
            :mask-closable="false"
            footer-hide>
        <div>
            <div>
                <Card :bordered="false" style="margin-bottom:2px">
                    <Form ref="businessModal" label-position="right" :label-width="80" :model="businessModal" inline>
                        <FormItem label="商户名称" span="24" style="width:25%">
                            <Input v-model="businessModal.name" placeholder=" 请填写商户名称" :maxlength=20 />
                        </FormItem>
                        <FormItem label="省/市" span="24"  style="width:40%">
                            <Cascader :data="addressData" :load-data="addressLoad" v-model="addressValue"></Cascader>
                        </FormItem>
                        <FormItem span="24" :label-width="1" style="float: right;">
                            <Button type="primary" class="submit" icon="ios-search" @click="search('searchForm')" style="margin-right: 5px">搜索</Button>
                            <!--<Button type="primary" icon="ios-search" @click="search">搜索</Button>-->
                            <Button icon="md-refresh" @click="reset">重置</Button>
                        </FormItem>
                    </Form>
                </Card>
                    <Row>
                        <RadioGroup v-model="selectIndex" @on-change="selectBusiness" style="width: 100%;">
                            <Table
                                    :loading="TableLoading"
                                    border
                                    :columns="tableColumns"
                                    :data="listData"
                                    sortable="custom"
                                    ref="table"
                                    @on-selection-change="handleSelect"
                            >
                                <template slot-scope="{ row,index }" slot="action">
                                    <Radio :label="index"><span></span></Radio>
                                </template>
                                <template slot-scope="{ row }" slot="address">
                                    <div>{{row.address}}</div>
                                </template>
                            </Table>
                        </RadioGroup>
                    </Row>
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
            </div>
        </div>
        <div style="text-align: center;margin:10px">
            <Button style="margin-left: 8px;" type="primary" @click="businessSave">保存</Button>
            <Button style="margin-left: 8px;" @click="businessClose">关闭</Button>
        </div>
    </Modal>
</template>

<script>
    import { postRequest,getSyncRequest} from "@/libs/axios";
    export default {
        name: "businessModal",
        props: {
            viewDialogVisible: { type: Boolean, default: false }
        },
        data(){
            return{
                TableLoading:'',
                businessModal:{
                    name:'',
                    current:1,
                },
                addressValue:[],
                selectRow:'',
                selectIndex:"",
                addressData:[],
                totalSize: 0,
                current: 1,
                isDown:false,
                tableColumns: [
                    {
                        title: "操作",
                        width: 80,
                        align: "center",
                        slot: "action",
                        fixed: "left"
                    },
                    {
                        title: "商户名称",
                        minWidth:200,
                        key: "realName",
                        align: 'center',
                    },
                    {
                        title: "省/市",
                        minWidth:250,
                        slot: "address",
                        align: 'center',
                    }
                ],
                listData: [],
                selectDataList: [],
            }
        },
        methods:{
            resetRow(row,status){
                if(status){
                    this.isDown = true;
                }
                this.selectRow = row;
                this.businessModal.name = '';
                this.businessModal.current = 1;
                this.current= 1;
                this.addressData = [];
                this.getProvinceList();
                this.loadTableData();
            },
            getProvinceList() {
                postRequest(`/system/area/province/list`,{}).then(res => {
                    if (res.code === "200") {
                        this.addressData = res.data||[];
                        if(this.addressData.length){
                            this.addressData.forEach(function(v){
                                v.value = v.provinceCode
                                v.label = v.shortName;
                                v.children= [];
                                v.loading = false
                            })
                        }
                    } else {
                        this.$Message.error("获取数据失败");
                    }
                });
            },
            addressLoad(item,callback){
                item.loading = true;
                getSyncRequest("/system/area/city/" + item.provinceCode).then(res =>{
                    if (res.code === "200") {
                        item.children = res.data||[];
                        item.loading = false;
                        if(item.children.length){
                            item.children.forEach(function(v){
                                v.label = v.shortName;
                                v.value = v.cityCode
                            })
                        }
                        callback();
                    } else {
                        this.$Message.error("获取数据失败");
                        item.loading = false;
                        callback();
                    }
                });
            },
            search(){
                this.businessModal.current= 1;
                this.current= 1;
                this.TableLoading = false;
                this.loadTableData();
            },
            reset(){
                this.businessModal.current= 1;
                this.current= 1;
                this.businessModal.name = [];
                this.addressValue = [];
                this.loadTableData();
            },
            loadTableData(page){
                let that = this;
                this.totalSize = 0;
                this.businessModal.current = page||1;
                this.listData = [];
                this.TableLoading = true;
                this.selectIndex = '';
                postRequest(`/merchant/platform/expand/listMerchant?pageNum=${this.businessModal.current}&pageSize=10`,{
                        "cityCode": this.addressValue[1]||'',
                        "provinceCode": this.addressValue[0]||'',
                        "name":this.businessModal.name||'',
                        "status":this.isDown?null:2,
                    }
                ).then(res => {
                    this.TableLoading = false;
                    if (res.code === "200") {
                        this.totalSize = res.data.total;
                        this.listData = res.data.records;
                        if(this.selectRow.merchantId){
                            res.data.records.forEach(function(v,i){
                                if(v.merchantId === that.selectRow.merchantId){
                                    that.selectIndex = i;
                                }
                            })
                        }
                    } else {
                        this.$Message.error("获取数据失败");
                    }
                });
            },
            handleSelect(selection, index) {
                this.selectDataList = selection;
            },
            changeCurrent(current) {
                if (this.businessModal.current != current) {
                    this.businessModal.current = current;
                    this.loadTableData(current);
                }
            },
            selectBusiness(){
                this.selectRow = this.listData[this.selectIndex]
            },
            businessClose(){
                this.$emit('setViewDialogVisible',this.selectRow)
            },
            businessSave(){
                if(!this.selectIndex&&this.selectIndex!==0){
                    this.$Message.error('请选择商户');
                    return;
                }
                this.$emit('setViewDialogVisible', this.selectRow)
            }
        },
        created(){
        }
    }
</script>

<style scoped>

</style>
