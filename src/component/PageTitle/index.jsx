import React,{Component} from "react";
import './index.scss';

class PageTitle extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = this.props.title + '- HappyMall';
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">{this.props.title}</h1>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default PageTitle;