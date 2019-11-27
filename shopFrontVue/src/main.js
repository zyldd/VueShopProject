// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//图片的滚动加载
import infiniteScroll from  'vue-infinite-scroll'
import {currency} from './util/currency'
import Vuex from 'vuex'
import axios from 'axios'
import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'
Vue.config.productionTip = false
Vue.use(infiniteScroll);
Vue.use(Vuex);
Vue.filter("currency",currency);
//创建状态
const store = new Vuex.Store({
  state: {
    nickName:'',
    cartCount:0
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    }
  }
});
new Vue({
  el: '#app',
  router,
  store,
  mounted(){
    this.checkLogin();
    this.getCartCount();
  },
  methods:{
    checkLogin(){
      axios.get("users/checkLogin").then(res=> {
        var res = res.data;
        console.log(res);
        if (res.status == "0") {
          console.log('00')
          this.$store.commit("updateUserInfo", res.result);
        }else{
          if(this.$route.path!="/goods"){
            this.$router.push("/goods");
          }
        }
      });
    },
    getCartCount(){
      axios.get("users/getCartCount").then(res=>{
        var res = res.data;
        console.log(res);
        if(res.status=="0"){
          this.$store.commit("updateCartCount",res.result);
        }
      });
    }
  },
  template: '<App/>',
  components: { App }
})
