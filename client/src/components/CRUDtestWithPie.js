import { Pie, PieChart, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar, } from 'recharts';
import React from "react";
import '../App.css';
import { useState, useEffect, useMemo } from "react";
import { db } from "../firebase.js";
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

function CRUDtestWithPie() {
    const [users, setUsers] = useState();
    const userCollectionRef = collection(db, "userdata");

    const [newID, setNewID] = useState("");
    const [newkWh_used, setNewkWh_used] = useState("");
    const [newArea, setNewArea] = useState("");

    const getUsers = async () => {
        const data = await getDocs(userCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const data2 =
        users &&
        users.map((usr) => {
            const data = users.map((usr) => ({
                name: usr.area,
                users: usr.kWh_used,
            }));});

            useEffect(() => {
                getUsers();
            }, []);
            

            const createUser = async () => {

                if (newID.length < 1) {
                    await addDoc(userCollectionRef, {
                        area: newArea,
                        kWh_used: Number(newkWh_used),
                    });
                } else {
                    // Update the user
                    const userDoc = doc(db, "userdata", newID);
                    const newFields = {
                        area: newArea,
                        kWh_used: newkWh_used,
                    };
                    await updateDoc(userDoc, newFields);
                }

                setTimeout(getUsers, 1000);

                setNewID("");
                setNewArea("");
                setNewkWh_used("");
            };

            const updateUser = (usr) => {
                setNewID(usr.id);
                setNewArea(usr.area);
                setNewkWh_used(usr.kWh_used);
            };

            const deleteUser = async (id) => {
                const userDoc = doc(db, "userdata", id);
                await deleteDoc(userDoc);

                setTimeout(getUsers, 1000);
            };

            return (
                <div className="App">
                    <h1>Users data in area of house</h1>
                    <header className="App-header">
                        <div className='createUser'>
                            <input
                                placeholder='Enter area in house'
                                value={newArea}
                                onChange={(event) => {
                                    setNewArea(event.target.value)
                                }}
                            ></input>
                            <br />
                            <input
                                placeholder='Enter Kwh usage'
                                type="number"
                                value={newkWh_used}
                                onChange={(event) => {
                                    setNewkWh_used(event.target.value)
                                }}
                            ></input>
                            <br />
                            <button onClick={createUser}>Insert Data</button>
                            <button>Cancels Changes</button>
                        </div>
                        <div className='usersList'>
                            <ul>
                                {users &&
                                    users.map((usr, index) => {
                                        return (
                                            <li key={usr.id} className='users'>
                                                <h3>Area: {usr.area}</h3>
                                                <h3>kWh used: {usr.kWh_used} kWh</h3>
                                                <button onClick={() => {
                                                    updateUser(usr)
                                                }}
                                                >
                                                    Edit data
                                                </button>

                                                <button onClick={() => {
                                                    deleteUser(usr.id)
                                                }}
                                                >
                                                    Delete data
                                                </button>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                        <div>
                            {users &&
                                users.map((usr) => {
                                    const data = users.map((usr) => ({
                                        name: usr.area,
                                        users: usr.kWh_used,
                                    }));

                                    return (
                                        <div>
                                            <PieChart width={400} height={400}>
                                                <Pie
                                                    dataKey="users"
                                                    isAnimationActive={false}
                                                    data={data}
                                                    cx={200}
                                                    cy={200}
                                                    outerRadius={80}
                                                    fill="#5684d8"
                                                    label
                                                />
                                                <Tooltip />
                                            </PieChart>
                                            <BarChart
                                                width={500}
                                                height={300}
                                                data={data}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 80,
                                                    bottom: 5,
                                                }}
                                                barSize={20}
                                            >
                                                <XAxis
                                                    dataKey="name"
                                                    scale="point"
                                                    padding={{ left: 10, right: 10 }}
                                                />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
                                            </BarChart>
                                        </div>
                                    );
                                })}
                        </div>
                    </header>
                </div>
            );
        }

export default CRUDtestWithPie;
