// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, push, remove, update, get, child } from 'firebase/database';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBakDwePVIuq2DXT_rT2L9fA8lhnyEFeJs",
  authDomain: "moengageproject-c4c59.firebaseapp.com",
  databaseURL: "https://moengageproject-c4c59-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "moengageproject-c4c59",
  storageBucket: "moengageproject-c4c59.firebasestorage.app",
  messagingSenderId: "920162041302",
  appId: "1:920162041302:web:5876f9df4cf506f5493877",
  measurementId: "G-4MYYTLYVD8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    ref,
    set,
    push,
    remove,
    update,
    get,
    child
};