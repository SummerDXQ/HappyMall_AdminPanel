import HMUtil from '../util/hm';

const hm = new HMUtil();

class Product {
    // get product list
    getProductList(listParam){
        let url = '',
            data = {};
        if(listParam.listType === 'list'){
            url =  '/manage/product/list.do';
            data.pageNum = listParam.pageNum;
        }else if (listParam.listType === 'search'){
            url =  '/manage/product/search.do';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.keyword;
        }
        return hm.request({
            type : "post",
            url  : url,
            data : data
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

    //category
    getCategoryList(parentCategoryId){
        return hm.request({
            type : "post",
            url  : '/manage/category/get_category.do',
            data : {
                categoryId : parentCategoryId || 0
            }
        })
    }
}

export default Product;