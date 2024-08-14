import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyBF9GA1QPIZUTMkGZk-hbk6aKy1BRxTxY4",
    authDomain: "roomieone-b59f4.firebaseapp.com",
    projectId: "roomieone-b59f4",
    storageBucket: "roomieone-b59f4.appspot.com",
    messagingSenderId: "408276539312",
    appId: "1:408276539312:web:d4c6a2787eed7780a62875"
};

// Inicializar Firebase solo si no está ya inicializado
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // Si ya está inicializado, usar la instancia existente
}

export default firebase;
