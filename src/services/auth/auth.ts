// Packages
import { auth } from 'config/firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  sendEmailVerification as sendEmailVerificationFirebase,
} from 'firebase/auth';

export const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential;
  } catch (error) {
    return error;
  }
};

export const singInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await signInWithEmailAndPassword(
    auth,
    String(email).toLowerCase(),
    password
  );
};

export const singInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = signInWithPopup(auth, provider);

  return result;
};

export const singOut = async () => {
  return auth.signOut();
};

export const passwordReset = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const passwordUpdate = async (password: string) => {
  if (!auth.currentUser) return null;

  return updatePassword(auth.currentUser, password);
};

export const sendEmailVerifications = async () => {
  if (!auth.currentUser) return null;

  return sendEmailVerificationFirebase(auth.currentUser, {
    url: `${window.location.origin}/login`,
  });
};
