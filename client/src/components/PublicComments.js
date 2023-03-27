import { Pie, PieChart, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar, } from 'recharts';
import React from "react";
import '../App.css';
import { useState, useEffect, useMemo } from "react";
import { db } from "../firebase.js";
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import Section from '../HOC/Section';
import aboutImage from '../assets/about.jpg';
import bgImage1 from '../assets/bgImage1.jpg';
import Link from './UI/Link/Link';

function Team() {
    const [users, setUsers] = useState();
    const userCollectionRef = collection(db, "userdata");

    const [newID, setNewID] = useState("");
    const [newComment, setNewkWh_used] = useState("");
    const [newPublicUsername, setNewArea] = useState("");

    const getUsers = async () => {
        const data = await getDocs(userCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const data2 =
        users &&
        users.map((usr) => {
            const data = users.map((usr) => ({
                name: usr.publicusername,
                users: usr.comment,
            }));
        });

    useEffect(() => {
        getUsers();
    }, []);


    const createUser = async () => {

        if (newID.length < 1) {
            await addDoc(userCollectionRef, {
                publicusername: newPublicUsername,
                comment: newComment,
            });
        } else {
            // Update the user
            const userDoc = doc(db, "userdata", newID);
            const newFields = {
                publicusername: newPublicUsername,
                comment: newComment,
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
        setNewArea(usr.publicusername);
        setNewkWh_used(usr.comment);
    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, "userdata", id);
        await deleteDoc(userDoc);

        setTimeout(getUsers, 1000);
    };

    return (

        <Section id='about'>
            <div className='home-content p-5' style={{
                backgroundImage: `url(${bgImage1})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}>
                <div className='container pt-2 pb-5'>
                    <div className='intro container text-center text-light'>
                        <h1 className='title'>WELCOME</h1>
                        <h5 className='sub-title mb-4'>
                            Please feel free to share any comments, tips or tricks that can help other users to save money on their future bills.
                        </h5>
                        <Link classes='btn btn-dark rounded-1' target='about'>
                            Learn More
                        </Link><span></span>
                        <Link target='contact' classes='btn btn-light text-dark rounded-1'>
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
            <div className='section-header pt-5 pb-5 text-center'>
                <h3 className='section-title'>
                    <span>Comment </span>Section
                </h3>
                <h6 className='aboutsection'>
                Users Area To Share Energy-Saving Tips and Hints
                </h6>
            </div>
            <div className="App">
                <header className="App-header">
                    <div className='createUser'>
                        <input
                            placeholder='Enter username'
                            value={newPublicUsername}
                            className="input1"
                            onChange={(event) => {
                                setNewArea(event.target.value)
                            }}
                        ></input>
                        <br />
                        <input
                            placeholder='Enter Energy-Saving Tip'
                            className="input1"
                            value={newComment}
                            onChange={(event) => {
                                setNewkWh_used(event.target.value)
                            }}
                        ></input>
                        <br />
                        <button className="newbtn" onClick={createUser}>Add Comment</button>
                        <button className="newbtn">Cancel Changes</button>
                    </div>
                    <div className='usersList'>
                        <ul>
                            {users &&
                                users.map((usr, index) => {
                                    return (
                                        <li key={usr.id} className='users'>
                                            <h3>UserName: {usr.publicusername}</h3>
                                            <h3>Tips and Hints: {usr.comment}</h3>
                                            <button className="newbtn" onClick={() => {
                                                updateUser(usr)
                                            }}
                                            >
                                                Edit Comment
                                            </button>

                                            <button className="newbtn" onClick={() => {
                                                deleteUser(usr.id)
                                            }}
                                            >
                                                Delete Comment
                                            </button>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>

                </header>
            </div>
        </Section>

    );
}

export default Team;
