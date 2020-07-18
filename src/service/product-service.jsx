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

    // validate data
    checkProduct = (product) =>{
        let result = { status:true, msg:'Success' };
        // check product name
        if (typeof product.name !== 'string' || product.name.length ===0){
            return {
                status : false,
                msg : 'Product name is required!'
            }
        }
        // check subtitle
        if (typeof product.subtitle !== 'string' || product.subtitle.length ===0){
            return {
                status : false,
                msg : 'Product description is required!'
            }
        }
        // check category ID
        if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
            return {
                status : false,
                msg : 'Please select category'
            }
        }
        // check price
        if (typeof product.price !== 'number' || !(product.price >= 0)){
            return {
                status : false,
                msg : 'Price is not correct!'
            }
        }
        // check stock
        if (typeof product.stock !== 'number' || !(product.stock >= 0)){
            return {
                status : false,
                msg : 'Stock is not correct!'
            }
        }
        return result;
    }

    // save product
    saveProduct = (product) => {
        console.log(product);
        return hm.request({
            type : "post",
            url  : '/manage/product/save.do',
            data : product
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