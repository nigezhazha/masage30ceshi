import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      menuList:[]
    },
    mutations: {
      changeMenuList (state,newMenuList) {
       console.log(newMenuList);
       state.menuList = newMenuList
      }
    }
  })

  //暴露出去
  export default store