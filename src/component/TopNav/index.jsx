import React,{Component} from "react";
import {Link} from 'react-router-dom';
import HMUtil from '../../util/hm.jsx';
import User from "../../service/user-service";
import {withRouter} from 'react-router-dom';

const hm = new HMUtil();
const user = new User();

class TopNav extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username : hm.getStorage('userInfo').username
        }
    }
    // logout
    onLogout = () =>{
        user.logout().then(res => {
            hm.removeStorage('userInfo');
            this.props.history.push('/login');
        }).catch(errMsg => {
            hm.errorTips(errMsg);
        })
    }
    render() {
        return(
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>Happy</b>Mall</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"/>
                            {
                                this.state.username
                                    ? <span>welcome, {this.state.username}</span>
                                    : <span>welcome</span>
                            }
                            <i className="fa fa-caret-down"/>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={()=>{this.onLogout()}}>
                                    <i className="fa fa-sign-out fa-fw"/>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(TopNav);