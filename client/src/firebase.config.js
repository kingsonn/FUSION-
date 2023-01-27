import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgLdI-EbvNm5j54hn4_z1_9obaiFby0N8",
  authDomain: "canteen-195a4.firebaseapp.com",
  projectId: "canteen-195a4",
  storageBucket: "canteen-195a4.appspot.com",
  messagingSenderId: "272362060081",
  appId: "1:272362060081:web:699eb7dc963ddef7bd5810",
  measurementId: "G-66KYLEGDE5"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
