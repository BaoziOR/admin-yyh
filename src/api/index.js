// 统一请求路径前缀在libs/axios.js中修改
import {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    uploadFileRequest,
    loginRequest
} from "@/libs/axios";

//本地访问地址
//export const baseUrl = "http://127.0.0.1:8088/zex-mgr";


//  开发测试环境
// export const baseUrl = "http://pre-release.sweetmartmarketing.com:8088/zex-mgr";

// export const downloadUrl = "http://pre-release.sweetmartmarketing.com/zex-mgr";


//测试环境1

export const baseUrl = "http://127.0.0.1:8088/zex-mgr"

// export const baseUrl = "http://smart1.sweetmartmarketing.com:7088/zex-mgr"


// export const downloadUrl = "http://smart1.sweetmartmarketing.com:7088/zex-mgr"



//测试环境2
// export const baseUrl = "http://smart.sweetmartmarketing.com:8088/zex-mgr";

// export const downloadUrl = "http://smart.sweetmartmarketing.com:8088/zex-mgr";


//正式环境
// export const baseUrl = "http://w.52iuh.com:8080/zex-mgr";

// export const downloadUrl = "http://w.52iuh.com:8080/zex-mgr";



//上传图片地址
export const uploadOperationImage2AliOssURl =
    baseUrl + "/operation/operation-info/uploadOperationImage2AliOss";

// 登陆
export const login = params => {
    return loginRequest("/login", params);
};

//解锁
export const unlock = params => {
    return loginRequest("/login", params);
};

// 获取菜单
export const getMenuList = params => {
    return postRequest("/system/sys-menu/leftTree", params);
};

// 个人中心编辑
export const userInfoEdit = params => {
    return postRequest("/user/edit", params);
};
// 个人中心修改密码
export const changePass = params => {
    return postRequest("/user/modifyPass", params);
};

//上传图片到阿里云图片服务器

export const uploadOperationImage2AliOss = params => {
    return postRequest(
        "/operation/operation-info/uploadOperationImage2AliOss",
        params
    );
};

export const importShopInfo = params => {
    return uploadFileRequest("/system/sys-shop-info/importShopInfo", params);
};