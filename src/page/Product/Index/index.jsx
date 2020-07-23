import React,{Component} from "react";
import PageTitle from "../../../component/PageTitle";
import Pagination from "../../../util/pagination";
import HMUtil from '../../../util/hm.jsx';
import Product from "../../../service/product-service";
import TableList from "../../../util/TableList";
import {Link} from 'react-router-dom';
import './index.scss';
import ListSearch from "./ListSearch";

const hm = new HMUtil();
const product = new Product();


class ProductList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list : [],
            pageNum : 1,
            listType : 'list'
        }
    }

    componentDidMount() {
        this.loadProductList();
    }

    // load product list
    loadProductList = () => {
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        // search by keyword
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
        }

        product.getProductList(listParam).then((res)=>{
            this.setState(res);
        }).catch((errMsg)=>{
            this.setState({
                list:[]
            })
            hm.errorTips(errMsg);
        })
    }

    // search
    onSearch = (searchType,searchKeyword) => {
        let listType = searchKeyword === "" ? "list" : "search";
        this.setState({
            listType:listType,
            pageNum : 1,
            searchType : searchType,
            searchKeyword : searchKeyword
        },()=>{
            this.loadProductList();
        })
    }

    // change page number
    onPageNumChange = (pageNum) =>{
        this.setState({
            pageNum : pageNum
        },()=>{
            this.loadProductList();
        })
    }

    // change product status
    onSetProductStatus = (e,productId,currentStatus) =>{
        let newStatus = currentStatus === 1 ? 2 : 1,
            conformTips = currentStatus === 1
                ? 'Do you want to pull it from the shelves?'
                : 'Do you want to put it on shelves？'
        if(window.confirm(conformTips)){
            product.setProductStatus({
                productId:productId,
                status:newStatus
            }).then(res => {
                hm.successTips(res);
                this.loadProductList();
            }).catch(errMsg => {
                hm.errorTips(errMsg);
            })
        }
    }

    render() {
        let tableHeads = [
            {name:'ID',width:'10%'},
            {name:'Name',width:'25%'},
            {name:'Price',width:'20%'},
            {name:'Status',width:'30%'},
            {name:'Operation',width:'15%'},
        ]
        return(
            <div id="page-wrapper">
                <PageTitle title="Product List">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"/>&nbsp;
                            <span>Add Product</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType,searchKeyword)=>{this.onSearch(searchType,searchKeyword)}}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((item,index)=>{
                            return(
                                <tr key={index}>
                                    <td className="text-center">{item.id}</td>
                                    <td className="text-center">
                                        {item.name}
                                        {/*<p>{item.subtitle}</p>*/}
                                    </td>
                                    <td className="text-center">$ {item.price}</td>
                                    <td className="text-center">
                                        <p className="status">{item.status === 1 ? 'Available' : 'Remove'}</p>
                                        <button
                                            onClick={(e)=>this.onSetProductStatus(e,item.id,item.status)}
                                            className='btn btn-xs'
                                        >{item.status === 1 ? 'Remove' : 'Available'}</button>
                                    </td>
                                    <td className="text-center">
                                        <Link className="operation" to={`/product/detail/${item.id}`}>Detail</Link>
                                        <Link className="operation" to={`/product/save/${item.id}`}>Edit</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>
                <Pagination
                    current={this.state.pageNum}
                    total={this.state.total}
                    onChange = { pageNum => this.onPageNumChange(pageNum)}
                />
            </div>
        )
    }

}

export default ProductList;