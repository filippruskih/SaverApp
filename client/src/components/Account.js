import React from "react";
import './App.css';
import { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

function Account() {
    const [users, setUsers] = useState();
    const userCollectionRef = collection(db, "accountdetails");

    const [newID, setNewID] = useState("");
    const [newName, setNewName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newDOB, setNewDOB] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhoneNum, setNewPhoneNum] = useState("");

    const getUsers = async () => {
        const data = await getDocs(userCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getUsers();
    }, []);

    const createUser = async () => {

        if (newID.length < 1) {
            await addDoc(userCollectionRef, {
                name: newName,
                surname: newSurname,
                address: newAddress,
                dob: newDOB,
                email: newEmail,
                phone: Number(newPhoneNum),
            });
        } else {
            // Update the user
            const userDoc = doc(db, "accountdetails", newID);
            const newFields = {
                name: newName,
                surname: newSurname,
                address: newAddress,
                dob: newDOB,
                email: newEmail,
                phone: Number(newPhoneNum),
            };
            await updateDoc(userDoc, newFields);
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

    const deleteUser = async (id) => {
        const userDoc = doc(db, "accountdetails", id);
        await deleteDoc(userDoc);

        setTimeout(getUsers, 1000);
    };

    return (
        <div className="App">
          <h1>Users data in area of house</h1>
            <header className="App-header">
                <div className='createUser'>
                    <input
                        placeholder='Enter name'
                        value={newName}
                        onChange={(event) => {
                            setNewName(event.target.value)
                        }}
                    ></input>
                    <br />
                    <input
                        placeholder='Enter Surname'
                        value={newSurname}
                        onChange={(event) => {
                            setNewSurname(event.target.value)
                        }}
                    ></input>                        
<input
                        placeholder='Enter Address'
                        value={newAddress}
                        onChange={(event) => {
                            setNewAddress(event.target.value)
                        }}
                    ></input>
                    <br />
                    <input
                        placeholder='Enter DOB'
                        value={newDOB}
                        onChange={(event) => {
                            setNewDOB(event.target.value)
                        }}
                    ></input>  
                    <input
                        placeholder='Enter Email'
                        value={newEmail}
                        onChange={(event) => {
                            setNewEmail(event.target.value)
                        }}
                    ></input>
                    <br />
                    <input
                        placeholder='Enter Phone number'
                        value={newPhoneNum}
                        type="number"
                        onChange={(event) => {
                            setNewPhoneNum(event.target.value)
                        }}
                    ></input>  
                    <br />
                    <button onClick={createUser}>Set Account Details</button>
                    <button>Cancel</button>
                </div>
                <div>
                    <ul>
                        {users &&
                            users.map((usr) => {
                                return (
                                    <li className='users'>
                                        <h3>Name: {usr.name}</h3>
                                        <h3>Surname: {usr.surname}</h3>
                                        <h3>Address: {usr.address}</h3>
                                        <h3>DOB: {usr.dob}</h3>
                                        <h3>Email: {usr.email}</h3>
                                        <h3>Phone number: {usr.phone}</h3>

                                        <button onClick={() => {
                                            updateUser(usr)
                                        }}
                                        >
                                            Edit Account Details
                                        </button>

                                        <button onClick={() => {
                                            deleteUser(usr.id)
                                        }}
                                        >
                                            Delete Account Details
                                        </button>
                                    </li>
                                );
                            })}
                    </ul>
                </div>

            </header>
        </div>
    );
}

export default Account;
