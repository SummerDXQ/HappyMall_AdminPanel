import React,{Component} from "react";
import PageTitle from "../../../component/PageTitle";
import {Link} from 'react-router-dom';
import HMUtil from '../../../util/hm.jsx';
import Product from "../../../service/product-service";
import TableList from "../../../util/TableList";

const hm = new HMUtil();
const product = new Product();


class CategoryList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list : [],
            parentCategoryID : this.props.match.params.categoryId || 0,
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.loadCategoryList();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let oldPath = this.props.location.pathname,
            newPath = nextProps.location.pathname,
            newId = nextProps.match.params.categoryId || 0;
        if(oldPath !== newPath){
            this.setState({
                parentCategoryID : newId
            },()=>{
                this.loadCategoryList();
            })
        }

    }

    // load category list
    loadCategoryList = () => {
        product.getCategoryList(this.state.parentCategoryID).then((res)=>{
            this.setState({
                list : res
            });
        }).catch((errMsg)=>{
            this.setState({
                list:[]
            })
            hm.errorTips(errMsg);
        })
    }

    // update category name
    onUpdateName = (categoryId,categoryName) =>{
        let newName = window.prompt('input new category name',categoryName);
        if (newName){
            product.updateCategoryName({
                categoryId : categoryId,
                categoryName : newName
            }).then(res => {
                hm.successTips("Successfully update category name!");
                this.loadCategoryList();
            }).catch(errMsg => {
                hm.errorTips(errMsg);
            })
        }
    }


    render() {
        let tableHeads = [
            {name:'ID',width:'30%'},
            {name:'Category Name',width:'30%'},
            {name:'Operation',width:'40%'},
        ];

        let listBody = this.state.list.map((item,index)=>{
            return(
                <tr key={index}>
                    <td className="text-center">{item.id}</td>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">
                        {/*<a href="" className="operation">*/}
                            <button className="btn operation" onClick={()=>this.onUpdateName(item.id,item.name)}>Update Name</button>
                        {/*</a>*/}
                        {
                            item.parentId === 0
                                ? <Link to={`/product_category/index/${item.id}`}><button className="btn">Children</button></Link>
                                : null
                        }
                    </td>
                </tr>
            );
        });
        return(
            <div id="page-wrapper">
                <PageTitle title="Category List">
                    <div className="page-header-right">
                        <Link to="/product_category/add" className="btn btn-primary">
                            <i className="fa fa-plus"/>&nbsp;
                            <span>Add Category</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>Parent Category ID: <span className="parentId">{this.state.parentCategoryID}</span></p>
                    </div>
                </div>
                <TableList tableHeads={tableHeads}>
                    {listBody}
                </TableList>
            </div>
        )
    }

}

export default CategoryList;