import {auth} from "@/firebase";
import router from "@/router";
import useUserStore from "@/store/user.store.ts";
import {
    User as FirebaseUser,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    Unsubscribe
} from "firebase/auth";

// Type for user credentials
export type UserCredentials = {
    email: string;
    password: string;
};
const navigateOnAuthChange = (): void => {
    const isLoggedIn = useUserStore().isLoggedIn;
    isLoggedIn ? router.push({name: "Home"}) : router.push({name: "SignIn"});
};

// Function to monitor changes in the authentication state
export function monitorAuthStateChange(): Unsubscribe {
    return auth.onAuthStateChanged((user: FirebaseUser | null) => {
        const userStore = useUserStore() // Get the user store
        userStore.setUser(user) // Set the user in the store
        navigateOnAuthChange() // Navigate based on the authentication state
    });
}

// Function to sign up a user with email and password
export function signUpWithEmailAndPassword(credentials: UserCredentials): Promise<any> {
    const {email, password} = credentials;
    return createUserWithEmailAndPassword(auth, email, password); // Create a user with the provided email and password
}

// Function to log in a user with email and password
export function loginWithEmailAndPassword(credentials: UserCredentials): Promise<any> {
    const {email, password} = credentials;
    return signInWithEmailAndPassword(auth, email, password); // Sign in the user with the provided email and password
}

// Function to log out the current user
export function logOut(): Promise<any> {
    return auth.signOut(); // Sign out the current user
}