import {SHOW_LOGIN_FRAME} from "./types";
import { Loading } from 'element-ui';
import axios from "axios"
import message from '@/lib/message'

var loadingInstance;
axios.interceptors.request.use(function (config) {
        var loadOption = config.loadOption || false;
        if(loadOption){
            loadingInstance = Loading.service(loadOption);
        }
        return config;
    }, function (error) {
        loadingInstance.close();
        // 请求错误
        return Promise.reject(error);
    });

axios.interceptors.response.use(function (response) {
    if(loadingInstance){
        loadingInstance.close();
    }
    return response;
  }, function (error) {
    if(loadingInstance){
        loadingInstance.close();
    }
    // 响应错误
    return Promise.reject(error);
  });

var errFn = function(context, obj, err) {
    if (err.response.status === 400) {
        let errorDescription = err.response.data.errorDescription;
        let errArr = errorDescription.match(/\].+/g);
        let errText = '';

        if(errArr){
            errText = errArr[0].substring(1, errArr[0].length);
        }else{
            errText = errorDescription;
        }
        message.warning(errText);
    }
    else if (err.response.status === 401) {
        if (obj.isFrame) {
            context.commit(SHOW_LOGIN_FRAME);
        }
    } else {
        message.error(err.response.data.errorDescription);
    }
    return null;
}

export default {
    GET: function (context, obj) {
        return axios.get(obj.url, {
            params: obj.params,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            loadOption: obj.loadOption
        }).then(res => {
                return res;
        }).catch(err => {
            errFn(context, obj, err);
        });
    },
    POST(context, obj) {
        if (window.DanaUrl) {
            obj.url = window.DanaUrl(obj.url, ",dom=1,CT=sxml");
        }
        return axios.post(obj.url, 
            obj.params
        ).then(res => {
            return res;
        }).catch(err => {
        errFn(context, obj, err);
        });
    },
    PUT(context, obj) {
        if (window.DanaUrl) {
            obj.url = window.DanaUrl(obj.url, ",dom=1,CT=sxml");
        }
        return axios.put(obj.url, obj.params).then(res => {
            return res;
        }).catch(err => {
            errFn(context, obj, err);
        });
    },
    DELETE(context, obj) {
        if (window.DanaUrl) {
            obj.url = window.DanaUrl(obj.url, ",dom=1,CT=sxml");
        }
        return axios.delete(obj.url, {
            params: obj.params,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            loadOption: obj.loadOption
        }).then(res => {
            return res;
        }).catch(err => {
            errFn(context, obj, err);
        });
    }
};
