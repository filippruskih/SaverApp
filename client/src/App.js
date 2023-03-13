import './App.css';
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

function App() {

  const [users, setUsers] = useState();
  const userCollectionRef = collection(db, "users");

  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          CRUD operations
        </h1>
        <div>
          <ul>
            {users &&
              users.map((usr) => {
                return (
                  <li>
                    <h3>User ID: {usr.userID}</h3>
                    <h3>Username: {usr.username}</h3>
                    <h3>Email: {usr.email}</h3>
                  </li>
                );
              })}
          </ul>
        </div>

      </header>
    </div>
  );
}

export default App;




/*  

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App

*/