import React,{Component} from "react";
import PageTitle from "../../component/PageTitle";
import {Link} from 'react-router-dom';

class Error extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="page-wrapper">
                <PageTitle title="Something goes wrong!"/>
                <div className="row">
                    <div className="col-md-12">
                        <span>Cannot find it,</span>
                        <Link to="/">go to home page</Link>
                    </div>
                </div>
            </div>
        )
    }

}

export default Error;