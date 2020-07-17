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
            conformTips = currentStatus === 1 ? '确定要下架该商品？' : '确定要上架该商品？'
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
            {name:'Name',width:'50%'},
            {name:'Price',width:'10%'},
            {name:'Status',width:'15%'},
            {name:'Operation',width:'15%'},
        ]
        return(
            <div id="page-wrapper">
                <PageTitle title="Product List"/>
                <ListSearch onSearch={(searchType,searchKeyword)=>{this.onSearch(searchType,searchKeyword)}}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((item,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>
                                        <p>{item.name}</p>
                                        <p>{item.subtitle}</p>
                                    </td>
                                    <td>$ {item.price}</td>
                                    <td>
                                        <p>{item.status === 1 ? '在售' : '已下架'}</p>
                                        <button
                                            onClick={(e)=>this.onSetProductStatus(e,item.id,item.status)}
                                            className='btn btn-xs btn-warning'
                                        >{item.status === 1 ? '下架' : '上架'}</button>
                                    </td>
                                    <td>
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