import React,{Component} from 'react';
import Home from "./page/Home";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Redirect from="*" to={Home}/>
            </Switch>
        </Router>
    )
  }
}

export default App;
