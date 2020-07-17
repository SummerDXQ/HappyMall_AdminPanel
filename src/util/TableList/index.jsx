import React,{Component} from "react";

class TableList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoading : true
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isFirstLoading : false
        })
    }

    render() {
        // table header
        let tableHeader = this.props.tableHeads.map((item,index) => {
            if(typeof item === 'object'){
                return <th key={index} width={item.width}>{item.name}</th>
            }else if(typeof item === 'string'){
                return <th key={index}>{item.name}</th>
            }
        });
        // list body
        let listBody = this.props.children;
        // list info
        let listInfo = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.isFirstLoading ? 'Loading...' : 'No result'}
                </td>
            </tr>
        );

        let tableBody = listBody.length ? listBody : listInfo;
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-border">
                        <thead>
                        <tr>
                            { tableHeader }
                        </tr>
                        </thead>
                        <tbody>
                            { tableBody }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TableList;