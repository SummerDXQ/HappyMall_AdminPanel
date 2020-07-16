import HMUtil from '../util/hm';

const hm = new HMUtil();

class Product {
    // get product list
    getProductList(pageNum){
        return hm.request({
            type : "post",
            url  : '/manage/product/list.do',
            data : {
                pageNum : pageNum
            }
        })
    }

    // change product status
    setProductStatus(productInfo){
        return hm.request({
            type : "post",
            url  : '/manage/product/set_sale_status.do',
            data : productInfo
        })
    }
}

export default Product;