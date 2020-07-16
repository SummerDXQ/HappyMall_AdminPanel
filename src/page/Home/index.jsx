import React,{Component} from "react";
import './index.scss';
import PageTitle from "../../component/PageTitle";
import {Link} from 'react-router-dom';
import Statistics from "../../service/statistics-service";
import HMUtil from '../../util/hm.jsx';

const statistics = new Statistics();
const hm = new HMUtil();

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            userCount:'-',
            productCount:'-',
            orderCount:'-',
        })
    }

    componentDidMount() {
        this.loadCount();
    }

    loadCount(){
        statistics.getHomeCount().then(res => {
            this.setState(res)
        }).catch(errMsg => {
            hm.errorTips(errMsg);
        })
    }

    render() {
        return(
            <div id="page-wrapper">
                <PageTitle title="Home"/>
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className="color-box brown">
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"/>
                                <span>User</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/product" className="color-box green">
                            <p className="count">{this.state.productCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"/>
                                <span>Product</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/order" className="color-box blue">
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"/>
                                <span>Order</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;