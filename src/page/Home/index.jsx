import React,{Component} from "react";
import './index.css';
import PageTitle from "../../component/PageTitle";

class Home extends Component{
    render() {
        return(
            <div id="page-wrapper">
                <PageTitle title="Home">
                    <button className="btn btn-warning">test</button>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        body
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;