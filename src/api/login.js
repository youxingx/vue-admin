import service from "@/utils/request"
/**
  * 获取验证码
  */
export function  GetSms(data) {
    // console.log("获取验证码")
    return service.request({
        method : "post",
        url: "/agent/testapi/test/reverse.action",
        data: data,
        // data
        //左边的变量名和右边变量名同名，可以写成一个
    });
}

/**
 * 获取用户角色
 */

/**
 * 登录
 */
export function Login(data) {
    console.log("登录");
    return service.request({
        method: "post",
        url: "/agent/testapi/test/reverse.action",
        data: data
    });
}

/**
 * 注册
 */
export function Register(data) {
    console.log("注册");
    return service.request({
        method: "post",
        url: "/agent/testapi/test/reverse.action",
        data: data
    });
}
