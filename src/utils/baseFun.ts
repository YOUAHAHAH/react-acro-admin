type PrimitiveType = number | string | boolean | undefined | null | string[];
type TargetType =
  | "number"
  | "string"
  | "boolean"
  | "undefined"
  | "null"
  | "array"
  | "object";

/**
 * @description 类型转换函数
 * @param data {PrimitiveType} 原始数据
 * @param type {TargetType} 目标数据类型
 * @throws 类型无法识别时抛出异常
 * @returns {PrimitiveType} 转换后的数据
 */

export const typeF = (
  data: PrimitiveType = null,
  type: TargetType = "null"
): PrimitiveType => {
  if (typeof data === type) return data;
  switch (type) {
    case "number": {
      const num = Number(data);
      return isNaN(num) || data === null ? 0 : num;
    }
    case "string":
      return String(data ?? "");
    case "boolean":
      return !!data;
    case "undefined":
      return undefined;
    case "null":
      return null;
    case "array":
      return Array.isArray(data)
        ? data
        : typeof data === "string"
        ? data.split(",")
        : data !== null
        ? [data as PrimitiveType]
        : ([] as unknown as any);
    case "object":
      return typeof data === "string" && data.trim() !== ""
        ? JSON.parse(data)
        : typeof data === "object" && data !== null
        ? data
        : {};
    default:
      throw new Error(`类型 ${type} 无法识别`);
  }
};
