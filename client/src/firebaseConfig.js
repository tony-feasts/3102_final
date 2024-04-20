import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZjTii5tkVuSBocIc9I_rRhwZXl60teho",
  authDomain: "final-5465f.firebaseapp.com",
  projectId: "final-5465f",
  storageBucket: "final-5465f.appspot.com",
  messagingSenderId: "739754245714",
  appId: "1:739754245714:web:2fadb22add1dd82ad0a98b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };