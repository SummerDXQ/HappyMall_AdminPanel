import React,{Component} from "react";
import PageTitle from "../../../component/PageTitle";
import {Link} from 'react-router-dom';
import HMUtil from '../../../util/hm.jsx';
import Product from "../../../service/product-service";
import TableList from "../../../util/TableList";

const hm = new HMUtil();
const product = new Product();


class AddCategory extends Component{
    constructor(props) {
        super(props);
        this.state = {
            categoryList : [],
            parentId : 0,
            categoryName : ''
        }
    }

    componentDidMount() {
        this.loadCategoryList();
    }

    // load category list
    loadCategoryList = () => {
        product.getCategoryList().then((res)=>{
            this.setState({
                categoryList : res
            });
        }).catch((errMsg)=>{
            hm.errorTips(errMsg);
        })
    }

    onValueChange = (e) => {
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name] : value
        })
    }

    onSubmit = () =>{
        let categoryName = this.state.categoryName.trim();
        if(categoryName){
            product.saveCategory({
                parentId: this.state.parentId,
                categoryName : categoryName
            }).then(res => {
                hm.successTips(res);
                this.props.history.push('/product_category/index')
            }).catch(errMsg => {
                hm.errorTips(errMsg);
            })
        }else {
            hm.errorTips('Category name is required!')
        }
    }

    render() {
        return(
            <div id="page-wrapper">
                <PageTitle title="Category List"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-md-2 control-label">Parent</label>
                                    <div className="col-md-5">
                                        <select
                                            name="parentId"
                                            className='form-control'
                                            onChange={(e)=>{this.onValueChange(e)}}
                                        >
                                            <option value="0">root category</option>
                                            {
                                                this.state.categoryList.map((item,index)=>{
                                                    return <option value={item.id} key={index}>root/{item.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-md-2 control-label">Category Name</label>
                                    <div className="col-md-5">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="category name"
                                            name="categoryName"
                                            value={this.state.name}
                                            onChange={(e)=>{this.onValueChange(e)}}
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
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AddCategory;