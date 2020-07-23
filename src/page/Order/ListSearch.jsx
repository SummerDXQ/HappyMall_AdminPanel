import React,{Component} from "react";

class ListSearch extends Component{
    constructor(props) {
        super(props);
        this.state = {
            orderNumber : ''
        }
    }

    // form value change
    onValueChange = (e) =>{
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        })
    }

    // click search button
    onSearch = () =>{
        this.props.onSearch(this.state.orderNumber);
    }

    onSearchKeywordKeyUp = (e) => {
        if(e.keyCode === 13){
            this.onSearch();
        }
    }

    render() {
        return(
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select
                                className="form-control"
                            >
                                <option value="productId">search by ID</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="order number"
                                name="orderNumber"
                                onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                                onChange={(e) => this.onValueChange(e)}
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={(e) => this.onSearch()}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default ListSearch;