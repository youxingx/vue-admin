import Vue from 'vue';
import SvgIcon from "./SvgIcon";
//自定义全局组件
Vue.component('svg-icon', SvgIcon);

/**
 * require.context读取目录所有文件
 * 参数1：目录
 * 参数2：是否遍历子目录
 * 参数3: 文件后缀名过滤
 * @type {never}
 */
const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext)=>{
    console.log(requireContext.keys().map(requireContext));
    return requireContext.keys().map(requireContext);
};
requireAll(req);
