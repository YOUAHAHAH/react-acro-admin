import { Button } from "@arco-design/web-react";
import { materialList } from "@/api/modules/material";
import { useEffect } from "react";

const MaterialList = () => {
  useEffect(() => {
    materialList().then(res => {
      console.log(res);
    });
  }, []);

  return (
    <>
      <Button type="primary">物料查询</Button>
    </>
  );
};

export default MaterialList;
