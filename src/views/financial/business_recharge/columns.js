// 商户预充值列表 商户类型 、 商户名称、 预充值余额（元）、 剩余U贝、 创建时间
export default [{
        title: "操作",
        align: "center",
        width: 180,
        fixed: "left",
        slot: "action"
    },
    // {
    //     title: "序号",
    //     type: 'index',
    //     width: 80,
    //     align: 'center'
    // },
    {
        title: "商户类型",
        key: "merchantTypeName",
        align: "center",
        width: 140
    },
    /**
     * merchantType:
     * 0 merchantName
     * 1 brandName
     */
    {
        title: "名称",
        key: "name",
        align: "center",
        width: 120
    },
    {
        title: "预充值余额（元）",
        key: "money",
        align: "center",
        minWidth: 100
    },
    {
        title: "剩余U贝",
        key: "ubay",
        align: "center",
        minWidth: 140
    },
    {
        title: "创建时间",
        key: "gmtCreate",
        align: "center",
        minWidth: 140
    },
]
// 资金明细列表
export const fundsColumns = [
    // {
    //     title: "序号",
    //     type: 'index',
    //     width: 80,
    //     align: 'center'
    // },
    {
        title: "变更前账户余额",
        key: "beforeAmount",
        align: "center",
        width: 150
    },

    /**
     * beforeAmount > afterAmount  => -changeAmount
     * 
     * */
    {
        title: "变更金额",
        key: "changeAmount",
        align: "center",
        width: 150
    },
    {
        title: "变更账户余额",
        key: "afterAmount",
        align: "center",
        width: 150
    },
    /**
     * changeType
        充值里面：changeType 0充值 1扣款    
        ubay里面：changeType 0兑换 1消耗 
    */
    {
        title: "类型",
        key: "changeTypeName",
        align: "center",
        minWidth: 80
    },
    {
        title: "备注",
        key: "remark",

        align: "center",
        minWidth: 140
    },
    {
        title: "操作时间",
        key: "gmtCreate",
        align: "center",
        minWidth: 140
    },
    {
        title: "操作人",
        key: "createBy",
        align: "center",
        minWidth: 120
    }
]



//  6.2.1 U贝管理列表
export const ubayMColumns = [
    // {
    //     title: "序号",
    //     type: 'index',
    //     width: 80,
    //     align: 'center'
    // },
    // status
    {
        title: "审核状态",
        key: "statusName",
        align: "center",
        minWidth: 100
    },
    /**
     * merchantType:
     * 0 merchantName
     * 1 brandName
     */
    {
        title: "名称",
        key: "name",
        align: "center",
        minWidth: 80
    },
    /**
     * changeType
        充值里面：changeType 0充值 1扣款    
        ubay里面：changeType 0兑换 1消耗 
    */
    {
        title: "类型",
        key: "changeTypeName",
        align: "center",
        minWidth: 80
    },

    {
        title: "变更前账户U贝",
        key: "beforeUbay",
        align: "center",
        width: 150
    },
    /**
     * changeType
     * 兑换0 addUbay
     * 消耗1 -reduceUbay
     */
    {
        title: "变更U贝",
        key: "addOrReduceUbay",
        align: "center",
        width: 150
    },
    {
        title: "变更后账户U贝",
        key: "afterUbay",
        align: "center",
        width: 150
    },

    {
        title: "备注",
        key: "remark",
        align: "center",
        minWidth: 140
    },
    {
        title: "操作时间",
        key: "gmtCreate",
        align: "center",
        minWidth: 160
    },
    {
        title: "操作人",
        key: "createBy",
        align: "center",
        minWidth: 120
    }
]


// 6.2.2 充值管理列表
export const rechargeMColumns = [{
        title: "操作",
        align: "center",
        width: 100,
        fixed: "left",
        slot: "action"
    },
    //  {
    //     title: "序号",
    //     type: 'index',
    //     width: 80,
    //     align: 'center'
    // },
    {
        title: "合同号",
        key: "contractNumber",
        align: "center",
        minWidth: 120
    },
    // status
    {
        title: "审核状态",
        key: "statusName",
        align: "center",
        minWidth: 100
    },
    /**
     * merchantType:
     * 0 merchantName
     * 1 brandName
     */
    {
        title: "名称",
        key: "name",
        align: "center",
        minWidth: 80
    },
    // changeType 0 充值 1 扣款
    /**
     * changeType
        充值里面：changeType 0充值 1扣款    
        ubay里面：changeType 0兑换 1消耗 
    */
    {
        title: "类型",
        key: "changeTypeName",
        align: "center",
        minWidth: 80
    },


    {
        title: "变更前账户余额",
        key: "beforeAmount",
        align: "center",
        width: 150
    },

    /**
     * beforeAmount > afterAmount  => -changeAmount
     * 
     * */
    {
        title: "变更金额",
        key: "changeAmount",
        align: "center",
        width: 150
    },
    {
        title: "变更账户余额",
        key: "afterAmount",
        align: "center",
        width: 150
    },
    {
        title: "操作时间",
        key: "gmtCreate",
        align: "center",
        minWidth: 160
    },
    {
        title: "操作人",
        key: "createBy",
        align: "center",
        minWidth: 120
    }
]



// U贝消耗明细表 
export const ubayColumns = [
    // {
    //     title: "序号",
    //     type: 'index',
    //     width: 80,
    //     align: 'center'
    // },
    {
        title: "变更前账户U贝",
        key: "beforeUbay",
        align: "center",
        width: 150
    },
    /**
     * changeType
     * 兑换0 addUbay
     * 消耗1 -reduceUbay
     */
    {
        title: "变更U贝",
        key: "addOrReduceUbay",
        align: "center",
        width: 150
    },
    {
        title: "变更后账户U贝",
        key: "afterUbay",
        align: "center",
        width: 150
    },
    /**
     * changeType
        充值里面：changeType 0充值 1扣款    
        ubay里面：changeType 0兑换 1消耗 
    */
    {
        title: "类型",
        key: "changeTypeName",
        align: "center",
        minWidth: 80
    },
    {
        title: "备注",
        key: "remark",

        align: "center",
        minWidth: 140
    },
    {
        title: "操作时间",
        key: "gmtCreate",
        align: "center",
        minWidth: 140
    },
    {
        title: "操作人",
        key: "createBy",
        align: "center",
        minWidth: 120
    }
]


export function division100(n) {
    return Math.floor10(n / 100, -2);
}