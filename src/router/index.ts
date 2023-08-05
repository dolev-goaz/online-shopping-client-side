import {RouteRecordRaw, createRouter, createWebHashHistory} from "vue-router"
import ProductsView from "@/views/Products.vue";

const routes: RouteRecordRaw[] = [{
    path: '/',
    component: ProductsView
}];
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})