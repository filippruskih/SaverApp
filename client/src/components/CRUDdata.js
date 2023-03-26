import React from "react";
import '../App.css';
import { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, update, remove, get } from "firebase/database";
import { getUserData } from "../firebase";
import { getAuth, useAuth } from "firebase/auth";
import { Pie, PieChart, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar, } from 'recharts';


function CRUD() {
  const auth = getAuth();
  const [users, setUsers] = useState();
  const userRef = ref(getDatabase(), 'accountdetails');
  const [userData, setUserData] = useState({});
  const [newID, setNewID] = useState("");
  const [newName, setNewName] = useState("");
  const [newUserID, setNewUserID] = useState("");
  const [newArea, setNewArea] = useState("");
  const [newKwhUsed, setnewKwhUsed] = useState("");

  const getUsers = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      //const userUid = currentUser.providerData[0].uid;
      const userUid = currentUser.uid;
      const userSnapshot = await get(ref(getDatabase(), `users/${userUid}`));
      if (userSnapshot.exists()) {
        console.log("user uid = " + userUid);
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
          area: newArea,
          userID: Number(newUserID),
          kwhUsed: Number(newKwhUsed),
          //username: newName,
        });
      } else {
        // Update the user
        const updates = {};
        updates[newID] = {
          area: newArea,
          userID: newUserID,
          kwhUsed: newKwhUsed,
          //username: newName,
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
    setNewArea("");
    setnewKwhUsed("");
    setNewUserID("");
    //setNewName("");
  };

  const updateUser = (usr) => {
    setNewID(usr.id);
    setNewArea(usr.area);
    setnewKwhUsed(usr.kwhUsed);
    setNewUserID(usr.userID);
    //setNewName(usr.username);
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
            placeholder="Enter Area"
            value={newArea}
            onChange={(event) => {
              setNewArea(event.target.value);
            }}
          />
          <br />
          <input
            placeholder="Enter kWh used"
            value={newKwhUsed}
            onChange={(event) => {
              setnewKwhUsed(event.target.value);
            }}
          />
          <br />
          <button onClick={createUser}>Enter new data</button>
          <button>Cancel</button>
        </div>
        <div>
          <ul>
            {users &&
              Object.keys(users).map((key) => {
                const usr = users[key];
                return (
                  <ul className="users" key={key}>
                    <h3>Area: {usr.area}</h3>
                    <h3>kWh Used: {usr.kwhUsed}</h3>
                    <br />
                    <h3>User ID: {usr.userID}</h3>
                    <button onClick={() => { updateUser(usr); }}>Edit Data</button>
                    <button onClick={() => { deleteUser(usr.userID); }}>Delete Data</button>
                  </ul>
                );
              })}
          </ul>
        </div>
        <div>
          {users && (
            <>
              <div style={{ display: 'inline-block', width: '50%', margin: '0 auto'}}>
                <PieChart width={900} height={400}>
                  <Pie data={users} dataKey="kwhUsed" nameKey="area" cx="50%" cy="50%" fill="#8884d8" label />
                  <Tooltip />
                </PieChart>
              </div>
              <div style={{ display: 'inline-block', width: '50%', margin: '0 auto'}}>
                <BarChart width={500} height={300} data={users}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" />
                  <YAxis />
                  <Legend />
                  <Bar dataKey="kwhUsed" fill="#8884d8" />
                  <Tooltip />
                </BarChart>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default CRUD;