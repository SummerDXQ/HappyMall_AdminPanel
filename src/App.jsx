import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from "./page/Home";
import Layout from "./component/Layout";
import Login from "./page/Login";

class App extends Component {
  render() {
    return(
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/" render = {(props) => (
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/product" component={Home}/>
                            <Route exact path="/product_category" component={Home}/>
                            <Route exact path="/order" component={Home}/>
                            <Route exact path="/user" component={Home}/>
                            <Redirect from="*" to="/"/>
                        </Switch>
                    </Layout>
                )}/>
            </Switch>
        </Router>
    )
  }
}

export default App;
