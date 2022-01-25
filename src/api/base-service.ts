/*
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-01-25 17:48:13
 * @LastEditors: 刘引
 * @LastEditTime: 2022-01-25 17:52:39
 */
/* 1.引入文件 */
import axios from "axios"; //引入 axios库
// @ts-ignore
import qs from "qs"; //引入 node中自带的qs模块（数据格式转换）
/* 2.全局默认配置 */
let baseURL;
let process: any;
// 判断开发环境（一般用于本地代理）
if (process.env.NODE_ENV === "development") {
  // 开发环境
  baseURL = "http://www.liulongbin.top:3006"; // 你设置的本地代理请求（跨域代理），下文会详细介绍怎么进行跨域代理
} else {
  // 编译环境
  if (process.env.type === "test") {
    // 测试环境
    baseURL = "http://www.liulongbin.top:3006";
  } else {
    // 正式环境
    baseURL = "http://www.liulongbin.top:3006";
  }
}
// 配置axios的属性
axios.defaults.timeout = 6000; // 请求超时时间1分钟
axios.defaults.baseURL = baseURL; // 你的接口地址
axios.defaults.responseType = "json";
axios.defaults.withCredentials = false; //是否允许带cookie这些
/*你也可以创建一个实例，然后在实例中配置相关属性，此方法和上面的方法一样，写法不同，怎么用随个人
 *喜好，我比较喜欢用这种方法，如下：
 */
const Axios = axios.create({
  baseURL: baseURL, // 后台服务地址
  timeout: 60000, // 请求超时时间1分钟
  responseType: "json",
  withCredentials: false, // 是否允许带cookie这些
});
/* 3.设置拦截器 */
/*如果不是用创建实例的方式配置，那么下面的Axios都要换成axios,也就是文件开头你用import引入axios
时定义的变量*/
Axios.interceptors.request.use(
  (config) => {
    //发送请求前进行拦截
    //  可在此处配置请求头信息
    // config.headers["appkey"] = "...";
    // config.headers["token"] = "...";
    if (config.method == "post") {
      /*数据转换: axios post方式默认是json格式提交数据，如果使用application/x-www-form-urlencoded数据格式提交，要用qs.stringify()进行转换,个人建议不在拦截器中全局配置，因为不够灵活，还有一点是，如果
设置了重新请求的配置，那么重新请求时，请求体中的config里面的传参就会被再次进行qs.stringify()转
换，会使得参数丢失，造成请求失败。*/
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (error) => {
    //console.log("错误的传参", 'fail');
    return Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  (res) => {
    //请求响应后拦截
    if (res.status == 200) {
      // 对响应数据做些事
      //alert("提交成功")
      return Promise.resolve(res);
    }
    return res;
  },
  (error) => {
    //alert("网络异常!") 404等问题可以在这里处理
    return Promise.reject(error);
  }
);
export default Axios;
