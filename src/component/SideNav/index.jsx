import React,{Component} from "react";
import {Link, NavLink} from 'react-router-dom';

class SideNav extends Component{
    render() {
        return(
                <div className="navbar-default navbar-side">
                    <div className="sidebar-collapse">
                        <ul className="nav">
                            <li>
                                <NavLink activeClassName="active-menu" exact to="/">
                                    <i className="fa fa-dashboard"/>
                                    <span>Home</span>
                                </NavLink>
                            </li>
                            <li className="active">
                                <Link to="/product">
                                    <i className="fa fa-list"/>
                                    <span>Product</span>
                                    <span className="fa arrow"/>
                                </Link>
                                <ul className="nav nav-second-level collapse in">
                                    <li>
                                        <NavLink to="/product" activeClassName="active-menu">Product</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/product_category" activeClassName="active-menu">Category</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="active">
                                <Link to="/order">
                                    <i className="fa fa-check-square-o"/>
                                    <span>Order</span>
                                    <span className="fa arrow"/>
                                </Link>
                                <ul className="nav nav-second-level collapse in">
                                    <li>
                                        <NavLink to="/order" activeClassName="active-menu">Order</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="active">
                                <Link to="/user">
                                    <i className="fa fa-user-o"/>
                                    <span>User</span>
                                    <span className="fa arrow"/>
                                </Link>
                                <ul className="nav nav-second-level collapse in">
                                    <li>
                                        <NavLink to="/user" activeClassName="active-menu">User</NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
        );
    }
}

export default SideNav;