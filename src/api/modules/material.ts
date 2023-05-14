import { http } from "../index";

// 物料查询
export const materialList = (_data?: object) => {
  return http.get("https://arco.design/material/api/material");
};

// 查询团队站点
export const queryGroupSite = (_data?: object) => {
  return http.post("https://arco.design/material/api/group/queryGroupSite");
};
