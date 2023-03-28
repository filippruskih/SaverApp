import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout, fetchToken, onMessageListener } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Section from '../HOC/Section';
import bgImage from '../assets/home_bg.jpg';
import Link from './UI/Link/Link';
import { Button, Toast, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import notificationImage from '../assets/not.jpg';

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "userss"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      //alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  setTimeout(fetchUserName, 300);






  const [notification, setNotification] = useState({
    title: 'Reminder',
    body: 'Please remember to save energy by turning off lights, closing doors and windows'
  });
  const [show, setShow] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const onShowNotificationClicked = () => {
    if (selectedTime === '') {
      alert('Please select a time');
    } else {
      const currentDateTime = new Date().getTime();
      const selectedDateTime = new Date(selectedTime).getTime();
      const timeDiff = selectedDateTime - currentDateTime;
      if (timeDiff > 0) {
        setTimeout(() => {
          showNotification();
        }, timeDiff);
      } else {
        alert('Please select a future time');
      }
    }
  };

  const showNotification = () => {
    setShow(true);
  };

  const messaging = getMessaging();

  const fetchToken = (setTokenFound) => {
    return getToken(messaging, { vapidKey: 'BANo4A4CUJOG8mymaoRCEbZC5ojZsC9tlKZSmUKC21nWXebfqC2G-z3HQa8s6fpjlzVWk95hBjDRm_bPCkmR3jg' }).then(
      (currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          setTokenFound(true);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
          setTokenFound(false);
        }
      }
    ).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  };

  const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });



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
