<template>
  <!--  充值  -->
  <div class="quick-entry-edit">
    <div>
      <Form
        label-position="right"
        ref="form"
        :model="formData"
        :rules="ruleValidate"
        :label-width="130"
      >
        <FormItem label="标题：" prop="title" :rules="{ required: true, message: '请输入标题' }">
          <Tooltip trigger="focus" title="提醒" content="最多20个汉字" placement="right">
            <Input
              style="width:200px"
              v-model="formData.title"
              :maxlength="20"
              placeholder="请输入标题"
              clearable
            />
          </Tooltip>
        </FormItem>
        <FormItem label="图片：" prop="iconUrl" :rules="{ required: true, message: '请上传图片' }">
          <UploadImage
            :fileUploadType="'iconUrl'"
            :defaultList="formData.defaultIconUrlList"
            @remove="removeIconUrl"
            @uploadSuccess="iconUrlUploadSuccess"
          ></UploadImage>
        </FormItem>
        <!-- <FormItem label="角标icon：" prop="hotUrl" :rules="{ required: true, message: '请上传角标icon' }"> -->
        <FormItem label="角标icon：">
          <UploadImage
            :fileUploadType="'hotUrl'"
            :defaultList="formData.defaultHotUrlList"
            @remove="removeHotUrl"
            @uploadSuccess="hotUrlUploadSuccess"
          ></UploadImage>
        </FormItem>

        <FormItem label="入口：" prop="type">
          <Select v-model="formData.type" style="width:150px" clearable>
            <Option v-for="(v,k) in typeOption" :value="parseInt(k)" :key="k">{{ v }}</Option>
          </Select>
        </FormItem>

        <template v-if="formData.type == 1">
          <FormItem
            :label="`${contentLabel}：`"
            :prop="`content`"
            :rules="{ requierd: true, validator: validateContent }">
            <Input style="width:80%" v-model="formData.content" :placeholder="`点击按钮选择${contentLabel}`" disabled>
            <Button @click="handleChoose" slot="append">选择</Button>
            </Input>
          </FormItem>
        </template>

        <template v-if="formData.type == 3 || formData.type == 4">
          <FormItem
            :label="`${contentLabel}：`"
            :prop="`content`"
            :rules="{ requierd: true, validator: validateContent }">
            <Input style="width:80%" v-model="formData.content" placeholder="请输入内容" clearable />
          </FormItem>
        </template>

        <template v-if="formData.type == 6">
          <FormItem :label="`${contentLabel}：`" :prop="`content`"
            :rules="{ requierd: true, validator: validateContent }">
            <Row>
              <Col span="5">
              <Select v-model="formData.value" style="width:120px" placeholder="请选择主行业"
                @on-change="getIndustrySecendList()">
                <Option v-for="item in mainIndustryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              </Col>
              <Col span="5">
              <Select v-model="formData.value1" style="width:120px" placeholder="请选择二级行业">
                <Option v-for="item in secendIndustryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem :label="`标签：`" :prop="`tags`">
            <Row style="margin-bottom: 1vh;">
              <Icon @click="tagsAdd" class="tag-add" size="30" color="#2d8cf0" type="ios-add-circle-outline" />
            </Row>
            <Row class="tags-list" v-for="(items,index) in tagsList" :key="items.key">
              <Col span="5">
              <Select v-model="items.moduleId" disabled style="width:120px" placeholder="请选择所属模块"
                @on-change="getIndustrySecendList()">
                <Option v-for="item in tagsModuleList" :value="item.id" :key="item.id">{{ item.moduleName }}</Option>
              </Select>
              </Col>
              <Col span="5">
              <Select filterable v-model="items.tagId" style="width:120px" placeholder="请选择标签">
                <Option v-for="item in tagsSelectList" :disabled="item.disabled" :value="item.tagId" :key="item.tagId">{{ item.tagName }}</Option>
              </Select>
              </Col>
              <Col span="5">
                <Icon @click="tagsRemove(index)" class="tag-remove" size="30" color="#ffb08f" type="ios-remove-circle-outline" />
              </Col>
            </Row>
          </FormItem>
        </template>

        <!-- <template v-if="showContent">
          <FormItem
            :label="`${contentLabel}：`"
            :prop="`content`"
            :rules="{ required: true, validator: validateContent }"
          >
            <Row>
              <Col span="16">
                <template v-if="formData.type==1">
                  <Input
                    style="width:80%"
                    v-model="formData.content"
                    :placeholder="`点击按钮选择${contentLabel}`"
                    disabled
                  >
                    <Button @click="handleChoose" slot="append">选择</Button>
                  </Input>
                </template>
                <template v-else-if="formData.type==6">
                  <Row>
                    <Col span="7">
                      <Select
                        v-model="formData.value"
                        style="width:120px"
                        placeholder="请选择主行业"
                        @on-change="getIndustrySecendList()"
                      >
                        <Option
                          v-for="item in mainIndustryList"
                          :value="item.id"
                          :key="item.id"
                        >{{ item.name }}</Option>
                      </Select>
                    </Col>
                    <Col span="7">
                      <Select v-model="formData.value1" style="width:120px" placeholder="请选择二级行业">
                        <Option
                          v-for="item in secendIndustryList"
                          :value="item.id"
                          :key="item.id"
                        >{{ item.name }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </template>
                <template v-else>
                  <Input
                    style="width:80%"
                    v-model="formData.content"
                    placeholder="请输入内容"
                    clearable
                  />
                </template>
              </Col>
            </Row>
          </FormItem>
        </template> -->
      </Form>
    </div>
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px" @click="closeDialog">取消</Button>
      <Button type="primary" @click="handleSubmit('form')">保存</Button>
    </div>

    <ThematicActivities
      v-if="showThematicActivities"
      :showThematicActivities.sync="showThematicActivities"
      @seclectedTr-event="selectedTrCallBack"
    ></ThematicActivities>
  </div>
</template>
<script>
import { postRequest, getRequest } from "@/libs/axios";

import UploadImage from "../UploadImage";
import ThematicActivities from "./ThematicActivities";
import {
  commonTagGetModuleInfo,
  commonTagMerchantCouponTages,
} from '@/api/basicData';

export default {
  name: "quick-entry-edit",
  inject: ["typeOption", "msgOk", "msgErr"],
  created() {

  },
  components: {
    UploadImage,
    ThematicActivities
  },
  props: {
    showEdit: {
      type: Boolean,
      default: true
    },
    action: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return {
          id: Math.random(),
          type: "add",
          data: {
            site: "1",
            title: "",
            iconUrl: "",
            defaultIconUrlList: [],
            hotUrl: "",
            defaultHotUrlList: [],
            tagIds:[]
          }
        };
      }
    }
  },
  computed: {
    showContent() {
      const { type } = this.formData;
      if (type == 1 || type == 3 || type == 4 || type == 6) {
        return true;
      }
      return false;
    },
  },
  watch: {
    action: {
      handler(val, oldVal) {
        let { data } = this.action;
        this.formData = JSON.parse(JSON.stringify(data));
        if (this.formData.type == 6) {
          this.getIndustryMaindList();
          this.getIndustrySecendList();
          this.tagsSelectEditList = data.tagDesc
          this.getCommonTagInitData();
          this.tagsList = data.tagIds.map( v=> {
            return {
              key: Math.random() * 100000,
              moduleId:4,
              tagId: v,
            }
          } )
        }
      },
      deep: true,
      immediate: true
    },
    ["formData.type"]() {
      console.log("formData.type", this.formData.type);
      if (this.formData.type == 6) {
        this.getIndustryMaindList();
        this.getIndustrySecendList();
        this.getCommonTagInitData();
      }
      this.contentLabel = this.typeOption[this.formData.type];
      this.formData.content = "";
      this.formData.value = "";
      this.formData.value1 = "";
    },
    // 选择的标签不能再选择
    tagsList:{
      handler(val, oldVal){
        if(val instanceof Array){
          let list = val.map( v => v.tagId)
          this.tagsSelectList.forEach(item => {
            this.$set(item, 'disabled', list.indexOf(item.tagId) !== -1)
          })
        }
      },
      deep: true,
      immediate: true
    },
  },
  data() {
    return {
      contentLabel: "内容",
      // 新增、修改 任务抽奖banner
      isShow: false,
      title: "扣款信息",
      // merchantType 商户/品牌/商超/零售商名称
      businessTypeLabel: "商户",
      businessTypePlaceholder: "商户",
      formData: {
        title: "",
        iconUrl: "",
        defaultIconUrlList: [],
        hotUrl: "",
        defaultHotUrlList: [],
        value: "",
        value1: ""
      },
      ruleValidate: {},
      showThematicActivities: false,
      mainIndustryList: [],
      secendIndustryList: [],
      mainIndustryId: "",
      tagsModuleList:[],
      tagsSelectList: [],
      tagsSelectEditList: [],
      tagsList: [
        {
          key: Math.random() * 100000,
          moduleId:4,
          tagId: '',
        }
      ],
    };
  },
  mounted(){

  },
  methods: {
    //查询所有一级行业列表
    getIndustryMaindList() {
      postRequest("/merchant/industryMain/all").then(res => {
        if (res.code == 200) {
          this.mainIndustryList = res.data;
          this.mainIndustryList.unshift({
            name: "全部",
            id: "0"
          });
          this.mainIndustryList = this.mainIndustryList.map(item => {
            item.id = `${item.id}`;
            return item;
          });
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //查询所有二级列表，根据一级行业id
    getIndustrySecendList() {
      //this.formData.value1 = '0';
      if (this.formData.value && this.formData.value != null) {
        getRequest("/merchant/industrySecond/all/" + this.formData.value).then(
          res => {
            if (res.code == 200) {
              this.secendIndustryList = res.data;
              this.secendIndustryList.unshift({
                name: "全部",
                id: "0"
              });
              this.secendIndustryList = this.secendIndustryList.map(item => {
                item.id = `${item.id}`;
                return item;
              });
            } else {
              this.$Message.error(res.msg);
            }
          }
        );
      }
    },
    handleChoose() {
      this.showThematicActivities = true;
    },
    selectedTrCallBack(data) {
      console.log("selectedTrCallBack----", data);
      const { id, name, row } = data;
      this.formData.content = name;
      this.formData.value = id;
    },
    removeIconUrl() {
      this.formData.iconUrl = "";
      this.formData.defaultIconUrlList = [];
    },
    removeHotUrl() {
      this.formData.hotUrl = "";
      this.formData.defaultHotUrlList = [];
    },
    iconUrlUploadSuccess({ imgUrl }) {
      this.formData.iconUrl = imgUrl;
      this.formData.defaultIconUrlList = [{ imgUrl }];
    },
    hotUrlUploadSuccess({ imgUrl }) {
      this.formData.hotUrl = imgUrl;
      this.formData.defaultHotUrlList = [{ imgUrl }];
    },

    closeDialog() {
      //关闭对话框清除表单数据
      // this.$refs.formValidate.resetFields();
      console.log("closeDialog");
      this.$emit(`update:showEdit`, false);
    },
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        // console.log(JSON.stringify(this.formValidate));
        if (valid) {
          this.$Message.success("数据验证成功!");
          this.formData.site = "1";
          let oForm = JSON.parse(JSON.stringify(this.formData));

          console.log("submit oForm", oForm);

          // let { code, msg } = await rechargeAndDeduction(oForm)
          // 快捷入口配置项添加或编辑
          const url = "/page/module/layout/saveQuickItem";

          // 添加标签
          if(this.formData.type == 6){
            let tagIds = this.tagsList.map(v => v.tagId).filter(v => v);
            oForm.tagIds = tagIds
          }

          let { code, msg } = await postRequest(url, oForm);

          if (code == 200) {
            this.msgOk("保存成功");
            // 关闭对话框
            this.closeDialog();
            //刷新列表数据
            this.$emit("refresh");
          } else {
            this.msgErr(msg);
          }
        } else {
          this.$Message.error("数据验证失败！");
        }
      });
    },
    validateBusinessName(rule, value, callback) {
      value += "";
      value = value.trim();
      // 允许不填
      if (value == "") {
        // ("请选择${businessTypeLabel}");
        return callback(`请选择${this.businessTypePlaceholder}`);
      }
      callback();
    },
    validateContractNumber(rule, value, callback) {
      value += "";
      value = value.trim();
      if (value == "") {
        callback(new Error("合同号不能为空,且最多支持30个字"));
      } else if (value.length > 30) {
        callback(new Error("合同号最多支持30个字"));
      } else {
        callback();
      }
    },
    validateContent(rule, value, callback) {
      if (this.formData.type == 6) {
        value = this.formData.value;
      } else {
        value = this.formData.content;
      }
      value += "";
      value = value.trim();

      console.log("validateContent", value);

      if (value == "") {
        callback(new Error("内容不能为空"));
      } else if (value.length > 200) {
        callback(new Error("内容最多支持200个字"));
      } else {
        callback();
      }
    },
    // 标签
    getCommonTagInitData(){
      commonTagGetModuleInfo().then(res => {
        if (res && res.code == 200) {
          this.tagsModuleList = res.data.records
        } else {
          this.$Message.error(res.msg);
        }
      })

      commonTagMerchantCouponTages().then(res => {
        if (res && res.code == 200) {
          let list = res.data;
          let list2 = JSON.parse(JSON.stringify(this.tagsSelectEditList))
          if(list2 instanceof Array && list2.length){
            let _list = list.map(item => item.tagId);
            let _noList = []
            list2.forEach(item => {
              let index = _list.indexOf(item.tagId);
              if(index === -1) _noList.push(item)
            })
            list = list.concat(..._noList)
          }
          this.tagsSelectList = list
          // 触发一次 tagsList watch
          if(this.formData.type == 6){
            this.tagsList = [...this.tagsList]
          }
        } else {
          this.$Message.error(res.msg);
        }
      })
    },
    tagsAdd(){
      this.tagsList.push({
        key: Math.random() * 100000,
        moduleId:4,
        tagId: '',
      })
    },
    tagsRemove(index){
      this.tagsList.splice(index, 1);
    },
  }
};
</script>
<style scoped>
.quick-entry-edit {
  padding-bottom: 50px;
}
.demo-drawer-footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.tags-list{
  margin-bottom: 1vh;
}
.tag-add{
  cursor: pointer;
}
.tag-remove{
  cursor: pointer;
}
</style>
