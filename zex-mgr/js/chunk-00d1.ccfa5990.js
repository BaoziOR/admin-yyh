(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00d1"],{3676:function(t,e,o){"use strict";var s=o("6a2d"),a=o.n(s);a.a},"684a":function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"search"},[o("Row",[o("Col",[o("Card",[o("Row",[o("Form",{ref:"searchItem",staticClass:"search-form",attrs:{model:t.searchItem,inline:"","label-width":70}},[o("Form-item",{attrs:{label:"会员手机号：","label-width":85,prop:"purePhoneNumber"}},[o("InputNumber",{staticStyle:{width:"180px"},attrs:{max:999999999999,min:0,type:"text",clearable:"",placeholder:"请输入手机号"},model:{value:t.searchItem.phoneNumber,callback:function(e){t.$set(t.searchItem,"phoneNumber",e)},expression:"searchItem.phoneNumber"}})],1),t.drop?o("span",[o("Form-item",{attrs:{label:"注册渠道：","label-width":85}},[o("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择",clearable:""},model:{value:t.searchItem.source,callback:function(e){t.$set(t.searchItem,"source",e)},expression:"searchItem.source"}},[o("Option",{attrs:{value:""}},[t._v("全部")]),o("Option",{attrs:{value:"1"}},[t._v("领优惠分享")]),o("Option",{attrs:{value:"2"}},[t._v("周边券分享")]),o("Option",{attrs:{value:"3"}},[t._v("要优惠发起拼券邀请")]),o("Option",{attrs:{value:"4"}},[t._v("要优惠参团助力邀请")]),o("Option",{attrs:{value:"5"}},[t._v("专属二维码分享邀请好友")]),o("Option",{attrs:{value:"6"}},[t._v("商家员工名片分享")]),o("Option",{attrs:{value:"7"}},[t._v("要优惠立即领取分享")]),o("Option",{attrs:{value:"8"}},[t._v("所有分享到小程序首页")])],1)],1)],1):t._e(),o("FormItem",{staticClass:"br",staticStyle:{"margin-left":"-35px"}},[o("Button",{attrs:{type:"primary",icon:"ios-search"},on:{click:t.queryTableList}},[t._v("搜索")]),o("Button",{on:{click:t.refresh}},[t._v("重置")]),o("a",{staticClass:"drop-down",on:{click:t.dropDown}},[t._v("\n                "+t._s(t.dropDownContent)+"\n                "),o("Icon",{attrs:{type:t.dropDownIcon}})],1)],1)],1)],1)],1),o("Card",[o("Row",[o("Table",{ref:"table",attrs:{loading:t.TableLoading,border:"",columns:t.tableColumns,data:t.table_list,sortable:"custom"}})],1),o("Row",{staticClass:"page",attrs:{type:"flex",justify:"end"}},[o("Page",{staticStyle:{float:"right"},attrs:{total:t.totalSize,"show-total":"","show-elevator":"",current:t.current},on:{"on-change":t.changeCurrent,"update:current":function(e){t.current=e}}})],1)],1)],1)],1),o("Modal",{attrs:{width:"700",title:t.title,"mask-closable":!1},model:{value:t.edit_Modal_show,callback:function(e){t.edit_Modal_show=e},expression:"edit_Modal_show"}},[o("Form",{ref:"edit_info",attrs:{model:t.edit_info,"label-width":80,rules:t.ruleValidate}},[o("FormItem",{attrs:{label:"岗位名称",prop:"postName"}},[o("Input",{attrs:{placeholder:"请输入",clearable:""},model:{value:t.edit_info.postName,callback:function(e){t.$set(t.edit_info,"postName",e)},expression:"edit_info.postName"}})],1),o("FormItem",{attrs:{label:"岗位编码",prop:"postCode"}},[o("Input",{attrs:{placeholder:"请输入",clearable:""},model:{value:t.edit_info.postCode,callback:function(e){t.$set(t.edit_info,"postCode",e)},expression:"edit_info.postCode"}})],1),o("FormItem",{attrs:{label:"显示顺序",required:""}},[o("InputNumber",{staticStyle:{width:"100%"},attrs:{max:99999,min:0,placeholder:"请输入",clearable:""},model:{value:t.edit_info.postSort,callback:function(e){t.$set(t.edit_info,"postSort",e)},expression:"edit_info.postSort"}})],1),o("FormItem",{attrs:{label:"岗位状态",prop:"status"}},[o("Select",{model:{value:t.edit_info.status,callback:function(e){t.$set(t.edit_info,"status",e)},expression:"edit_info.status"}},[o("Option",{attrs:{value:"0"}},[t._v("正常")]),o("Option",{attrs:{value:"1"}},[t._v("停用")])],1)],1),o("FormItem",{attrs:{label:"备注"}},[o("Input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请输入...",clearable:""},model:{value:t.edit_info.remark,callback:function(e){t.$set(t.edit_info,"remark",e)},expression:"edit_info.remark"}})],1)],1),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("Button",{attrs:{type:"text"},on:{click:function(e){t.edit_Modal_show=!1}}},[t._v("取消")]),o("Button",{attrs:{type:"primary",loading:t.edit_loading},on:{click:function(e){t.editOk("edit_info")}}},[t._v("保存")])],1)],1),o("Modal",{attrs:{title:"不可赚钱/恢复赚钱","mask-closable":!1,"footer-hide":""},model:{value:t.updateAccountDisplay,callback:function(e){t.updateAccountDisplay=e},expression:"updateAccountDisplay"}},[o("Form",{ref:"formCustom",staticStyle:{"margin-top":"20px"},attrs:{model:t.formCustom,"label-width":80}},[o("FormItem",{attrs:{label:"填写原因",required:""}},[o("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea",rows:2},model:{value:t.formCustom.remark,callback:function(e){t.$set(t.formCustom,"remark",e)},expression:"formCustom.remark"}})],1),o("FormItem",[o("Button",{attrs:{type:"primary"},on:{click:t.updateAccountStatusFn}},[t._v("确认")]),o("Button",{staticStyle:{"margin-left":"8px"},on:{click:function(e){t.updateAccountDisplay=!1}}},[t._v("关闭")])],1)],1)],1)],1)},a=[],i=o("7f80"),r={name:"post-manage",components:{},data:function(){var t=this;return{drop:!1,dropDownContent:"展开",dropDownIcon:"ios-arrow-down",searchItem:{phoneNumber:"",source:""},current:1,totalSize:0,pageNum:1,limit:10,TableLoading:!1,table_list:[],self:this,tableColumns:[{title:"会员Id",key:"memberId",width:200,align:"center"},{title:"可提现余额",key:"withdrawalBalance",width:150,align:"center",sortable:!0},{title:"openId",key:"openid",width:150,align:"center"},{title:"手机号",key:"phoneNumber",width:150,align:"center"},{title:"微信昵称",key:"nickName",width:150,align:"center"},{title:"注册时间",key:"registerTime",width:150,align:"center"},{title:"注册渠道",key:"source",width:200,align:"center"},{title:"状态",key:"status",align:"center",width:100,render:function(t,e){var o=e.row,s="1"==o.status?"blue":"red",a="1"==o.status?"有效":"2"==o.status?"冻结":"无账号";return t("Tag",{props:{color:s}},a)}},{title:"操作",key:"action",fixed:"left",align:"center",width:120,render:function(e,o){var s=o.row,a=1==s.status?"red":2==s.status?"#5cadff":"",i=1==s.status?"不可赚钱":2==s.status?"恢复赚钱":"";return e("div",[e("Button",{props:{type:"text",size:"small"},style:{color:a},on:{click:function(){t.inputUpdateAccountStatus(o.row)}}},i)])}},{title:"操作日志",key:"action",align:"center",width:100,render:function(e,o){return e("div",[e("Button",{props:{type:"text",size:"small"},style:{color:"#5cadff"},on:{click:function(){t.editInfo(o.row)}}},"查看")])}}],edit_Modal_show:!1,edit_info:{postId:"",postName:"",postCode:"",status:"",remark:"",postSort:null},edit_loading:!1,ruleValidate:{postName:[{required:!0,message:"岗位名称不能为空",trigger:"blur"}],postCode:[{required:!0,message:"岗位编码不能为空",trigger:"blur"}],postSort:[{required:!0,message:"显示顺序不能为空",trigger:"blur"}],status:[{required:!0,message:"请选择岗位状态",trigger:"change"}]},requestUrl:"",msg:"",title:"",updateAccountDisplay:!1,formCustom:{type:"",id:"",memberId:"",status:"",operation:"",remark:""}}},created:function(){},methods:{init:function(){this.updateTableList()},dropDown:function(){this.drop?(this.dropDownContent="展开",this.dropDownIcon="ios-arrow-down"):(this.dropDownContent="收起",this.dropDownIcon="ios-arrow-up"),this.drop=!this.drop},refresh:function(){this.searchItem.phoneNumber="",this.searchItem.source="",this.updateTableList()},queryTableList:function(){this.pageNum=1,this.totalSize=0,this.updateTableList()},changeCurrent:function(t){this.pageNum=t,this.updateTableList()},updateTableList:function(){var t=this;this.TableLoading=!0;var e={phoneNumber:this.searchItem.phoneNumber,source:this.searchItem.source};Object(i["f"])("/mini-user/list?pageNum="+this.pageNum+"&pageSize="+this.limit,e).then(function(e){t.TableLoading=!1,e.isSuccess?(t.totalSize=e.data.total,t.table_list=e.data.records):t.$Message.error(e.msg)})},addInfo:function(){this.edit_info={postId:"",postName:"",postCode:"",status:"0",remark:"",postSort:null},this.edit_Modal_show=!0,this.title="岗位管理新增"},updateAccountStatus:function(t){this.edit_Modal_show=!0,this.edit_info=t,this.title="岗位管理编辑"},editInfo:function(t){},editOk:function(t){var e=this;this.$refs[t].validate(function(t){if(t){if(""==e.edit_info.postSort)return void e.$Message.error("显示顺序不能为空");e.edit_info.postId?(e.requestUrl="/system/sys-post/edit",e.msg="编辑成功"):(e.requestUrl="/system/sys-post/add",e.msg="新增成功"),e.edit_loading=!0;var o={postId:e.edit_info.postId,postName:e.edit_info.postName,postCode:e.edit_info.postCode,status:e.edit_info.status,remark:e.edit_info.remark,postSort:e.edit_info.postSort};Object(i["f"])(e.requestUrl,o).then(function(t){e.edit_loading=!1,200==t.code?(e.$Message.info(e.msg),setTimeout(function(){e.edit_Modal_show=!1,e.updateTableList()},1200)):e.$Message.error(t.msg)})}else e.$Message.error("表单验证失败!")})},inputUpdateAccountStatus:function(t){this.formCustom.memberId=t.memberId,this.formCustom.type="会员管理",this.formCustom.status=1==t.status?2:1,this.updateAccountDisplay=!0},updateAccountStatusFn:function(){var t=this;if(this.formCustom.remark){var e={memberId:this.formCustom.memberId,status:this.formCustom.status,remark:this.formCustom.remark,type:this.formCustom.type};Object(i["f"])("/account/edit",e).then(function(e){200==e.code?(t.msgOk("更新成功"),t.updateAccountDisplay=!1,t.formCustom.memberId="",t.formCustom.type="",t.formCustom.status="",t.formCustom.remark="",t.updateTableList()):t.msgErr(e.msg)})}else this.$Message.error("请填写操作原因!")},msgOk:function(t){this.$Message.info({content:t,duration:3})},msgErr:function(t){this.$Message.error({content:t,duration:3})},removeInfo:function(t){var e=this;this.$Modal.confirm({title:"删除确认",content:"删除后不可恢复，是否继续删除？",onOk:function(){e.$Loading.start(),Object(i["f"])("/system/sys-post/delete?postId="+t.postId).then(function(t){e.loading=!1,"200"==t.code?(e.$Message.info("删除成功！"),setTimeout(function(){e.pageNum=1,e.updateTableList()},1200)):e.$Message.error(t.msg)})},onCancel:function(){e.$Message.info("点击了取消")}})},removeInfoTest:function(t){var e=this;this.$Modal.confirm({title:"不可赚钱/恢复赚钱",content:"填写原因",onOk:function(){e.$Loading.start(),Object(i["f"])("/system/sys-post/delete?postId="+t.postId).then(function(t){e.loading=!1,"200"==t.code?(e.$Message.info("删除成功！"),setTimeout(function(){e.pageNum=1,e.updateTableList()},1200)):e.$Message.error(t.msg)})},onCancel:function(){e.$Message.info("点击了取消")}})}},mounted:function(){this.init()}},n=r,l=(o("3676"),o("2877")),u=Object(l["a"])(n,s,a,!1,null,"c1069096",null);u.options.__file="miniUserManage.vue";e["default"]=u.exports},"6a2d":function(t,e,o){}}]);