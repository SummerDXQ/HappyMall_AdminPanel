import React,{Component} from "react";
import PageTitle from "../../../component/PageTitle";
import Pagination from "../../../util/pagination";
import HMUtil from '../../../util/hm.jsx';
import Product from "../../../service/product-service";
import TableList from "../../../util/TableList";
import {Link} from 'react-router-dom';
import './index.scss';

const hm = new HMUtil();
const product = new Product();


class ProductList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list : [],
            pageNum : 1,
            // firstLoading : true
        }
    }

    componentDidMount() {
        this.loadProductList();
    }

    loadProductList = () => {
        product.getProductList(this.state.pageNum).then((res)=>{
            this.setState(res);
        }).catch((errMsg)=>{
            this.setState({
                list:[]
            })
            hm.errorTips(errMsg);
        })
    }

    // change page number
    onPageNumChange = (pageNum) =>{
        this.setState({
            pageNum : pageNum
        },()=>{
            this.loadUserList();
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