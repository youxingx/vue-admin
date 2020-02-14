import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from "cookie_js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) || false ,
    // isCollapse:JSON.parse(Cookie.get('isCollapse')) || false ,
    count:10,
  },
  getters:{
    count:(state)=>state.count+10
  },
  mutations: {
    SET_COLLAPSE(state){
      state.isCollapse = !state.isCollapse;
      // console.log(state.isCollapse);
      // html5的本地存储
      //localStorage 关闭浏览器还会存储
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
      // Cookie.set('isCollapse', JSON.stringify(state.isCollapse));
    },
    SET_COUNT(state, value){
      state.count = value;
      // console.log(state.count);
    }
  },
  actions: {

  }
})
