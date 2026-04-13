import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";
const FireStoreContext = createContext();

const FireStoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const colRef = useMemo(() => {

    return collection(db, `product`);
  }, []);

  // realtime getDocs
  useEffect(() => {

    if (!colRef) return;

    const q = query(colRef, orderBy("createAt"));
    const unsub = onSnapshot(q, (snapshot) => {
      const fireProducts = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setProducts(fireProducts);
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, [colRef]);
  // admin check
  useEffect(() => {
    if(currentUser){

      const getUserRole = async () => {
        const docRef = doc(db, "users", currentUser.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setRole(snap.data().role);
        }
      };
      getUserRole();
    }
  }, [currentUser]);
  //  Add Doc

  const addToStore = async (productData) => {
    await addDoc(colRef, { ...productData, createAt: serverTimestamp() });
  };
  
  // Delete Doc

  const handleDelete = async (id) => {
    const docRef = doc(colRef, id);
    return await deleteDoc(docRef);
  };
  // update product
  const update = async (id, updateDate) => {
    const docRef = doc(colRef, id);

    return await updateDoc(docRef, updateDate);
  };
  //cart Realtime
  const colCartRef = useMemo(() => {
    if (!currentUser) return;
    return collection(db, `users/${currentUser.uid}/cart`);
  }, [currentUser]);

  useEffect(() => {
    if (!colCartRef) return;
    const qCart = query(colCartRef, orderBy("createAt"));
    const unsubCart = onSnapshot(qCart, (snapshot) => {
      const cartProducts = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setCartItems(cartProducts);
    });
    return () => {
      unsubCart();
    };
  }, [colCartRef]);
  // cart add function
  const addToCart = async (productData) => {
    await addDoc(colCartRef, { ...productData, createAt: serverTimestamp() });
  };
  // delete from cart
  const deleteFromCart = async (id) => {
    const docRef = doc(colCartRef, id);
    return await deleteDoc(docRef);
  };
  //get from stock
  // update stock in cart
  const updateStock = async (id, updateDate) => {
    const docCartRef = doc(colCartRef, id);

    return await updateDoc(docCartRef, { count: updateDate });
  };
  const [isCartOpen, setIsCartOpen] = useState(false);
  // fetch user name
  useEffect(() => {
    const fetchUserName = async () => {
      if (!currentUser) {
        setUserName("");
        return;
      }
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserName(docSnap.data().name);
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };
    fetchUserName();
  }, [currentUser]);
  return (
    <FireStoreContext.Provider
      value={{
        products,
        addToStore,
        handleDelete,
        update,
        addToCart,
        cartItems,
        deleteFromCart,
        isCartOpen,
        setIsCartOpen,
        role,
        updateStock,
        userName
      }}
    >
      {loading ? <h2 className="text-center">Loading...</h2> : children}
    </FireStoreContext.Provider>
  );
};

export const useFireStore = () => {
  return useContext(FireStoreContext);
};
export default FireStoreProvider;
