import React,{Component} from "react";
import PageTitle from "../../component/PageTitle";
import Pagination from "../../util/pagination";
import HMUtil from '../../util/hm.jsx';
import Order from "../../service/order-service";
import TableList from "../../util/TableList";
import {Link} from 'react-router-dom';
// import './index.scss';
import ListSearch from "./ListSearch";

const hm = new HMUtil();
const order = new Order();


class OrderList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list : [],
            pageNum : 1,
            listType : 'list'  // list or search
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
            listParam.orderNo = this.state.orderNumber;
        }

        order.getProductList(listParam).then((res)=>{
            this.setState(res);
        }).catch((errMsg)=>{
            this.setState({
                list:[]
            })
            hm.errorTips(errMsg);
        })
    }

    // search
    onSearch = (orderNumber) => {
        let listType = orderNumber === "" ? "list" : "search";
        this.setState({
            listType:listType,
            pageNum : 1,
            orderNumber : orderNumber,
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

    render() {
        let tableHeads = ['Order NO.','Receiver','Status','Total Price','Create Time','Operation']
        return(
            <div id="page-wrapper">
                <PageTitle title="Order List"/>
                <ListSearch onSearch={(orderNumber)=>{this.onSearch(orderNumber)}}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((item,index)=>{
                            return(
                                <tr key={index}>
                                    <td className="text-center">
                                        <Link className="operation" to={`/order/detail/${item.orderNo}`}>{item.orderNo}</Link>
                                    </td>
                                    <td className="text-center">{item.receiverName}</td>
                                    <td className="text-center">
                                        {item.statusDesc === '未支付'?'Unpaid': item.statusDesc === '已取消'?'Cancelled':'Paid'}
                                    </td>
                                    <td className="text-center">$ {item.payment}</td>
                                    <td className="text-center">{item.createTime}</td>
                                    <td className="text-center">
                                        <Link className="operation" to={`/order/detail/${item.orderNo}`}>Detail</Link>
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

export default OrderList;