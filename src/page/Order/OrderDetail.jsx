import React,{Component} from 'react';
import PageTitle from "../../component/PageTitle";
import Order from "../../service/order-service";
import HMUtil from "../../util/hm";
import TableList from "../../util/TableList";
import {Link} from "react-router-dom";
import './detail.scss';

const order = new Order();
const hm = new HMUtil();

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber : this.props.match.params.orderNumber,
            orderInfo : {}
        }
    }

    componentDidMount() {
        this.loadOrderDetail()
    }

    loadOrderDetail = () => {
        // edict function
        order.getOrderDetail(this.state.orderNumber).then(res => {
                this.setState({
                    orderInfo : res
                });
            }).catch(errMsg => {
                console.log(errMsg);
            })
    }

    onSendGoods = () =>{
        if (window.confirm('Have already delivered?')){
            order.sendGoods(this.state.orderNumber).then(res => {
                hm.successTips('Successfully delivered')
            }).catch(errMsg => {
                console.log(errMsg);
            })
        }
    }

    render() {
        let receiverInfo = this.state.orderInfo.shippingVo || {},
            productList = this.state.orderInfo.orderItemVoList || [];
        let tableHeads = [
            {name:'Product images',width:'20%'},
            {name:'Product Info',width:'35%'},
            {name:'Unit Price',width:'15%'},
            {name:'Quantity',width:'15%'},
            {name:'Total',width:'15%'},
        ];
        return(
            <div id="page-wrapper">
                <PageTitle title="Order Detail"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Order Number</label>
                            <div className="col-md-5">
                                <p className="form-control-static border">{this.state.orderInfo.orderNo}</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Create Time</label>
                            <div className="col-md-5">
                                <p className="form-control-static border">{this.state.orderInfo.createTime}</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Receiver</label>
                            <div className="col-md-5">
                                <p className="form-control-static border">
                                    {receiverInfo.receiverName},
                                    {receiverInfo.receiverProvince}
                                    {receiverInfo.receiverCity}
                                    {receiverInfo.receiverAddress}
                                    {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Create Time</label>
                            <div className="col-md-5">
                                <p className="form-control-static border">{this.state.orderInfo.createTime}</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Order Status</label>
                            <div className="col-md-5">
                                <p className="form-control-static border">
                                    {this.state.orderInfo.paymentTypeDesc}
                                    {
                                        this.state.orderInfo.status === 20
                                            ? <button
                                                className="btn btn-default btn-sm btn-send-goods"
                                                onClick={this.onSendGoods}
                                            >Delivery</button>
                                            : null
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Payment Method</label>
                            <div className="col-md-5">
                                <p className="form-control-static border">
                                    {this.state.orderInfo.paymentTypeDesc = '在线支付'?'online payment' : 'cash'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Total Price</label>
                            <div className="col-md-5">
                                <p className="form-control-static border">
                                    $ {this.state.orderInfo.payment}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label">Product List</label>
                            <div className="col-md-10">
                                <TableList tableHeads={tableHeads}>
                                    {
                                        productList.map((item,index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        <img
                                                            className='p-img'
                                                            src={`${this.state.orderInfo.imageHost}${item.productImage}`}
                                                            alt={item.productName}
                                                        />
                                                    </td>
                                                    <td className="text-center">{item.productName}</td>
                                                    <td className="text-center">$ {item.currentUnitPrice}</td>
                                                    <td className="text-center">$ {item.quantity}</td>
                                                    <td className="text-center">{item.totalPrice}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </TableList>
                            </div>
                        </div>
                    </div>




                    {/*<div className="form-group">*/}
                    {/*    <div className="row">*/}
                    {/*        <label className="col-md-2 control-label">Category</label>*/}
                    {/*        <CategorySelector*/}
                    {/*            readOnly*/}
                    {/*            categoryId = {this.state.categoryId}*/}
                    {/*            parentCategoryId = {this.state.parentCategoryId}*/}
                    {/*        />*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                    {/*<div className="form-group">*/}
                    {/*    <div className="row">*/}
                    {/*        <label className="col-md-2 control-label">Price</label>*/}
                    {/*        <div className="col-md-3">*/}
                    {/*            <div className="input-group">*/}
                    {/*                <span className="input-group-addon">$</span>*/}
                    {/*                <input*/}
                    {/*                    readOnly*/}
                    {/*                    type="number"*/}
                    {/*                    className="form-control"*/}
                    {/*                    value={this.state.price}*/}
                    {/*                />*/}
                    {/*                <span className="input-group-addon">.00</span>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                    {/*<div className="form-group">*/}
                    {/*    <div className="row">*/}
                    {/*        <label className="col-md-2 control-label">Stock</label>*/}
                    {/*        <div className="col-md-3">*/}
                    {/*            <div className="input-group">*/}
                    {/*                <input*/}
                    {/*                    readOnly*/}
                    {/*                    type="number"*/}
                    {/*                    className="form-control"*/}
                    {/*                    value={this.state.stock}*/}
                    {/*                />*/}
                    {/*                <span className="input-group-addon">件</span>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                    {/*<div className="form-group">*/}
                    {/*    <div className="row">*/}
                    {/*        <label className="col-md-2 control-label">Image</label>*/}
                    {/*        <div className="col-md-10">*/}
                    {/*            {*/}
                    {/*                this.state.subImages.length > 0 ? this.state.subImages.map((item,index)=>{*/}
                    {/*                    return(*/}
                    {/*                        <div className="img-con" key={index}>*/}
                    {/*                            <img src={item.url} className='img'/>*/}
                    {/*                        </div>*/}
                    {/*                    )*/}
                    {/*                }) : <div>No image</div>*/}
                    {/*            }*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="form-group">*/}
                    {/*    <div className="row">*/}
                    {/*        <label className="col-md-2 control-label">Detail</label>*/}
                    {/*        <div className="col-md-10" dangerouslySetInnerHTML={{__html:this.state.detail}}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}

export default OrderDetail;
