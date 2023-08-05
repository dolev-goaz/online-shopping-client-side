import {RouteRecordRaw, createRouter, createWebHashHistory} from "vue-router"
import ProductsView from "@/views/Products.vue";
import ProductView from "@/views/Product.vue";

const routes: RouteRecordRaw[] = [{
    path: '/',
    component: ProductsView
}, {
    path: '/product/:id',
    component: ProductView,
}];
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})