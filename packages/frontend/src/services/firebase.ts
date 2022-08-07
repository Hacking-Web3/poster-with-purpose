// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "posters-with-purpose.firebaseapp.com",
  projectId: "posters-with-purpose",
  storageBucket: "posters-with-purpose.appspot.com",
  messagingSenderId: "681900814335",
  appId: "1:681900814335:web:30ed9359850dda036541ca",
  databaseURL: "https://posters-with-purpose-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

export function writePosterInfo(
  imageURI: string,
  title: string,
  description: string,
  creator: string,
  unitsPrinted: number,
  tags: string[],
  signature: string
) {
  const db = getDatabase();
  const postersRef = ref(db, "posters");
  const newPosterRef = push(postersRef);
  set(newPosterRef, {
    imageURI,
    title,
    description,
    creator,
    unitsPrinted,
    signature,
    tags,
  });
}
