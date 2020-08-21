import {axiosHttp} from "./http"
const getNewRegionInfo = "https://apis.map.qq.com/ws/district/v1/list?"; // 获取地址
const test = "//vps.beta.ule.com/vpsRedirectService/getNewRegionInfo?";
const ReceiveCoupon = "//vps.beta.ule.com/vpsYzgMobile/award/NineOneNineReceiveCoupon.do"

// axios封装方法
// exp1、exp2调用方法在加载二维码页面
// 实例化一个类
const _axiosHttp = new axiosHttp()
//exp1
class Product { // 在页面使用Product时同样需要实例化一下
    getList1(params){
        return _axiosHttp.request({
            Type: 'post',
            url: ReceiveCoupon,
            data: params || ""
        })
    }
}
// exp2  在页面中使用是只需引入不用实例化
const getList2 = (params) => {
    return _axiosHttp.request({
        Type: 'post',
        url: ReceiveCoupon,
        data: params || ""
    })
}


export {
    getNewRegionInfo,
    test,
    Product,
    getList2
}