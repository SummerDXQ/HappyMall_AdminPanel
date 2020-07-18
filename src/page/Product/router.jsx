import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Product from "./Index";
import ProductSave from "./Index/ProductSave";

class ProductRouter extends Component {
    render() {
        return(
            <Switch>
                <Route path="/product/index" component={Product}/>
                <Route path="/product/save/:pid" component={ProductSave}/>
                <Redirect exact from="/product" to="/product/index"/>
            </Switch>
        )
    }
}

export default ProductRouter;
