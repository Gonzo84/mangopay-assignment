import {createRouter, createWebHistory} from "vue-router";
import useUserStore from "@/store/user.store";
import {startViewTransition} from "vue-view-transitions";


function checkAuthStatus(_to: any, _from: any, next: any): void {
    try {
        const userStore = useUserStore();
        userStore.isLoggedIn ? next() : next({name: "SignIn"});
    } catch (e) {
        console.warn("error getting login status from store", e);
        next({name: "SignIn"});
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("../views/Tasks.view.vue"),
            beforeEnter: checkAuthStatus,
        },
        {
            path: "/auth",
            name: "Auth",
            redirect: {name: "SignIn"},
            component: () => import("../views/auth/Auth.view.vue"),
            children: [
                {
                    path: "sign-in",
                    name: "SignIn",
                    component: () => import("../views/auth/SignIn.vue"),
                },
                {
                    path: "sign-up",
                    name: "SignUp",
                    component: () => import("../views/auth/SignUp.vue"),
                },
            ],
        },
    ],
});
router.beforeResolve(async () => {
    const viewTransition = startViewTransition()
    await viewTransition.captured
})
export default router;