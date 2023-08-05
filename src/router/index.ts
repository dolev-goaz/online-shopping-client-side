import {RouteRecordRaw, createRouter, createWebHashHistory} from "vue-router"
import ItemsView from "@/views/Items.vue";

const routes: RouteRecordRaw[] = [{
    path: '/',
    component: ItemsView
}];
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})