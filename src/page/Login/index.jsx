import React,{Component} from "react";
import './index.scss';
import User from "../../service/user-service";
import HMUtil from '../../util/hm.jsx';

const user = new User();
const hm = new HMUtil();

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            redirect: hm.getUrlParam('redirect') || '/'
        }
    }

    componentDidMount() {
        document.title = 'Login-HappyMall'
    }

    // username or password change
    onInputChange = (e) => {
        let inputName = e.target.name,
            inputValue = e.target.value;
        this.setState({
            [inputName] : inputValue
        })
    }

    // press enter to submit
    onInputKeyUp = (e) => {
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }

    // login
    onSubmit = () => {
        let loginInfo = {
            username: this.state.username,
            password:this.state.password
        }
        let checkResult = user.checkLoginInfo(loginInfo);
        // successfully validate
        if(checkResult.status){
            user.login(loginInfo).then(res => {
                hm.setStorage('userInfo',res);
                this.props.history.push(this.state.redirect);
            }).catch(errMsg => {
                hm.errorTips(errMsg)
            })
        }
        // validate failed
        else {
            hm.errorTips(checkResult.msg)
        }

    }

    render() {
        return(
            <div className="col-md-4 panel-container">
                    <div className="panel panel-default login-panel">
                        <div className="panel-heading">welcome - Happy Mall</div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <input type="text"
                                           name="username"
                                           className="form-control"
                                           placeholder="username"
                                           onKeyUp={e => this.onInputKeyUp(e)}
                                           onChange={e => this.onInputChange(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           name="password"
                                           className="form-control"
                                           placeholder="password"
                                           onKeyUp={e => this.onInputKeyUp(e)}
                                           onChange={e => this.onInputChange(e)}
                                    />
                                </div>
                                <button
                                    className="btn btn-lg btn-primary btn-block"
                                    onClick={e => {this.onSubmit(e)}}
                                >
                                    登录
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Login;