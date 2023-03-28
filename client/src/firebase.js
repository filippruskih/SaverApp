import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1qniOgt-Ut-KnD8oAGgfaeu8niTesQCI",
    authDomain: "saverhomeenergysavingapp.firebaseapp.com",
    databaseURL: "https://saverhomeenergysavingapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "saverhomeenergysavingapp",
    storageBucket: "saverhomeenergysavingapp.appspot.com",
    messagingSenderId: "736551254380",
    appId: "1:736551254380:web:f8279de8cd35e89a0edb49",
    measurementId: "G-QNTM2P0N9N"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app)
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "userss"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "userss"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userId = user.uid;
      const dataRef = db.ref(`data/${userId}`);
      const dataSnap = await dataRef.once("value");
      const data = dataSnap.val();
      return { user, data };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "userss"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

function getUserData(userId) {
    const dbRef = getDatabase().ref("users/" + userId);
    return dbRef.once("value").then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    });
  }

  const messaging = getMessaging(app);

  export const fetchToken = (setTokenFound) => {
    return getToken(messaging, {vapidKey: 'BANo4A4CUJOG8mymaoRCEbZC5ojZsC9tlKZSmUKC21nWXebfqC2G-z3HQa8s6fpjlzVWk95hBjDRm_bPCkmR3jg'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }
  
  export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
  });
  
  
export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    getUserData,
    database,
  };
