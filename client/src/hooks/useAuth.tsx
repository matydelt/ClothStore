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
import { useDispatch } from "react-redux";
import { setSignedInUser } from "../redux/actions/userActions";
import { registerUserGoogle } from "../redux/actions/userActions";

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

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo: string;
};

function useProvideAuth() {
  const [user, setUser] = useState<User>();
  const dispatch = useDispatch();

  const handleSubmit= (e: FormState ) => {
      signup({email: e.email, password: e.password});
  };


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
      const response = await signInWithPopup(auth, provider)
      // const credential = GoogleAuthProvider.credentialFromResult(response);
      // const token = credential?.accessToken;
      if(response.user.email){
        const obj = { 
          firstName: response.user.displayName ? response.user.displayName.split(" ")[0] : "", 
          lastName: response.user.displayName ? response.user.displayName.split(" ")[1] : "",
          email: response.user.email,
          password: `${response.user.email}${response.user.email}`,
          photo: response.user.photoURL ? response.user.photoURL : ""
        }
    
        await dispatch(registerUserGoogle(obj))
        handleSubmit(obj)
        return response.user;
      }
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
