import { defineStore } from "pinia";
import { User as FirebaseUser } from "firebase/auth";


// Type for the state of the user store
type UserStoreState = {
    loggedIn: boolean; // Indicates whether the user is logged in
    data: FirebaseUser | null; // Holds the data of the logged in user
};

const useUserStore = defineStore("user", {
    // Initial state of the store
    state: (): UserStoreState => ({
        loggedIn: false, // Initially, the user is not logged in
        data: null, // Initially, there is no user data
    }),
    actions: {
        // Action to set the user data and update the loggedIn status
        setUser(user: FirebaseUser | null): void {
            this.data = user; // Set the user data
            this.loggedIn = !!user; // Update the loggedIn status based on whether user data is present
        },
    },
    getters: {
        // Getter to retrieve the user data
        getUser(state: UserStoreState): FirebaseUser | null {
            return state.data;
        },
        // Getter to check whether the user is logged in
        isLoggedIn(state: UserStoreState): boolean {
            return state.loggedIn;
        },
    },
});

export default useUserStore;
