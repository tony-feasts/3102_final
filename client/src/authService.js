import { auth } from './firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
  return signOut(auth);
};

export const onAuthChange = (onUserAuthenticated, onUserNotAuthenticated) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      onUserAuthenticated(user);
    } else {
      onUserNotAuthenticated();
    }
  });
};
