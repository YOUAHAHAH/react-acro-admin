/**
 *
 * @param {string} key 传递key
 * @param {any} value 传递参数
 * @returns
 */
export const LocalStore = (key: string, value: any) => {
  return;
};

/**
 *
 * @param {string} key 传递key
 * @param {any} value 传递参数
 * @returns
 */
export const setSessionStore = (key: string, value: any) => {
  return sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 *
 * @param {string} key 传递key
 * @returns
 */
export const getSessionStore = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key) as string);
};

/**
 *
 * @param {string} key 传递key
 * @returns
 */
export const removeSessionStore = (key: string) => {
  return sessionStorage.removeItem(key);
};
