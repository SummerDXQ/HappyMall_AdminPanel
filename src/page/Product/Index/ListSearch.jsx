import React,{Component} from "react";

class ListSearch extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchType : 'productId',
            searchKeyword : ''
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
        this.props.onSearch(this.state.searchType, this.state.searchKeyword);
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
                                name="searchType"
                                onChange={(e) => this.onValueChange(e)}
                            >
                                <option value="productId">search by ID</option>
                                <option value="productName">search by name</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="关键词"
                                name="searchKeyword"
                                onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                                onChange={(e) => this.onValueChange(e)}
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={(e) => this.onSearch()}
                        >
                            搜索
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default ListSearch;