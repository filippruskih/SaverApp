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
    const [newFamSize, setNewFamSize] = useState("");
    const [showTotalEnergy, setShowTotalEnergy] = useState(false);

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
                    famSize: Number(newFamSize),
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
        setNewFamSize("");
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
        setNewFamSize(usr.famSize);
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTotalEnergy(true);
        }, 3000);

        return () => clearTimeout(timer);
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
            <div className="user-list">
                <ul>
                    {users &&
                        Object.keys(users).map((key) => {
                            const usr = users[key];
                            return (
                                <ul className="input-container" key={key}>
                                    <div className="basic-info">
                                        <h4>Basic Info</h4>
                                        <h5>Name: {usr.name}</h5>
                                        <h5>Surname: {usr.surname}</h5>
                                        <h5>DOB: {usr.dob}</h5>
                                        <h5>Family Size: {usr.famSize}</h5>
                                        <br />
                                    </div>
                                    <div className="contact-info">
                                        <h4>Contact Info</h4>
                                        <h5>Email: {usr.email}</h5>
                                        <h5>Phone number: {usr.phone}</h5>
                                        <br />
                                    </div>

                                    <div className="address-info">
                                        <h4>Address</h4>
                                        <h5>Address: {usr.address}</h5>

                                    </div>
                                    <br />
                                    <h5>User ID: {usr.userID}</h5>
                                    <button className="newbtn" onClick={() => { updateUser(usr); }}>Edit Data</button>
                                    <button className="newbtn" onClick={() => { deleteUser(usr.userID); }}>Delete Data</button>
                                </ul>
                            );
                        })}
                </ul>
            </div><br /><br />
            <div>
                <h5>Please enter your details to update</h5>
                <div className="input-container">
                    <div className="basic-info">
                        <h4>Basic Info</h4>
                        <input
                            placeholder='Enter name'
                            value={newName}
                            className="input1"
                            onChange={(event) => {
                                setNewName(event.target.value)
                            }}
                        /><br />
                        <input
                            placeholder='Enter Surname'
                            value={newSurname}
                            className="input1"
                            onChange={(event) => {
                                setNewSurname(event.target.value)
                            }}
                        /><br />
                        <input
                            placeholder='Enter DOB'
                            value={newDOB}
                            className="input1"
                            onChange={(event) => {
                                setNewDOB(event.target.value)
                            }}
                        /><br />
                        <input
                            placeholder='Family Size'
                            value={newFamSize}
                            type="number"
                            className="input1"
                            onChange={(event) => {
                                setNewFamSize(event.target.value)
                            }}
                        />
                    </div>
                    <div className="contact-info">
                        <h4>Contact Info</h4>
                        <input
                            placeholder='Enter Email'
                            value={newEmail}
                            className="input1"
                            onChange={(event) => {
                                setNewEmail(event.target.value)
                            }}
                        /><br />
                        <input
                            placeholder='Enter Phone number'
                            value={newPhoneNum}
                            type="number"
                            className="input1"
                            onChange={(event) => {
                                setNewPhoneNum(event.target.value)
                            }}
                        />
                    </div>
                    <div className="address-info">
                        <h4>Address</h4>
                        <input
                            placeholder='Enter Address'
                            value={newAddress}
                            className="input1"
                            onChange={(event) => {
                                setNewAddress(event.target.value)
                            }}
                        />
                    </div>
                </div>
                <br />
                <button className="newbtn" onClick={createUser}>Set Account Details</button>
            </div>

            <div className='container pt-2 pb-5'>
                <div className='row'>
                    <div className='section-header pt-5 pb-5 text-center'>
                        <h3 className='section-title'>
                            <span>More </span>Information
                        </h3>
                        <p className='aboutsection'>
                            On average, a person uses anywhere between 8-10 kWh of energy per day, which means that based on your family size, your daily consumption should be <b>€{(users && Object.values(users).reduce((totalEnergy, user) => totalEnergy + user.famSize * 9, 0).toFixed(2))}</b> and a yearly consumption of <b>€{(users && Object.values(users).reduce((totalEnergy, user) => totalEnergy + user.famSize * 9 * 365, 0).toFixed(2))}</b>. 
                            
                            By implementing measures to save on your energy consumption by insulating your house, using saver and other smart technology to ensure you are saving energy you can reduce these figures to <b>€{(users && Object.values(users).reduce((totalEnergy, user) => totalEnergy + user.famSize * 9 * 0.75, 0).toFixed(2))}</b> and a yearly consumption of <b>€{(users && Object.values(users).reduce((totalEnergy, user) => totalEnergy + user.famSize * 9 * 365 * 0.75, 0).toFixed(2))}</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;