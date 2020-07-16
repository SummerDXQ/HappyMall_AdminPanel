import React,{Component} from "react";
import RcPagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

class Pagination extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    {/*current = {this.props.current}*/}
                    <RcPagination
                        {...this.props}
                        hideOnSinglePage
                        showQuickJumper
                    />
                </div>
            </div>
        );
    }
}

export default Pagination;