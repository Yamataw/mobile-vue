import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from "@/components/HomePage.vue";
import NotFound from "@/components/NotFound.vue";
import SearchBar from "@/components/SearchBar.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage
            //    component: () => import(/* webpackChunkName: "about" */ '@/components/HomePage.vue')
        },
        {
            path: "/search",
            name: "search",
            component: SearchBar
            //    component: () => import(/* webpackChunkName: "about" */ '@/components/HomePage.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
            },

    ]
});

export default router;