/*
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-01-25 17:36:26
 * @LastEditors: 刘引
 * @LastEditTime: 2022-01-25 17:46:39
 */
import axios from "axios";
const homeApi = axios.create({
  baseURL: "http://baidu.com",
});
export default homeApi;
