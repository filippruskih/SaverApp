import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Section from './Section';
import bgImage from '../assets/home_bg.jpg';
import Link from './Link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const Home = () => {
  const [user] = useAuthState(auth); // hook is used to initialise user to currently authenticated user object
  const [name, setName] = useState("");

  //defines an async function to fetch the users name from the firestore collection
  const fetchUserName = async () => {
    try {
      //queries the collection where its stored
      const q = query(collection(db, "userss"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      //extracts the name from document and sets the state variable to it
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      //logs errors for debugging
      console.error(err);
    }
  };

  //calls the function when component mounts
  useEffect(() => {
    fetchUserName();
  }, []);

  //calls function above every 300 ms
  setTimeout(fetchUserName, 300);

  return (
    <Section id='home'>
      <div>
        <div className='home-content p-5' style={{ backgroundImage: `url(${bgImage})` }}>
          <div className='intro container text-center text-light'>
            <h1 className='title'>WELCOME</h1>
            <h3>{name}</h3>
            <h2 className='sub-title mb-4'>
              Welcome to SAVER, where we meet all of your energy needs and help you save money by consulting you,
              showing you your energy usage and give you hints on how to save energy consumption.
            </h2>
            <Link classes='btn btn-dark rounded-1' target='about'>
              Learn More
            </Link><span></span>
            <Link target='contact' classes='btn btn-light text-dark rounded-1'>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Home;
