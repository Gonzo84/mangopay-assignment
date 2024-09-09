import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCWMNyO-UDITMRJoz5gkdPlFxgQdw3nwIA",
    authDomain: "taskmaster-e9014.firebaseapp.com",
    projectId: "taskmaster-e9014",
    storageBucket: "taskmaster-e9014.appspot.com",
    messagingSenderId: "108963548880",
    appId: "1:108963548880:web:94bd2f43f6a82ce49bd8d5"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);


export {firebaseApp, auth};