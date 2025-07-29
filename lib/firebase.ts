import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwS7K2mmaDbz7IfIyFCPDvm1QsqwHrMts",
  authDomain: "test-aed56.firebaseapp.com",
  projectId: "test-aed56",
  storageBucket: "test-aed56.firebasestorage.app",
  messagingSenderId: "709660166259",
  appId: "1:709660166259:web:c88de899e96cd050dd8206",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 