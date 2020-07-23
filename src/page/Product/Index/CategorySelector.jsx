import React,{Component} from 'react';
import './categorySelector.scss';
import HMUtil from '../../../util/hm.jsx';
import Product from "../../../service/product-service";

const hm = new HMUtil();
const product = new Product();

class CategorySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList:[],
            firstCategoryId:0,
            secondCategoryList:[],
            secondCategoryId:0,
        }
    }

    componentDidMount() {
        this.loadFirstCategory();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
        if(!categoryIdChange || !parentCategoryIdChange){
            return;
        }
        // only has one layer
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId:nextProps.categoryId,
                secondCategoryId:0,
            })
        }
        // has two layer
        else {
            this.setState({
                firstCategoryId:nextProps.parentCategoryId,
                secondCategoryId:nextProps.categoryId,
            },()=>{
                parentCategoryIdChange && this.loadSecondCategory();
            })
        }
    }

    // load first category
    loadFirstCategory = () => {
        product.getCategoryList().then(res=>{
            this.setState({
                firstCategoryList : res
            })
        }).catch(errMsg => {
            hm.errorTips(errMsg);
        })
    }
    // load second category
    loadSecondCategory = () =>{
        product.getCategoryList(this.state.firstCategoryId).then(res=>{
            this.setState({
                secondCategoryList : res
            })
        }).catch(errMsg => {
            hm.errorTips(errMsg);
        })
    }

    // change first category
    onFirstCategoryChange = (e) =>{
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId : newValue,
            secondCategoryId : 0,
            secondCategoryList : []
        },()=>{
            // update secondCategoryList
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        });
    }

    // change second category
    onSecondCategoryChange = (e) => {
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId : newValue,
        },()=>{
            this.onPropsCategoryChange();
        });
    }

    onPropsCategoryChange = () => {
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        if(this.state.secondCategoryId){
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.secondCategoryId);
        }
        // only have first category
        else {
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId,0);
        }
    }

    render() {
        return(
            <div className="col-md-10">
                <select
                    className="form-control cate-select"
                    onChange={(e)=>{this.onFirstCategoryChange(e)}}
                    value={this.state.firstCategoryId}
                    readOnly={this.props.readOnly}
                >
                    <option value="">select-first-category</option>
                    {
                        this.state.firstCategoryList.map((item,index)=>{
                            return <option value={item.id} key={index}>{item.name}</option>
                        })
                    }
                </select>
                {
                    this.state.secondCategoryList.length > 0 ?
                        <select
                            className="form-control cate-select"
                            value={this.state.secondCategoryId}
                            onChange={(e)=>{this.onSecondCategoryChange(e)}}
                            readOnly={this.props.readOnly}
                        >
                            <option value="">select-second-category</option>
                            {
                                this.state.secondCategoryList.map((item,index)=>{
                                    return <option value={item.id} key={index}>{item.name}</option>
                                })
                            }
                        </select>
                        : null
                }
            </div>
        )
    }
}

export default CategorySelector;
