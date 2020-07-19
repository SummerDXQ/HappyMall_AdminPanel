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
                categoryName : categoryName
            }).then(res => {
                hm.successTips(res);
                this.loadCategoryList();
            }).catch(errMsg => {
                hm.errorTips(errMsg);
            })
        }
    }


    render() {
        console.log('render');
        let listBody = this.state.list.map((item,index)=>{
            return(
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                        <a
                            href="" className="operation"
                            onClick={()=>this.onUpdateName(item.id,item.name)}
                        >
                            Update Name
                        </a>
                        {
                            item.parentId === 0
                                ? <Link to={`/product_category/index/${item.id}`}>Children</Link>
                                : null
                        }
                    </td>
                </tr>
            );
        });
        return(
            <div id="page-wrapper">
                <PageTitle title="Category List"/>
                <div className="row">
                    <div className="col-md-12">
                        <p>Parent Category ID: {this.state.parentCategoryID}</p>
                    </div>
                </div>
                <TableList tableHeads={["ID","Category Name","Operation"]}>
                    {listBody}
                </TableList>
            </div>
        )
    }

}

export default CategoryList;