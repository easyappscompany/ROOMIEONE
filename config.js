import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; 


// Configuración de Firebase
const firebaseConfig = {
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

// Exportar las instancias necesarias
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;

