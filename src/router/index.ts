import {RouteRecordRaw, createRouter, createWebHashHistory} from "vue-router"
import ProductsView from "@/views/Products.vue";
import ProductView from "@/views/Product.vue";
import LoginView from "@/views/Login.vue";

const routes: RouteRecordRaw[] = [{
    path: '/',
    component: ProductsView,
    name: "products",
}, {
    path: '/product/:id',
    component: ProductView,
    name: "product",
}, {
    path: '/login',
    component: LoginView,
    name: "login"
}];
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})