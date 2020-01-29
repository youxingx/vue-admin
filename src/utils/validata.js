/**
 *  过滤特殊字符
 */

export function stripscript(str) {
    var pattern = new RegExp("[`~!@#$^&*()=| {}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

export function validataEmail(value) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(value);
}

export function validataPassword(value) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return reg.test(value);
}

export function validataCode(value) {
    let reg = /^([a-zA-Z]|[0-9]){6}$/
    return reg.test(value);
}
