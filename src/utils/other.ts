/*
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-01-25 17:45:05
 * @LastEditors: 刘引
 * @LastEditTime: 2022-01-25 17:47:27
 */
import axios from "axios";
const otherApi = axios.create({
  baseURL: "http://baidu.com",
});
export default otherApi;
