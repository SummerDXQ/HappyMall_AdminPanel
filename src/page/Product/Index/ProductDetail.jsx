import React,{Component} from 'react';
import PageTitle from "../../../component/PageTitle";
import Product from "../../../service/product-service";
import CategorySelector from "./CategorySelector";
import './ProductSave.scss';

const product = new Product();

class ProductDetail extends Component {
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
                this.setState(res);
            }).catch(errMsg => {
                console.log(errMsg);
            })
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
                                <p className="form-control-static">{this.state.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Description</label>
                            <div className="col-md-5">
                                <p className="form-control-static">{this.state.subtitle}</p>
                            </div>
                        </div>

                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Category</label>
                            <CategorySelector
                                readOnly
                                categoryId = {this.state.categoryId}
                                parentCategoryId = {this.state.parentCategoryId}
                            />
                        </div>

                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Price</label>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <input
                                        readOnly
                                        type="number"
                                        className="form-control"
                                        value={this.state.price}
                                    />
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
                                        readOnly
                                        type="number"
                                        className="form-control"
                                        value={this.state.stock}
                                    />
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
                                            </div>
                                        )
                                    }) : <div>No image</div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Detail</label>
                            <div className="col-md-10" dangerouslySetInnerHTML={{__html:this.state.detail}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;
