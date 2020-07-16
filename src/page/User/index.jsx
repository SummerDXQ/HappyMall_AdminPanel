import React,{Component} from "react";
import PageTitle from "../../component/PageTitle";
import {Link} from 'react-router-dom';
import Pagination from "../../util/pagination";
import HMUtil from '../../util/hm.jsx';
import User from "../../service/user-service";
import TableList from "../../util/TableList";

const hm = new HMUtil();
const user = new User();


class UserList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list : [],
            pageNum : 1,
            // firstLoading : true
        }
    }

    componentDidMount() {
        this.loadUserList();
    }

    loadUserList = () => {
        user.getUserList(this.state.pageNum).then((res)=>{
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
        return(
            <div id="page-wrapper">
                <PageTitle title="User List"/>
                <TableList tableHeads={["ID","Username","Email","Phone","Register Time",]}>
                    {listBody}
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

export default UserList;