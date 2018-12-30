const wJax = {
  xhr: window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject(),
  send: send,
  sucsess: sucsess,
  setTimeOut: setTimeOut,
  send_promise: send_promise,
  then: then,
  cache: Cache
};
/**
 * 发起请求
 * @param {JSON} config 请求配置文件
 * @param {String} methord http请求
 * @param {String} url 请求地址
 * @param {JSON} data 要传输的数据
 * @param {boolean} sync 同步或者异步，默认异步
 * @param {Number} timeOut 超时，默认100ms
 */
function send(config) {
  let { methord, url, data, sync = true, timeOut = 100 } = config;
  methord = methord.toLowerCase();
  let formdata = new FormData();
  if (methord == "get") {
    let arr = [];
    for (let k in data) {
      let ser = `${k}=${data[k]}`;
      arr.push(ser);
    }
    !url.includes("?")
      ? (url = `${url}?${arr.join("&")}`)
      : (url = `${url}${arr.join("&")}`);
  } else if (methord == "post")
    for (let val in data) {
      formdata.append(val, data[val]);
    }
  else throw new Error("HTTP Methord Error");
  this.setTimeOut(timeOut);
  this.xhr.open(methord, url, sync);
  try {
    if (methord == "get") this.xhr.send(null);
    else if (methord == "post") this.xhr.send(formdata);
  } catch (error) {
    this.error = error;
  }
  return this;
}
/**
 * 发送请求之后的回调函数
 * @param {callback} reslove 发送请求之后的回调函数
 */
function sucsess(reslove) {
  this.xhr.onreadystatechange = () => {
    if (this.xhr.readyState == 4 && this.xhr.status == 200) {
      reslove(this.xhr.responseText);
    }
  };
  return this;
}
/**
 * 设置超时时间
 * @param {Number} timeOut 超时时间
 */
function setTimeOut(timeOut) {
  this.xhr.timeOut = timeOut;
  this.xhr.ontimeout = () => {
    console.log("请求超时");
  };
}
/**
 *实现类似promise对象的操作，使用then方法来进行对回调函数的拆分
 * @param {Function} reslove 成功时执行的回调函数
 * @param {Function} reject 失败时执行的回调函数
 */
function then(reslove, reject) {
  if (!this.error) {
    this.sucsess(reslove);
  } else {
    reject(this.error);
  }
  return this;
}
/**
 * 捕获全局的异常，在回调函数中进行输出
 * @param {Function} error 捕获异常时执行的回调函数
 */
function Catch(error) {
  if (this.error) error(this.error);
  else return null;
}
