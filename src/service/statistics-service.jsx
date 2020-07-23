import HMUtil from '../util/hm';

const hm = new HMUtil();

class Statistics {
    getHomeCount(){
        return hm.request({
            url : 'http://admintest.happymmall.com/manage/statistic/base_count.do',
        })
    }
}

export default Statistics;