import $ from 'jquery';
class HMUtil {
    request(param){
        return new Promise((resolve,reject)=>{
            $.ajax({
                type : param.type || 'get',
                url  : param.url || '',
                dataType : param.dataType || 'json',
                data : param.data || null,
                success : res => {
                    console.log(res.status);
                    if(res.status === 0){
                        resolve(res.data,res.msg);
                    }else if(res.status === 10){
                         this.doLogin();
                    }else {
                        reject(res.msg || res.data);
                    }
                },
                error : err => {
                    reject(err.statusText);
                }
            })
        })

    }
    doLogin = () => {
        window.location.href = '/login?redirect=' + window.location.pathname ;
    }

    // get url parameter
    getUrlParam = (name) => {
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        return result ? result[2] : null;
    }
    // success tips
    successTips = (successMsg) => {
        alert(successMsg || 'Successfully operate!');
    }

    // error tips
    errorTips = (errMsg) => {
        alert(errMsg || 'Something wrong!');
    }

    // set local storage
    setStorage(name,data){
        let dataType = typeof data;
        if (dataType === 'object'){
            window.localStorage.setItem(name,JSON.stringify(data))
        }else if(['number','string', 'boolean'].indexOf(dataType)){
            window.localStorage.setItem(name,data)
        }else {
            alert('cannot store in localstorage')
        }
    }

    // get local storage
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }else {
            return '';
        }
    }

    // remove localstorage
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default HMUtil;