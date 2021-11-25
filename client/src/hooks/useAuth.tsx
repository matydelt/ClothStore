import React, { useState, useEffect, useContext, createContext } from "react";
import {
  signInWithEmailAndPassword,
  User,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { FirebaseError } from "@firebase/util";

interface signProps {
  email: string;
  password: string;
}

interface ProvideAuthProps {
  children: React.ReactNode;
}

interface ContextInterface {
  user: User | undefined;
  signin: ({ email, password }: signProps) => Promise<User | undefined>;
  signup: ({ email, password }: signProps) => Promise<User | undefined>;
  signout: () => Promise<void>;
  googleSignin: () => Promise<User | undefined>;
}

const authContext: React.Context<any> = createContext(null);

const provider = new GoogleAuthProvider();

export function ProvideAuth({ children }: ProvideAuthProps): JSX.Element {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = (): ContextInterface => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<User>();

  const signin = async ({
    email,
    password,
  }: signProps): Promise<User | undefined> => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setUser(response.user);
      return response.user;
    } catch (error) {
      console.error((error as FirebaseError).message);
    }
  };

  const signup = async ({
    email,
    password,
  }: signProps): Promise<User | undefined> => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(response.user);
      return response.user;
    } catch (error) {
      console.error((error as FirebaseError).message);
    }
  };

  const signout = async (): Promise<void> => {
    await signOut(auth);
    setUser(undefined);
  };

  const googleSignin = async (): Promise<User | undefined> => {
    try {
      const response = await signInWithPopup(auth, provider);
      // const credential = GoogleAuthProvider.credentialFromResult(response);
      // const token = credential?.accessToken;
      setUser(response.user);
      return response.user;
    } catch (error) {
      console.error((error as FirebaseError).message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    return () => unsubscribe();
  }, []);

  return { user, signin, signup, signout, googleSignin };
}
