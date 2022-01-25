/*
 * @Description: {{ByRuin}}
 * @Version: 2.0
 * @Author: Ruin 🍭
 * @Date: 2022-01-25 17:42:57
 * @LastEditors: 刘引
 * @LastEditTime: 2022-01-25 18:04:29
 */

import Axios from "../api/base-service"; // 导入配置好的axios文件
// 封装axios请求函数，并用export导出
export function getInfo(datas: unknown) {
  return Axios({
    url: "/api.php?key=free&appid=0&msg=鹅鹅鹅",
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    data: datas,
  });
}
export function getInfoA(datas: unknown) {
  return Axios({
    url: "/api/getbooks",
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", //设置请求头请求格式form
    },
    data: datas,
  });
}
export function getItem(datas: unknown) {
  return Axios({
    url: "/api/getItem",
    method: "post",
    headers: {
      "Content-Type": "application/json", //设置请求头请求格式为json
    },
    data: datas,
  });
}
export function getItemInfo(datas: unknown) {
  return Axios({
    url: "/api/getItemInfo" + datas,
    method: "get",
  });
}
