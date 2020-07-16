import HMUtil from '../util/hm';

const hm = new HMUtil();

class Product {
    // get product list
    getProductList(pageNum){
        return hm.request({
            type : "post",
            url  : 'http://admintest.happymmall.com/manage/product/list.do',
            data : {
                pageNum : pageNum
            }
        })
    }
}

export default Product;