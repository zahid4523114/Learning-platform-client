import React from "react";
import { createContext } from "react";
import app from "../../firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const UserContext = ({ children }) => {
  const [user, setUser] = useState({});

  //Create a new account by passing the new user's email address and password to createUserWithEmailAndPassword:
  const registerUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };
  //When a user signs in to your app, pass the user's email address and password to signInWithEmailAndPassword:
  const loggedInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };
  //The recommended way to get the current user is by setting an observer on the Auth object:
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  //To sign in with a pop-up window, call signInWithPopup with google:
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };
  //To sign in with a pop-up window, call signInWithPopup with github:
  const signInWithGitHub = () => {
    signInWithPopup(auth, gitHubProvider);
  };
  //to sign out a user, call signOut:
  const signOutUser = () => {
    signOut(auth);
  };
  const authInfo = {
    user,
    registerUser,
    loggedInUser,
    signOutUser,
    signInWithGoogle,
    signInWithGitHub,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
