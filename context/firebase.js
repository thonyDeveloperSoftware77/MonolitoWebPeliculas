// Importa los módulos que necesitas de los SDKs
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Aquí importamos el módulo de autenticación
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
 
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Auth
const db = getFirestore(app);
const auth = getAuth(); // Aquí inicializamos el módulo de autenticación

export { db, auth}; // Exportamos db y auth para usarlos en otros archivos
