import React,{Component} from "react";
import PageTitle from "../../../component/PageTitle";
import {Link} from 'react-router-dom';
import Pagination from "../../../util/pagination";
import HMUtil from '../../../util/hm.jsx';
import Product from "../../../service/product-service";

const hm = new HMUtil();
const user = new Product();


class ProductList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list : [],
            pageNum : 1,
            firstLoading : true
        }
    }

    componentDidMount() {
        this.loadProductList();
    }

    loadProductList = () => {
        user.getProductList(this.state.pageNum).then((res)=>{
            this.setState(res,()=>{
                this.setState({
                    firstLoading:false
                })
            });
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

    render() {
        let listBody = this.state.list.map((item,index)=>{
            return(
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{new Date(item.createTime).toLocaleString()}</td>
                </tr>
            );
        });

        let listError = (
            <tr>
                <td colSpan="5" className="text-center">
                    {this.state.firstLoading ? 'Loading...' : 'No result'}
                </td>
            </tr>
        );

        let tableBody = this.state.list.length ? listBody : listError;
        return(
            <div id="page-wrapper">
                <PageTitle title="Product List"/>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-border">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Register Time</th>
                            </tr>
                            </thead>
                            <tbody>
                            {}
                            </tbody>
                        </table>
                    </div>
                </div>
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