import React from "react";
import '../App.css';
import { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, update, remove, get } from "firebase/database";
import { getUserData } from "../firebase";
import { getAuth, useAuth } from "firebase/auth";
import { Pie, PieChart, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar, } from 'recharts';


function Account() {
    const auth = getAuth();
    const [users, setUsers] = useState();
    const userRef = ref(getDatabase(), 'accountdetails');
    const [userData, setUserData] = useState({});
    const [newUserID, setNewUserID] = useState("");
    const [newArea, setNewArea] = useState("");
    const [newKwhUsed, setnewKwhUsed] = useState("");

    const [newID, setNewID] = useState("");
    const [newName, setNewName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newDOB, setNewDOB] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhoneNum, setNewPhoneNum] = useState("");

    const getUsers = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userUid = currentUser.uid;
            const userSnapshot = await get(ref(getDatabase(), `accountdetails/${userUid}`));
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
                await push(ref(getDatabase(), `accountdetails/${uid}`), {
                    name: newName,
                    surname: newSurname,
                    address: newAddress,
                    dob: newDOB,
                    email: newEmail,
                    phone: Number(newPhoneNum),
                });
            } else {
                // Update the user
                const updates = {};
                updates[newID] = {
                    name: newName,
                    surname: newSurname,
                    address: newAddress,
                    dob: newDOB,
                    email: newEmail,
                    phone: Number(newPhoneNum),
                };
                await update(ref(getDatabase(), `accountdetails/${uid}`), updates);
            }

            // Retrieve the updated data from the database
            const snapshot = await get(ref(getDatabase(), `accountdetails/${uid}`));
            const data = snapshot.val();
            setUserData(data);
        }

        setTimeout(getUsers, 1000);

        setNewID("");
        setNewName("");
        setNewSurname("");
        setNewAddress("");
        setNewDOB("");
        setNewEmail("");
        setNewPhoneNum("");
    };

    const updateUser = (usr) => {
        setNewID(usr.id);
        setNewName(usr.name);
        setNewSurname(usr.surname);
        setNewAddress(usr.address);
        setNewDOB(usr.dob);
        setNewEmail(usr.email);
        setNewPhoneNum(usr.phone);
    };

    const deleteUser = async (userID) => {
        const currentUser = auth.currentUser;
        const userUid = currentUser.uid;
        await remove(ref(getDatabase(), `accountdetails/${userUid}/${userID}`));
        setTimeout(getUsers, 1000);
    };

    useEffect(() => {
        // get the currently logged in user's ID
        const userId = auth.currentUser?.uid;
        setTimeout(getUsers, 1000);
        if (userId) {
            // get the user data from the database based on the user ID
            console.log("User id logged in with = " + userId);
            getUsers(userId).then((data) => {
                setUserData(data);
                console.log("user data set");
            });
        }
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Account Details </h1>
                <div className="createAccount">
                    <input
                        placeholder='Enter name'
                        value={newName}
                        className="input1"
                        onChange={(event) => {
                            setNewName(event.target.value)
                        }}
                    ></input><br />
                    <input
                        placeholder='Enter Surname'
                        value={newSurname}
                        className="input1"
                        onChange={(event) => {
                            setNewSurname(event.target.value)
                        }}
                    ></input><br />
                    <input
                        placeholder='Enter Address'
                        value={newAddress}
                        className="input1"
                        onChange={(event) => {
                            setNewAddress(event.target.value)
                        }}
                    ></input><br />
                    <input
                        placeholder='Enter DOB'
                        value={newDOB}
                        className="input1"
                        onChange={(event) => {
                            setNewDOB(event.target.value)
                        }}
                    ></input><br />
                    <input
                        placeholder='Enter Email'
                        value={newEmail}
                        className="input1"
                        onChange={(event) => {
                            setNewEmail(event.target.value)
                        }}
                    ></input><br />
                    <input
                        placeholder='Enter Phone number'
                        value={newPhoneNum}
                        type="number"
                        className="input1"
                        onChange={(event) => {
                            setNewPhoneNum(event.target.value)
                        }}
                    ></input>
                    <br />
                    <button className="newbtn" onClick={createUser}>Set Account Details</button>
                    <button className="newbtn">Cancel</button>
                </div>
                <div>
                    <ul>
                        {users &&
                            Object.keys(users).map((key) => {
                                const usr = users[key];
                                return (
                                    <ul className="users" key={key}>
                                        <h3>Name: {usr.name}</h3>
                                        <h3>Surname: {usr.surname}</h3>
                                        <h3>Address: {usr.address}</h3>
                                        <h3>DOB: {usr.dob}</h3>
                                        <h3>Email: {usr.email}</h3>
                                        <h3>Phone number: {usr.phone}</h3>
                                        <br />
                                        <h3>User ID: {usr.userID}</h3>
                                        <button className="newbtn" onClick={() => { updateUser(usr); }}>Edit Data</button>
                                        <button className="newbtn" onClick={() => { deleteUser(usr.userID); }}>Delete Data</button>
                                    </ul>
                                );
                            })}
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default Account;