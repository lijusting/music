//导入模块
import Router from 'vue-router'
import Vue from 'vue'
import Login from "../pages/login.vue";
import Play from "../pages/play.vue";
import Index from "../pages/index.vue";
import Playlist from "../pages/playlist.vue"
import Songlist from "../pages/songlist.vue"
//注册路由组件
Vue.use(Router);
//编写路由规则
export default new Router({
    mode: 'hash',
    routes: [
        {
            path: "/",
            name: 'login',
            component: Login
        },
        {
            path: "/index",
            name: 'index',
            component: Index
        },

        {
            path: "/play",
            name: 'play',
            component: Play
        },
        {
            path: "/playlist",
            name: "playlist",
            component: Playlist
        },
        {
            path: "/songlist",
            name: "songlist",
            component: Songlist,
        }
    ]
})
