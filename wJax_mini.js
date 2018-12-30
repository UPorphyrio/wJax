(() => {
  class wJax {
    constructor(config) {
      this.xhr = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject();
      this.error = null;
      if (config != undefined) this.send(config);
    }
    send(config) {
      let {
        methord,
        url,
        data,
        sucsess,
        Catch,
        sync = true,
        timeOut = 100
      } = config;
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
      else this.error = "HTTP Methord Error";
      this.setTimeOut(timeOut);
      this.xhr.open(methord, url, sync);
      try {
        if (methord == "get") {
          this.xhr.send(null);
          this.sucsess(sucsess);
        } else if (methord == "post") {
          this.xhr.send(formdata);
          this.sucsess(sucsess);
        }
      } catch (error) {
        this.error = error;
      }
      if (Catch) this.catch(Catch);
      return this;
    }
    sucsess(reslove) {
      this.xhr.onreadystatechange = () => {
        if (this.xhr.readyState == 4 && this.xhr.status == 200) {
          reslove(this.xhr.responseText);
        }
      };
      return this;
    }
    setTimeOut(timeOut) {
      this.xhr.timeOut = timeOut;
      this.xhr.ontimeout = () => {
        console.log("请求超时");
      };
    }
    then(reslove, reject) {
      if (!this.error) {
        this.sucsess(reslove);
      } else {
        reject(this.error);
      }
      return this;
    }
    catch(error) {
      if (this.error) error(this.error);
      else return null;
    }
  }
  window.wJax = wJax;
})();
