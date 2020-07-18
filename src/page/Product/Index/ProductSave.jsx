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
            categoryId : 0,
            parentCategoryId:0,
            subImages : []
        }
    }

    onCategoryChange = (categoryId,parentCategoryId) => {

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

    render() {
        return(
            <div id="page-wrapper">
                <PageTitle title="Add product"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Product Name</label>
                            <div className="col-md-5">
                                <input type="text" className="form-control" placeholder="product name"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Description</label>
                            <div className="col-md-5">
                                <input type="text" className="form-control" placeholder="description"/>
                            </div>
                        </div>

                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Category</label>
                            <CategorySelector
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
                                {/*<div className="input-group">*/}
                                {/*    <input type="number" className="form-control" placeholder="price"/>*/}
                                {/*    <span className="input-group-addon">元</span>*/}
                                {/*</div>*/}
                                <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="text" className="form-control" />
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
                                    <input type="number" className="form-control" placeholder="stock"/>
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
                                <RichEditor onValueChange={(value)=> this.onDetailValueChange(value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductSave;
