import React,{Component} from 'react';
import PageTitle from "../../../component/PageTitle";
import HMUtil from '../../../util/hm.jsx';
import Product from "../../../service/product-service";
import CategorySelector from "./CategorySelector";
import FileUploader from "../../../util/FileUploader";
import './ProductSave.scss';
import RichEditor from "../../../util/RichEditor";

const hm = new HMUtil();
const product = new Product();

class ProductSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.pid,
            name:'',
            subtitle:'',
            categoryId : 0,
            parentCategoryId:0,
            subImages : [],
            price:'',
            stock:'',
            detail:'',
            status:1   // 1:available
        }
    }

    componentDidMount() {
        this.loadProduct()
    }

    loadProduct = () => {
        // edict function
        if (this.state.id){
            product.getProduct(this.state.id).then(res => {
                let images = res.subImages.split(',');
                res.subImages = images.map(item => {
                    return {
                        uri : item,
                        url : res.imageHost + item
                    }
                });
                res.defaultDetail = res.detail;
                this.setState(res);
            }).catch(errMsg => {

            })
        }
    }


    // product name,desc,price,stock change
    onValueChange = (e) => {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        })
    }

    onCategoryChange = (categoryId,parentCategoryId) => {
        this.setState({
            categoryId:categoryId,
            parentCategoryId:parentCategoryId
        })
    }

    // upload image successfully
    onUploadSuccess = (res) =>{
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages:subImages
        })
    }

    // upload image fail
    onUploadError = (errMsg) =>{
        hm.errorTips(errMsg || 'Upload image fail');
    }

    // delete image
    onImageDelete = (e) => {
        let index = parseInt(e.target.getAttribute('index')),
            subImage = this.state.subImages;
        subImage.splice(index,1);
        this.setState({
            subImage : subImage
        })
    }

    // rich editor change
    onDetailValueChange = (value) => {
        this.setState({
            detail : value
        })
    }

    getSubImagesString = () => {
        return this.state.subImages.map((item)=>item.uri)
    }

    // submit info
    onSubmit = () => {
        let productInfo = {
            name       : this.state.name,
            subtitle   : this.state.subtitle,
            categoryId : parseInt(this.state.categoryId),
            subImages  : this.getSubImagesString().join(','),
            detail     : this.state.detail,
            price      : parseFloat(this.state.price),
            stock      : parseInt(this.state.stock),
            status     : this.state.status,
        },
        productCheckResult = product.checkProduct(productInfo);
        if (this.state.id){
            productInfo.id = this.state.id;
        }
        // success
        if(productCheckResult.status){
            product.saveProduct(productInfo).then((res)=>{
                hm.successTips(res);
                this.props.history.push('/product/index');
            }).catch((errMsg)=>{
                hm.errorTips(errMsg)
            });
        }
        // fail
        else {
            hm.errorTips(productCheckResult.msg);
        }
    }

    render() {
        return(
            <div id="page-wrapper">
                <PageTitle title="Add product"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Product Name</label>
                            <div className="col-md-5">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="product name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={(e)=>{this.onValueChange(e)}}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Description</label>
                            <div className="col-md-5">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="description"
                                    name="subtitle"
                                    value={this.state.subtitle}
                                    onChange={(e)=>{this.onValueChange(e)}}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Category</label>
                            <CategorySelector
                                categoryId = {this.state.categoryId}
                                parentCategoryId = {this.state.parentCategoryId}
                                onCategoryChange={
                                    (categoryId,parentCategoryId)=>{this.onCategoryChange(categoryId,parentCategoryId)}
                                }
                            />
                        </div>

                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Price</label>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={this.state.price}
                                        onChange={(e)=>{this.onValueChange(e)}}
                                    />
                                    <span className="input-group-addon">.00</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Stock</label>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="stock"
                                        name="stock"
                                        value={this.state.stock}
                                        onChange={(e)=>{this.onValueChange(e)}}
                                    />
                                    <span className="input-group-addon">件</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Image</label>
                            <div className="col-md-10">
                                {
                                    this.state.subImages.length > 0 ? this.state.subImages.map((item,index)=>{
                                        return(
                                            <div className="img-con" key={index}>
                                                <img src={item.url} className='img'/>
                                                <i
                                                    className="fa fa-close"
                                                    index = {index}
                                                    onClick={(e)=>this.onImageDelete(e)}
                                                />
                                            </div>
                                        )
                                    }) : <div>Please upload image</div>
                                }
                            </div>
                            <div className="col-md-10 file-upload-content">
                                <FileUploader
                                    onSuccess = { res => this.onUploadSuccess(res)}
                                    onError = { err => this.onUploadError(err)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Detail</label>
                            <div className="col-md-3">
                                <RichEditor
                                    detail={this.state.detail}
                                    defaultDetail={this.state.defaultDetail}
                                    onValueChange={(value)=> this.onDetailValueChange(value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={(e)=>{this.onSubmit(e)}}
                            >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductSave;
