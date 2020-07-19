import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Product from "./Index";
import ProductSave from "./Index/ProductSave";
import ProductDetail from "./Index/ProductDetail";
import CategoryList from "./CategoryList";

class ProductRouter extends Component {
    render() {
        return(
            <Switch>
                <Route path="/product/index" component={Product}/>
                <Route path="/product/save/:pid?" component={ProductSave}/>
                <Route path="/product/detail/:pid" component={ProductDetail}/>
                <Route path="/product_category/index/:categoryId?" component={CategoryList}/>
                <Redirect exact from="/product" to="/product/index"/>
                <Redirect exact from="/product_category" to="/product_category/index"/>
            </Switch>
        )
    }
}

export default ProductRouter;
