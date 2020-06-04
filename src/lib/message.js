import {Message} from 'element-ui'
import {Notification} from 'element-ui';

const IsPC = (function () {
      var userAgentInfo = navigator.userAgent;
      var Agents = ["Android", "iPhone",
                  "SymbianOS", "Windows Phone",
                  "iPad", "iPod"];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
              flag = false;
             break;
         }
     }
    return flag;
})();

export default {
    info(msg, timeout) {
        timeout = this.timeoutUtils(timeout);
        if(IsPC){
            Notification({title: "看这里", message: msg, type: "info", duration: timeout, offset: 70});
        }else{
            Message({title: "看这里", message: msg, type: "info", duration: timeout, offset: 70})
        }
    },
    error(msg, timeout) {
        timeout = this.timeoutUtils(timeout);
        if(IsPC){
            Notification({title: "错了哦", message: msg, type: "error", duration: timeout, offset: 70});
        }else{
            Message({title: "错了哦", message: msg, type: "error", duration: timeout, offset: 70});
        }
    },
    warning(msg, timeout) {
        timeout = this.timeoutUtils(timeout);
        if(IsPC){
            Notification({title: "警告", message: msg, type: "warning", duration: timeout, offset: 70});
        }else{
            Message({title: "警告", message: msg, type: "warning", duration: timeout, offset: 70});
        }
    },
    success(msg, timeout) {
        timeout = this.timeoutUtils(timeout);
        if(IsPC){
            Notification({title: "成功了哦", message: msg, type: "success", duration: timeout, offset: 70});
        }else{
            Message({title: "成功了哦", message: msg, type: "success", duration: timeout, offset: 70});
        }
    },
    openHtml(html, timeout) {
        timeout = this.timeoutUtils(timeout);
        Message({
            dangerouslyUseHTMLString: true,
            message: html,
            duration: timeout
        })
    },
    timeoutUtils(timeout) {
        if (timeout === undefined || timeout === '' || timeout === null) {
            return 3000;
        } else {
            return timeout;
        }
    },
}
