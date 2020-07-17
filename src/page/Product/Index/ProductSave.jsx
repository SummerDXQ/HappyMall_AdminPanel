import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
// import Product from "./Index";
import PageTitle from "../../../component/PageTitle";
import HMUtil from '../../../util/hm.jsx';
import Product from "../../../service/product-service";
import CategorySelector from "./CategorySelector";

const hm = new HMUtil();
const product = new Product();

class ProductSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId : 0,
            parentCategoryId:0
        }
    }

    onCategoryChange = (categoryId,parentCategoryId) => {

    }

    render() {
        return(
            <div id="page-wrapper">
                <PageTitle title="Add product"/>
                <form className="form-horizontal">
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
                                Image
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Detail</label>
                            <div className="col-md-3">
                                Detail
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProductSave;
