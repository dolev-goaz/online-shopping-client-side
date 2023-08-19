import {RouteRecordRaw, createRouter, createWebHashHistory} from "vue-router"
import ProductsView from "@/views/Products.vue";
import ProductView from "@/views/Product.vue";
import LoginView from "@/views/Login.vue";
import RegisterView from "@/views/Register.vue";
import CartView from "@/views/Cart.vue";
import ProfileView from "@/views/Profile.vue";

const routes: RouteRecordRaw[] = [{
    path: '/',
    component: ProductsView,
    name: "products",
}, {
    path: '/product/:id?',
    component: ProductView,
    name: "product",
}, {
    path: '/login',
    component: LoginView,
    name: "login"
}, {
    path: '/register',
    component: RegisterView,
    name: "register"
}, {
    path: "/cart",
    component: CartView,
    name: "cart"
}, {
    path: "/profile",
    component: ProfileView,
    name: "profile"
}];
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})