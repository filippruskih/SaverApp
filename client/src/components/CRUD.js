import React from "react";
import './App.css';
import { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

function CRUD() {
    const [users, setUsers] = useState();
    const userCollectionRef = collection(db, "users");
  
    const [newID, setNewID] = useState("");
    const [newName, setNewName] = useState("");
    const [newUserID, setNewUserID] = useState("");
    const [newEmail, setNewEmail] = useState("");
  
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
  
    useEffect(() => {
      getUsers();
    }, []);
  
    const createUser = async () => {
  
      if(newID.length < 1)
      {
        await addDoc(userCollectionRef, {
          email: newEmail,
          userID: Number(newUserID),
          username: newName,
        });
      } else {
        // Update the user
        const userDoc = doc(db, "users", newID);
        const newFields = {
          email: newEmail,
          userID: newUserID, 
          username: newName
        };
        await updateDoc(userDoc, newFields);
      }
     
      setTimeout(getUsers, 1000);
  
      setNewID("");
      setNewEmail("");
      setNewUserID("");
      setNewName("");
    };
  
    const updateUser = (usr) => {
      setNewID(usr.id);
      setNewEmail(usr.email);
      setNewUserID(usr.userID);
      setNewName(usr.username);
    };
  
    const deleteUser = async(id) => {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
  
      setTimeout(getUsers, 1000);
    };
  
    return (
     <div className="App">
  
        <header className="App-header">
          <div className='createUser'>
            <input
              placeholder='Enter Email'
              value={newEmail}
              onChange={(event) => {
                setNewEmail(event.target.value)
              }}
            ></input>
            <br />
            <input
              placeholder='Enter User ID'
              type="number"
              value={newUserID}
              onChange={(event) => {
                setNewUserID(event.target.value)
              }}
            ></input>
            <br />
            <input
              placeholder='Enter User Name'
              value={newName}
              onChange={(event) => {
                setNewName(event.target.value)
              }}
            ></input>
            <br />
            <button onClick={createUser}>Create User</button>
            <button>Cancels Changes</button>
          </div>
          <div>
            <ul>
              {users &&
                users.map((usr) => {
                  return (
                    <ul className='users'>
                      <h3>Email: {usr.email}</h3>
                      <h3>User ID: {usr.userID}</h3>
                      <h3>Username: {usr.username}</h3>
  
                      <button onClick={() => {
                        updateUser(usr)
                        }}
                      >
                        Edit User
                      </button>
  
                      <button onClick={() => {
                        deleteUser(usr.id)
                        }}
                      >
                        Delete User
                      </button>
                    </ul>
                  );
                })}
            </ul>
          </div>
  
        </header>
    </div>
    );
  }
  
  export default CRUD;
  