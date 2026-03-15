import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  //firebase signup
  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      role: "user",
      createdAt: new Date(),
    });
    return userCredential;
  };
  //firebase login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // change user state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);
  //firebase LogOut
  const logout = () => {
    return signOut(auth);
  };
  // reset Password
  const ResetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  return (
    <AuthContext.Provider
      value={{ currentUser, signup, login, logout, ResetPassword }}
    >
      {loading ? <h3 className="text-center">Loading...</h3> : children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
