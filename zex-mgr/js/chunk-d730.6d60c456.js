(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d730","62a2","62a2"],{"62a2":function(t,e,a){"use strict";a.d(e,"c",function(){return n}),a.d(e,"b",function(){return s}),a.d(e,"a",function(){return o}),a.d(e,"d",function(){return l});var i=a("e069");function n(t,e){var a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),S:t.getMilliseconds()};for(var i in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),a)new RegExp("("+i+")").test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?a[i]:("00"+a[i]).substr((""+a[i]).length)));return e}function s(t,e,a,n){return new Promise(function(n,s){"image/png"!=t.type&&"image/jpeg"!=t.type&&"image/jpg"!=t.type&&"image/bmp"!=t.type&&(i["Message"].error("图片格式只能选择png/jpeg/jpg/bmp"),s());var o=new FileReader;o.onload=function(t){var o=t.target.result,l=new Image;l.onload=function(){e&&this.width!=e?(i["Message"].error("请上传宽为"+e+"的图片"),s()):a&&this.height!=a?(i["Message"].error("请上传高为"+a+"的图片"),s()):n()},l.onerror=s,l.src=o},o.readAsDataURL(t)})}function o(t,e){return new Promise(function(e,a){"image/png"!=t.type&&"image/jpeg"!=t.type&&"image/jpg"!=t.type&&"image/bmp"!=t.type&&(i["Message"].error("图片格式只能选择png/jpeg/jpg/bmp"),a());var n=new FileReader;n.onload=function(t){var i=t.target.result,n=new Image;e(),n.onerror=a,n.src=i},n.readAsDataURL(t)})}function l(t,e){for(var a=[t[0]],i=1;i<t.length;i++){for(var n=t[i],s=!1,o=0;o<a.length;o++)if(n[e]==a[o][e]){s=!0;break}s||a.push(n)}return a}},"9c05":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Tabs",{attrs:{value:"name1",animated:!1}},[a("TabPane",{attrs:{label:"基础设置",name:"name1"}},[a("div",{staticStyle:{overflow:"hidden"}},[a("div",{staticStyle:{float:"left",width:"100%"}},[t.campId?a("Alert",{attrs:{"show-icon":""}},[t._v("\n            活动ID :\n            "),a("span",{staticStyle:{color:"red"}},[t._v(t._s(t.campId))]),a("span",{attrs:{slot:"desc"},slot:"desc"})]):t._e(),a("Form",{ref:"edit_info",attrs:{model:t.edit_info,"label-width":100}},[a("Row",[a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"appid"}},[a("Select",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入选择appid",disabled:""},model:{value:t.edit_info.appid,callback:function(e){t.$set(t.edit_info,"appid",e)},expression:"edit_info.appid"}},t._l(t.appId_info,function(e){return a("Option",{key:e.appid,attrs:{value:e.appid}},[t._v(t._s(e.appName))])}))],1)],1),a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"活动类型"}},[a("Select",{staticStyle:{width:"300px"},attrs:{disabled:""},model:{value:t.edit_info.campType,callback:function(e){t.$set(t.edit_info,"campType",e)},expression:"edit_info.campType"}},[a("Option",{attrs:{value:"57"}},[t._v("领优惠")]),a("Option",{attrs:{value:"62"}},[t._v("要优惠")]),a("Option",{attrs:{value:"63"}},[t._v("领优惠分享奖励")]),a("Option",{attrs:{value:"64"}},[t._v("要优惠参与奖励（接受分享/参团）")])],1)],1)],1)],1),a("Row",[a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"优惠券类型"}},[a("Select",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入选择优惠券类型",disabled:""},model:{value:t.edit_info.couponType,callback:function(e){t.$set(t.edit_info,"couponType",e)},expression:"edit_info.couponType"}},[a("Option",{attrs:{value:"1"}},[t._v("换购券")]),a("Option",{attrs:{value:"2"}},[t._v("商品券")]),a("Option",{attrs:{value:"3"}},[t._v("折扣券")]),a("Option",{attrs:{value:"4"}},[t._v("全场券")]),a("Option",{attrs:{value:"5"}},[t._v("赠品券")])],1)],1)],1),a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"活动标题"}},[a("Input",{staticStyle:{width:"300px"},attrs:{type:"text",placeholder:"请输入活动标题",disabled:""},model:{value:t.edit_info.name,callback:function(e){t.$set(t.edit_info,"name",e)},expression:"edit_info.name"}})],1)],1)],1),a("Row",[a("Col",{attrs:{span:"12"}},[57==t.edit_info.campType?a("FormItem",{attrs:{label:"优惠面额描述"}},[a("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:{minRows:4,maxRows:8},placeholder:"请输入优惠面额描述",disabled:""},model:{value:t.edit_info.couponValueDesc,callback:function(e){t.$set(t.edit_info,"couponValueDesc",e)},expression:"edit_info.couponValueDesc"}})],1):t._e()],1),a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"使用门槛描述"}},[a("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:{minRows:4,maxRows:8},placeholder:"请填写使用门槛描述",disabled:""},model:{value:t.edit_info.doorsillDesc,callback:function(e){t.$set(t.edit_info,"doorsillDesc",e)},expression:"edit_info.doorsillDesc"}})],1)],1)],1),a("Row",[a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"活动时间类型"}},[a("Select",{staticStyle:{width:"300px"},attrs:{placeholder:"请选择活动时间类型",disabled:""},model:{value:t.edit_info.dateType,callback:function(e){t.$set(t.edit_info,"dateType",e)},expression:"edit_info.dateType"}},[a("Option",{attrs:{value:"1"}},[t._v("固定日期时间范围有效")]),a("Option",{attrs:{value:"2"}},[t._v("相对兑换有效期")])],1)],1)],1),a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"状态",placeholder:"请选择状态"}},[a("Select",{staticStyle:{width:"300px"},attrs:{disabled:""},model:{value:t.edit_info.status,callback:function(e){t.$set(t.edit_info,"status",e)},expression:"edit_info.status"}},[a("Option",{attrs:{value:"0"}},[t._v("创建")]),a("Option",{attrs:{value:"1"}},[t._v("上架")]),a("Option",{attrs:{value:"-1"}},[t._v("下架")])],1)],1)],1)],1),"1"==t.edit_info.dateType?a("Row",[a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"开始日期"}},[a("DatePicker",{staticStyle:{width:"300px"},attrs:{type:"date",placeholder:"选择日期",disabled:""},model:{value:t.edit_info.startDate,callback:function(e){t.$set(t.edit_info,"startDate",e)},expression:"edit_info.startDate"}})],1)],1),a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"结束日期"}},[a("DatePicker",{staticStyle:{width:"300px"},attrs:{type:"date",placeholder:"选择日期",disabled:""},model:{value:t.edit_info.endDate,callback:function(e){t.$set(t.edit_info,"endDate",e)},expression:"edit_info.endDate"}})],1)],1)],1):t._e(),a("Row",[a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"优惠券缩略图"}},[a("img",{staticStyle:{float:"left",width:"90px",height:"90px","line-height":"90px","margin-right":"10px",border:"1px dashed #dcdee2",background:"#fff"},attrs:{src:t.edit_info.couponImg}})])],1),a("Col",{attrs:{span:"12"}},[a("Tooltip",{attrs:{content:"点击可查看大图 ",placement:"right"}},[a("FormItem",{attrs:{label:"优惠券详情图"}},[a("img",{staticStyle:{float:"left",width:"90px",height:"90px","line-height":"90px","margin-right":"10px",border:"1px dashed #dcdee2",background:"#fff"},attrs:{src:t.edit_info.imgUrl},on:{click:function(e){t.showBigImg(t.edit_info.imgUrl)}}})])],1)],1)],1),a("FormItem",{attrs:{label:"优惠券模板"}},[a("Alert",[a("Row",[a("Col",{attrs:{span:"12"}},[t._v("模版ID："+t._s(t.edit_info.ticketTemplateId))]),a("Col",{attrs:{span:"12"}},[t._v("模版名称："+t._s(t.edit_info.ticketName))])],1),0===t.edit_info.ChangeDateType?a("Row",[a("Col",{attrs:{span:"12"}},[t._v("兑换开始时间："+t._s(t.edit_info.ChangeStartDate))]),a("Col",{attrs:{span:"12"}},[t._v("兑换结束时间："+t._s(t.edit_info.ChangeEndDate))])],1):t._e(),1===t.edit_info.ChangeDateType?a("Row",[a("Col",{attrs:{span:"12"}},[t._v("发券后+"+t._s(t.edit_info.ChangeStart)+"天开始兑换")]),a("Col",{attrs:{span:"12"}},[t._v("发券后+"+t._s(t.edit_info.ChangeEnd)+"天结束兑换")])],1):t._e()],1)],1),a("FormItem",{attrs:{label:"活动/领券规则"}},[a("Input",{staticStyle:{width:"500px"},attrs:{type:"textarea",autosize:{minRows:4,maxRows:8},placeholder:"请填写活动/领券规则",disabled:""},model:{value:t.edit_info.rules,callback:function(e){t.$set(t.edit_info,"rules",e)},expression:"edit_info.rules"}})],1),a("FormItem",{attrs:{label:"券使用说明"}},[a("Input",{staticStyle:{width:"500px"},attrs:{type:"textarea",autosize:{minRows:4,maxRows:8},disabled:""},model:{value:t.edit_info.useDesc,callback:function(e){t.$set(t.edit_info,"useDesc",e)},expression:"edit_info.useDesc"}})],1)],1)],1)])]),a("TabPane",{attrs:{label:"规则设置",name:"name2"}},[a("div",{staticStyle:{overflow:"hidden"}},[a("div",{staticStyle:{float:"left",width:"100%"}},[a("Alert",{attrs:{"show-icon":""}},[t._v("\n            活动ID :\n            "),a("span",{staticStyle:{color:"red"}},[t._v(t._s(t.campId))]),a("span",{staticStyle:{"margin-left":"10%"}},[t._v("\n              设置总天数 :\n              "),a("span",{staticStyle:{color:"red"}},[t._v(t._s(t.daySum))])]),a("span",{attrs:{slot:"desc"},slot:"desc"})]),a("Form",{ref:"edit_info1",attrs:{model:t.edit_info1,"label-width":160}},[a("Row",[a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"每人限领总数"}},[a("InputNumber",{staticStyle:{width:"200px"},attrs:{min:0,type:"text",placeholder:"请输入",disabled:""},model:{value:t.edit_info1.totalGetLimit,callback:function(e){t.$set(t.edit_info1,"totalGetLimit",e)},expression:"edit_info1.totalGetLimit"}}),a("span",{staticStyle:{color:"red"}},[t._v("  张")])],1)],1),a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"投放渠道"}},[a("Select",{staticStyle:{width:"200px"},attrs:{disabled:""},model:{value:t.edit_info1.sendChannel,callback:function(e){t.$set(t.edit_info1,"sendChannel",e)},expression:"edit_info1.sendChannel"}},t._l(t.res_list,function(e){return a("Option",{key:e.id,attrs:{value:e.dictValue}},[t._v(t._s(e.dictLabel))])}))],1)],1)],1),a("Row",[a("Col",{attrs:{span:"12"}},[1==t.edit_info1.sendChannel?a("FormItem",{attrs:{label:"邀请人数"}},[a("InputNumber",{staticStyle:{width:"200px"},attrs:{min:0,type:"text",placeholder:"请输入",disabled:""},model:{value:t.edit_info1.shareInvitedCount,callback:function(e){t.$set(t.edit_info1,"shareInvitedCount",e)},expression:"edit_info1.shareInvitedCount"}}),a("span",{staticStyle:{color:"red"}},[t._v("  人")])],1):t._e()],1),a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"是否限抢券"}},[a("Select",{staticStyle:{width:"200px"},attrs:{disabled:""},model:{value:t.edit_info1.isLimitGrap,callback:function(e){t.$set(t.edit_info1,"isLimitGrap",e)},expression:"edit_info1.isLimitGrap"}},[a("Option",{attrs:{value:"0"}},[t._v("否")]),a("Option",{attrs:{value:"1"}},[t._v("是")])],1)],1)],1)],1),a("Row",[a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"排序"}},[a("InputNumber",{staticStyle:{width:"200px"},attrs:{min:0,type:"text",placeholder:"请输入",disabled:""},model:{value:t.edit_info1.orderBy,callback:function(e){t.$set(t.edit_info1,"orderBy",e)},expression:"edit_info1.orderBy"}})],1)],1),a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"库存数量"}},["999999999"!=t.edit_info1.stockCount?a("Input",{staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"请输入",disabled:""},model:{value:t.edit_info1.stockCount,callback:function(e){t.$set(t.edit_info1,"stockCount",e)},expression:"edit_info1.stockCount"}}):t._e(),"999999999"==t.edit_info1.stockCount?a("Input",{staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"无限制",disabled:""}}):t._e(),a("span",{staticStyle:{color:"red"}},[t._v("  张")])],1)],1),a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:"默认推荐排除"}},[a("Select",{staticStyle:{width:"200px"},attrs:{disabled:""},model:{value:t.edit_info1.isBlack,callback:function(e){t.$set(t.edit_info1,"isBlack",e)},expression:"edit_info1.isBlack"}},[a("Option",{attrs:{value:"0"}},[t._v("否")]),a("Option",{attrs:{value:"1"}},[t._v("是")])],1)],1)],1)],1)],1)],1)])]),1==t.edit_info1.isLimitGrap?a("TabPane",{attrs:{label:"整点抢设置",name:"name3"}},[a("div",[a("Alert",{attrs:{"show-icon":""}},[t._v("\n          活动ID :\n          "),a("span",{staticStyle:{color:"red"}},[t._v(t._s(t.campId))]),a("span",{staticStyle:{"margin-left":"10%"}},[t._v("\n            设置总天数 :\n            "),a("span",{staticStyle:{color:"red"}},[t._v(t._s(t.daySum))])]),a("span",{staticStyle:{"margin-left":"10%"}},[t._v("\n            库存数量 :\n            "),"999999999"!=t.edit_info1.stockCount?a("span",{staticStyle:{color:"red"}},[t._v(t._s(t.edit_info1.stockCount))]):t._e(),"999999999"==t.edit_info1.stockCount?a("span",{staticStyle:{color:"red"}},[t._v("无限制")]):t._e()]),a("span",{attrs:{slot:"desc"},slot:"desc"})]),a("Form",{attrs:{"label-width":100}},[a("Timeline",{attrs:{pending:""}},t._l(t.campaginGrabInfoList,function(e,i){return a("TimelineItem",{key:i},[a("Row",[a("Col",{attrs:{span:"2"}},[a("p",{staticClass:"time"},[t._v("设置"+t._s(i+1))])]),a("Col",{attrs:{span:"22"}},[a("Card",[a("Row",[a("Col",{attrs:{span:"7"}},[a("FormItem",{attrs:{label:"限制数量"}},[a("InputNumber",{staticStyle:{width:"100px"},attrs:{placeholder:"请输入",min:1,disabled:""},model:{value:e.limitCnt,callback:function(a){t.$set(e,"limitCnt",a)},expression:"item.limitCnt"}}),a("span",{staticStyle:{color:"red"}},[t._v("   张")])],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"整点开始时间"}},[a("TimePicker",{staticStyle:{width:"120px"},attrs:{format:"HH:mm:ss",placeholder:"请选择时间","disabled-minutes":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],"disabled-seconds":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],disabled:""},model:{value:e.timeStart,callback:function(a){t.$set(e,"timeStart",a)},expression:"item.timeStart"}})],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"整点结束时间"}},[a("TimePicker",{staticStyle:{width:"120px"},attrs:{format:"HH:mm:ss",placeholder:"请选择时间","disabled-minutes":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],"disabled-seconds":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],disabled:""},model:{value:e.timeEnd,callback:function(a){t.$set(e,"timeEnd",a)},expression:"item.timeEnd"}})],1)],1)],1)],1)],1)],1)],1)}))],1)],1)]):t._e()],1),a("Modal",{attrs:{title:"查看大图",width:"600"},on:{"on-cancel":t.bigImgCancel},model:{value:t.bigImgDialog,callback:function(e){t.bigImgDialog=e},expression:"bigImgDialog"}},[a("img",{staticStyle:{width:"100%"},attrs:{src:t.big_Image_url}})])],1)},n=[],s=a("7f80"),o=a("365c"),l=a("62a2"),r={name:"detailsView",components:{},props:{camp_Info:Object},data:function(){return{bigImgDialog:!1,big_Image_url:"",receiveRuleSetPage:!1,edit_info:{appid:"",campType:"",couponType:"",couponValueDesc:"",dateType:"",doorsillDesc:"",endDate:"",imgUrl:"",name:"",rules:"",startDate:"",status:"",ticketTemplateId:"",useDesc:"",ChangeDateType:"",ChangeStartDate:"",ChangeEndDate:"",ChangeStart:"",ChangeEnd:""},campId:"",imgUrl:"",url:o["g"],uploadList:[],uploadList1:[],camp_pageStatus:"",appId_info:[],currentChooseID:"",currentChooseName:"",edit_info1:{addRequiredScore:0,freeTimes:0,isLimitGrap:"0",isShow:"0",label:"",shareInvitedAwardAmount:0,shareInvitedCount:0,shareUseRakeBackPercent:0,sort:0,stockCount:"",totalGetLimit:0,isBlack:null},res_list:[],current:1,totalSize:0,pageNum:1,limit:10,status:"",daySum:"",currentid:"",next_modal:!1,campaginManagementPage:!1,campaginGrabInfoList:[{campId:"",limitCnt:1,timeEnd:"",timeStart:""}],campaginGrabInfo_campId:"",campaginGrabInfo_delId:[]}},created:function(){},methods:{init:function(){this.camp_pageStatus=this.getStore("camp_pageStatus"),this.getAppId(),this.getCampInfo(),this.dataProcessing(),this.campId=this.camp_Info.campId,this.updateTableList(),this.getTicketTemplate(),this.getCampaginGrabInfoList()},getCampInfo:function(){this.editInfo()},showBigImg:function(t){this.bigImgDialog=!0,this.big_Image_url=t},getTicketTemplate:function(){var t=this,e={dictCode:"send_channel"};Object(s["f"])("/system/sys-dict-data/list?pageNum="+this.pageNum+"&pageSize="+this.limit,e).then(function(e){200==e.code?t.res_list=e.data.records:t.$Message.error(e.msg)})},editInfo:function(){this.edit_info=this.camp_Info,this.edit_info.appid=this.camp_Info.appid,this.campId=this.camp_Info.campId,this.edit_info.name=this.camp_Info.name,this.edit_info.rules=this.camp_Info.rules.replace(/\\n/g,"\n"),this.edit_info.couponValueDesc=this.camp_Info.couponValueDesc.replace(/\\n/g,"\n"),this.edit_info.doorsillDesc=this.camp_Info.doorsillDesc.replace(/\\n/g,"\n"),this.edit_info.imgUrl=this.camp_Info.imgUrl,this.edit_info.couponImg=this.camp_Info.couponImg,this.edit_info.campType="57",this.edit_info.couponType=1==this.camp_Info.couponType?"1":2==this.camp_Info.couponType?"2":3==this.camp_Info.couponType?"3":4==this.camp_Info.couponType?"4":"5",this.edit_info.status=0==this.camp_Info.status?"0":1==this.camp_Info.status?"1":"-1",this.edit_info.ticketTemplateId=this.camp_Info.ticketTemplateId,this.currentChooseID=this.edit_info.ticketTemplateId,this.currentChooseName=this.edit_info.ticketName,this.edit_info.dateType=1==this.camp_Info.dateType?"1":"2",this.edit_info.startDate=this.camp_Info.startDate||"",this.edit_info.endDate=this.camp_Info.endDate||"",this.edit_info.useDesc=this.camp_Info.useDesc,this.edit_info.ChangeDateType=this.camp_Info.ChangeDateType,this.edit_info.ChangeStartDate=this.camp_Info.ChangeStartDate,this.edit_info.ChangeEndDate=this.camp_Info.ChangeEndDate,this.edit_info.ChangeStart=this.camp_Info.ChangeStart,this.edit_info.ChangeEnd=this.camp_Info.ChangeEnd,console.log(this.edit_info.ChangeDateType)},showReceiveRuleSetStatus:function(t){},getAppId:function(){var t=this;Object(s["c"])("/miniapp/miniapp-info/store").then(function(e){200==e.code?t.appId_info=e.data:t.$Message.error(e.msg)})},dataProcessing:function(){var t=Object(l["c"])(new Date(this.edit_info.startDate),"yyyy-MM-dd hh:mm:ss"),e=Object(l["c"])(new Date(this.edit_info.endDate),"yyyy-MM-dd hh:mm:ss"),a=new Date(t.replace(/-/g,"/")),i=new Date(e.replace(/-/g,"/")),n=i.getTime()-a.getTime();this.daySum=parseInt(n/864e5)},updateTableList:function(){var t=this,e={campId:this.campId};Object(s["f"])("/campaignReceiveRule/queryRule?campId="+this.campId,e).then(function(e){e.isSuccess?e.data?(t.edit_info1=e.data,t.campId=e.data.campId,t.edit_info1.isLimitGrap=e.data.isLimitGrap.toString(),t.edit_info1.sendChannel=e.data.sendChannel.toString(),t.edit_info1.stockCount=e.data.stockCount.toString(),t.edit_info1.isBlack=e.data.isBlack.toString(),t.edit_info1.shareUseRakeBackPercent=100*e.data.shareUseRakeBackPercent,t.status="edit",t.currentid=e.data.label):(t.edit_info1={addRequiredScore:0,freeTimes:0,isLimitGrap:"0",isShow:"0",label:"",shareInvitedAwardAmount:0,shareInvitedCount:0,shareUseRakeBackPercent:0,orderBy:9999,stockCount:"",totalGetLimit:0},t.status="add"):t.$Message.error(e.msg)})},getCampaginGrabInfoList:function(){var t=this,e={campId:this.campId};Object(s["f"])("/campaginGrabInfo/selectCampaginGrabInfoByCampId?campId="+this.campId,e).then(function(e){200==e.code&&(e.data.length>0?t.campaginGrabInfoList=e.data:t.campaginGrabInfoList=[{campId:t.campId,id:"",limitCnt:1,timeEnd:"",timeStart:""}])})},bigImgCancel:function(){this.bigImgDialog=!1}},mounted:function(){this.init()}},d=r,c=a("2877"),p=Object(c["a"])(d,i,n,!1,null,null,null);p.options.__file="detailsView.vue";e["default"]=p.exports}}]);