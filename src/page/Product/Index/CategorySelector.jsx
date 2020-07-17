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
                >
                    <option value="">select-first</option>
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
                            onChange={(e)=>{this.onSecondCategoryChange(e)}}
                        >
                            <option value="">select-second</option>
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
