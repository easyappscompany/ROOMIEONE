import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyDbtqh1BtuUo06tQ0DVRPDI7eeTuT29arU",
    authDomain: "roomieone-d57eb.firebaseapp.com",
    projectId: "roomieone-d57eb",
    storageBucket: "roomieone-d57eb.appspot.com",
    messagingSenderId: "680332616069",
    appId: "1:680332616069:web:bbd695c6ab2678c69de4ec",
    measurementId: "G-403NRVRVZ7"
};

// Inicializar Firebase solo si no está ya inicializado
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // Si ya está inicializado, usar la instancia existente
}

export default firebase;
