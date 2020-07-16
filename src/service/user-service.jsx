import HMUtil from '../util/hm';

const hm = new HMUtil();

class User {
    login(loginInfo){
        return hm.request({
            type : "post",
            url : 'http://admintest.happymmall.com/manage/user/login.do',
            data : loginInfo
        })
    }
    // check login data
    checkLoginInfo(loginInfo){
        let username = loginInfo.username.trim();
        let password = loginInfo.password.trim();
        // check username
        if (typeof username !== 'string' || username.length ===0){
            return {
                status : false,
                msg : 'Username is required!'
            }
        }
        // check password
        if (typeof password !== 'string' || password.length ===0){
            return {
                status : false,
                msg : 'Password is required!'
            }
        }
        return {
            status : true,
            mag : 'Successful'
        }
    }
    // logout
    logout(){
        return hm.request({
            type : "post",
            url : 'http://admintest.happymmall.com/user/logout.do',
        })
    }
}

export default User;