import HMUtil from '../util/hm';

const hm = new HMUtil();

class Product {
    // get product list
    getProductList(listParam){
        let url = '',
            data = {};
        if(listParam.listType === 'list'){
            url =  '/manage/order/list.do';
            data.pageNum = listParam.pageNum;
        }else if (listParam.listType === 'search'){
            url =  '/manage/order/search.do';
            data.pageNum = listParam.pageNum;
            data.orderNo = listParam.orderNo;
        }
        return hm.request({
            type : "post",
            url  : url,
            data : data
        })
    }

    // get order detail
    getOrderDetail(orderNumber){
        return hm.request({
            type : "post",
            url  : '/manage/order/detail.do',
            data : {
                orderNo : orderNumber
            }
        })
    }

    //
    sendGoods(orderNumber){
        return hm.request({
            type : "post",
            url  : '/manage/order/send_goods.do',
            data : {
                orderNo : orderNumber
            }
        })
    }
}

export default Product;