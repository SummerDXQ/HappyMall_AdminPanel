import React,{Component} from "react";
import './theme.css';
import './index.scss';
import TopNav from "../TopNav";
import SideNav from "../SideNav";

class Layout extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="wrapper">
                <TopNav/>
                <SideNav/>
                {this.props.children}
            </div>
        );
    }
}

export default Layout;