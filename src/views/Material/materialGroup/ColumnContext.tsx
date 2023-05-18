import React from "react";

interface ColumnContextType {
  columnsValue: any[];
  setColumnsValue: React.Dispatch<React.SetStateAction<any[]>>;
}

const defaultValue: ColumnContextType = {
  columnsValue: [],
  setColumnsValue: () => {}
};

const ColumnContext = React.createContext<ColumnContextType>(defaultValue);

export default ColumnContext;
