import React from "react";
import './App.css';
import { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, update, remove, get } from "firebase/database";
import { getUserData } from "../firebase";
import { getAuth, useAuth } from "firebase/auth";

function CRUD() {
  const auth = getAuth();
  const [users, setUsers] = useState();
  const userRef = ref(getDatabase(), 'users');
  const [userData, setUserData] = useState({});
  const [newID, setNewID] = useState("");
  const [newName, setNewName] = useState("");
  const [newUserID, setNewUserID] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const getUsers = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      //const userUid = currentUser.providerData[0].uid;
      const userUid = currentUser.uid;
      const userSnapshot = await get(ref(getDatabase(), `users/${userUid}`));
      if (userSnapshot.exists()) {
        console.log("user uid = "+userUid);
        const userData = userSnapshot.val();
        if (userData) {
          setUsers(Object.entries(userData).map(([key, value]) => ({ ...value, id: key, userID: key })));
        } else {
          setUsers([]);
        }
      } else {
        setUsers([]);
      }
    }
    
  };

  const createUser = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      if (newID.length < 1) {
        await push(ref(getDatabase(), `users/${uid}`), {
          email: newEmail,
          userID: Number(newUserID),
          username: newName,
        });
      } else {
        // Update the user
        const updates = {};
        updates[newID] = {
          email: newEmail,
          userID: newUserID,
          username: newName,
        };
        await update(ref(getDatabase(), `users/${uid}`), updates);
      }

      // Retrieve the updated data from the database
      const snapshot = await get(ref(getDatabase(), `users/${uid}`));
      const data = snapshot.val();
      setUserData(data);
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

const deleteUser = async (userID) => {
  const currentUser = auth.currentUser;
  const userUid = currentUser.uid;
  await remove(ref(getDatabase(), `users/${userUid}/${userID}`));
  setTimeout(getUsers, 1000);
};

useEffect(() => {
  // get the currently logged in user's ID
  const userId = auth.currentUser?.uid;
  setTimeout(getUsers, 1000);
  if (userId) {
    // get the user data from the database based on the user ID
    console.log("User id logged in with = " + userId);
    //getUserData(userId).then((data) => {
    getUsers(userId).then((data) => {
      setUserData(data);
      console.log("user data set");
    });
  }
}, []);

return (
  <div className="App">
    <header className="App-header">
      <h1>Real time data base </h1>
      <div className="createUser">
        <input
          placeholder="Enter Email"
          value={newEmail}
          onChange={(event) => {
            setNewEmail(event.target.value);
          }}
        />
        <br />
        <input
          placeholder="Enter User ID"
          type="number"
          value={newUserID}
          onChange={(event) => {
            setNewUserID(event.target.value);
          }}
        />
        <br />
        <input
          placeholder="Enter User Name"
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <br />
        <button onClick={createUser}>Create User</button>
        <button>Cancels Changes</button>
      </div>
      <div>
        <ul>
          {users &&
            Object.keys(users).map((key) => {
              const usr = users[key];
              return (
                <ul className="users" key={key}>
                  <h3>Email: {usr.email}</h3>
                  <h3>User ID: {usr.userID}</h3>
                  <h3>Username: {usr.username}</h3>
                  <button onClick={() => { updateUser(usr); }}>Edit User</button>
                  <button onClick={() => { deleteUser(usr.userID); }}>Delete User</button>
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