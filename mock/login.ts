import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/login",
    method: "post",
    response: ({ body }) => {
      if (body.username === "admin" && body.password === "123456") {
        return {
          success: true,
          msg: "登录成功",
          data: {
            username: "admin",
            // 一个用户可能有多个角色
            roles: ["admin"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
            expires: "2023/10/30 00:00:00"
          }
        };
      } else if (body.username === "user" && body.password === "123456") {
        return {
          success: true,
          msg: "登录成功",
          data: {
            username: "user",
            // 一个用户可能有多个角色
            roles: ["user"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.user",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.userRefresh",
            expires: "2023/10/30 00:00:00"
          }
        };
      } else {
        return {
          success: false,
          msg: "账号或密码错误"
        };
      }
    }
  }
] as MockMethod[];
