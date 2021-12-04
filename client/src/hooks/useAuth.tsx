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
import { setSignedInUser } from "../redux/actions/userActions";
import { useDispatch } from 'react-redux'
interface signProps {
  email: string;
  password: string;
}

interface ContextInterface {
  user: User | undefined;
  signin: ({ email, password }: signProps) => Promise<User | undefined>;
  signup: ({ email, password }: signProps) => Promise<User | undefined>;
  signout: () => Promise<void>;
  googleSignin: () => Promise<User | undefined>;
}

const authContext = createContext<ContextInterface>(null!);

const provider = new GoogleAuthProvider();

export function ProvideAuth({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<User>();

  const dispatch = useDispatch()


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
      console.log(user)
      if (user) {
        dispatch(setSignedInUser(user))
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    return () => unsubscribe();
  }, []);

  return { user, signin, signup, signout, googleSignin };
}
