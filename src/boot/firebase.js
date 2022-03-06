import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBQ7SDs-4xz_qxN5nD32WZ5t1gPkacg0_w",
    authDomain: "sgaauth.firebaseapp.com",
    projectId: "sgaauth",
    storageBucket: "sgaauth.appspot.com",
    messagingSenderId: "548518343119",
    appId: "1:548518343119:web:06c4f382be97371d8722ba",
    measurementId: "G-2DYNXZ7TQY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default { analytics }
