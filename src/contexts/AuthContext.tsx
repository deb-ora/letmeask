import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string
}
type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps ={
  children:  ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContexProvider(props: AuthContextProviderProps){
  const [user, setUser] = useState<User>();

  useEffect(() => {
    //procura no firebase se ja existe login
   const unsubscribe =  auth.onAuthStateChanged(user=>{
      if(user){
        const { displayName, photoURL, uid } = user

        if(!displayName || !photoURL){
          throw new Error('Missing Information from Google Account.');
        }
  
        setUser({
          id: uid, 
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return () => {
      unsubscribe();
      //parar event listener. é boa pratica
    }
  }, [])
  //segundo parametro eh sempre um vetor, qual info que quero olhar
  //mas se quero disparar essa func uma unica vez qdo app for mostrado, posso deixar vazio

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
      
    if(result.user){
      const { displayName, photoURL, uid } = result.user

      if(!displayName || !photoURL){
        throw new Error('Missing Information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }      
      
  }
   return(
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
    {props.children}
    </AuthContext.Provider>

   )
}