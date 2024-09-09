import {auth} from "@/firebase";
import {User as FirebaseUser} from "@firebase/auth";
import {navigateOnAuthChange} from "@/router";
import useUserStore from "@/store/user.store.ts";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

export type UserCredentials = {
    email: string;
    password: string;
};
export function monitorAuthStateChange() {
    auth.onAuthStateChanged((user: FirebaseUser | null) => {
        const userStore = useUserStore()
        userStore.setUser(user)
        navigateOnAuthChange()
    });
}

export function signUpWithEmailAndPassword(credentials: UserCredentials): Promise<any>{
    const {email, password} = credentials;
    return createUserWithEmailAndPassword(auth, email, password);
}
export function loginWithEmailAndPassword(credentials: UserCredentials): Promise<any>{
    const {email, password} = credentials;
    return signInWithEmailAndPassword(auth, email, password);
}

export function logOut(): Promise<any>{
    return auth.signOut();
}