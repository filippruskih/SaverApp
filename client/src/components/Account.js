import React from "react";
import '../App.css';
import { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, update, remove, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import bgImage from '../assets/myaccount.jpg';


function Account() {
    const auth = getAuth(); // imports firebase auth package and initialises the service
    const [users, setUsers] = useState(); // 
    const userRef = ref(getDatabase(), 'accountdetails'); // creates a reference for FB RT-DB(Firebase Real Time Database)
    const [userData, setUserData] = useState({});
    const [newID, setNewID] = useState(""); //sets a variable and corresponding setter method
    const [newName, setNewName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newDOB, setNewDOB] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhoneNum, setNewPhoneNum] = useState("");

    //retrieves users data from the FB RTDB
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

    // method to create new user or updates an existing one
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

    //user update function
    const updateUser = (usr) => {
        setNewID(usr.id);
        setNewName(usr.name);
        setNewSurname(usr.surname);
        setNewAddress(usr.address);
        setNewDOB(usr.dob);
        setNewEmail(usr.email);
        setNewPhoneNum(usr.phone);
    };

    //user delete function
    const deleteUser = async (userID) => {
        const currentUser = auth.currentUser;
        const userUid = currentUser.uid;
        await remove(ref(getDatabase(), `accountdetails/${userUid}/${userID}`));
        setTimeout(getUsers, 1000);
    };

    // this hook runs once the component mounts and retrieves user data for the currently logged in user
    // sets a timeout for refreshing list on screen
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
            <div className='home-content p-5' style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}>
                <div className='intro container text-center text-light'>
                    <h1 className='title'>Account</h1>
                </div>
            </div>
            <div className='section-header pt-5 pb-5 text-center'>
                <h3 className='section-title'>
                    <span>My </span>Account
                </h3>
            </div>
            <h5>Please enter your details to update</h5>
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
                <div className="createAccount">
                    <ul>
                        {users &&
                            Object.keys(users).map((key) => {
                                const usr = users[key];
                                return (
                                    <ul className="users1" key={key}>
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
        </div>
    );
}

export default Account;