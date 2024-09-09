import { defineStore } from "pinia";
import { User as FirebaseUser } from "firebase/auth";


type UserStoreState = {
    loggedIn: boolean;
    data: FirebaseUser | null;
};

const useUserStore = defineStore("user", {
    state: (): UserStoreState => ({
        loggedIn: false,
        data: null,
    }),
    actions: {
        setUser(user: FirebaseUser | null): void {
            this.data = user;
            this.loggedIn = !!user;
        },
    },
    getters: {
        getUser(state: UserStoreState): FirebaseUser | null {
            return state.data;
        },
        isLoggedIn(state: UserStoreState): boolean {
            return state.loggedIn;
        },
    },
});

export default useUserStore;
