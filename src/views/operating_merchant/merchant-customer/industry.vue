<template>
  <Row>
    <Col span="12">
      <Select
        v-model="mainIndustryId"
        :placeholder="placeholder"
        style="width:120px"
        @on-change="changeMainIndustry()"
      >
        <Option
          v-for="item in initData.mainIndustryList"
          :value="item.id"
          :key="item.id"
        >{{ item.name }}</Option>
      </Select>
    </Col>
    <Col span="12" v-show="showSecond">
      <Select v-model="secondIndustryId" style="width:120px" placeholder="请选择二级行业"
      @on-change="changeSecondIndustry()"
      >
        <Option v-for="item in secondInudstryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </Col>
  </Row>
</template>

<script>
import { postRequest, getRequest } from "@/libs/axios";

export default {
  name: "child1",
  data() {
    return {
      mainIndustryId: null,
      secondIndustryId: null,
      secondInudstryList: [],
      initData: { mainIndustryList: [] }
    };
  },
  props: {
    showSecond: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "请选择主行业"
    },
  },
  mounted: function() {
    this.getMainIndustryList();
  },
  methods: {
    getMainIndustryList: function() {
      postRequest("/merchant/industryMain/all").then(res => {
        if (res.code == 200) {
          this.initData.mainIndustryList = res.data;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    changeMainIndustry: function() {
      this.secondInudstryList = [];
      if(!this.mainIndustryId){
        return;
      }
      this.returnMainIndustryId();
      getRequest("/merchant/industrySecond/all/" + this.mainIndustryId).then(res => {
        if (res.code == 200) {
          this.secondInudstryList = res.data;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    changeSecondIndustry: function(){
      this.$emit("sendSecondIndustryId", this.secondIndustryId);
    },
    returnMainIndustryId() {
      this.$emit("sendMainIndustryId", this.mainIndustryId);
    },
    reset: function(){
      this.secondIndustryId = null;
      this.mainIndustryId = null;

    }
  }
};
</script>

