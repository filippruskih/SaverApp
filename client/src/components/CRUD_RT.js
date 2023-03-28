import React from "react";
import '../App.css';
import { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, update, remove, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Pie, PieChart, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar, } from 'recharts';
import { Button, Toast, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import notificationImage from '../assets/not.jpg';

function CRUD() {
  const auth = getAuth();
  const [users, setUsers] = useState();
  const userRef = ref(getDatabase(), 'users');
  const [userData, setUserData] = useState({});
  const [newID, setNewID] = useState("");
  const [newName, setNewName] = useState("");
  const [newUserID, setNewUserID] = useState("");
  const [newArea, setNewArea] = useState("");
  const [newKwhUsed, setnewKwhUsed] = useState("");

  const getUsers = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
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
        });
      } else {
        // Update the user
        const updates = {};
        updates[newID] = {
          area: newArea,
          userID: newUserID,
          kwhUsed: newKwhUsed,
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
  };

  const updateUser = (usr) => {
    setNewID(usr.id);
    setNewArea(usr.area);
    setnewKwhUsed(usr.kwhUsed);
    setNewUserID(usr.userID);
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
      getUsers(userId).then((data) => {
        setUserData(data);
        console.log("user data set");
      });
    }
  }, []);


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
    <div className='container pt-2 pb-5'>
      <div className='section-header pt-5 pb-5 text-center'>
        <h3 className='section-title'>
          <span>Energy </span>Consumption
        </h3>
        <div className="createUser">
          <input
            placeholder="Enter Area"
            value={newArea}
            className="input2"
            onChange={(event) => {
              setNewArea(event.target.value);
            }}
          />
          <br />
          <input
            placeholder="Enter kWh used"
            value={newKwhUsed}
            className="input2"
            onChange={(event) => {
              setnewKwhUsed(event.target.value);
            }}
          />
          <br />
          <button className="newbtn" onClick={createUser}>Enter new data</button>
          <button className="newbtn">Cancel</button>
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
                    <h3>Cost of energy used: €{(usr.kwhUsed * 0.23).toFixed(2)}</h3>
                    <button className="newbtn" onClick={() => { updateUser(usr); }}>Edit Data</button>
                    <button className="newbtn" onClick={() => { deleteUser(usr.userID); }}>Delete Data</button>
                  </ul>
                );
              })}
          </ul>
        </div>
        <div>
          {users && (
            <>
              <div style={{ display: 'inline-block', width: '50%', margin: '0 auto' }}>
                <PieChart width={900} height={400}>
                  <Pie data={users} dataKey="kwhUsed" nameKey="area" cx="50%" cy="50%" fill="#074f86" label />
                  <Tooltip />
                </PieChart>
              </div>
              <div style={{ display: 'inline-block', width: '50%', margin: '0 auto' }}>
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
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Toast onClose={() => setShow(false)} show={show} delay={10000} autohide animation style={{
          position: 'fixed',
          top: 20,
          right: 20,
          minWidth: 200
        }}>
          <Toast.Header>
            <img
              src="https://image.shutterstock.com/image-vector/notification-icon-vector-material-design-260nw-759841507.jpg"
              className="rounded mr-2"
              alt=""
              style={{ width: '20px', height: '20px' }}
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h5>Please enter time you want to set notification for.</h5>
          <input style={{ marginBottom:'10px'}} type="datetime-local" value={selectedTime} onChange={handleTimeChange} />
          <Button onClick={() => onShowNotificationClicked()}>Set Notification</Button>
        </div>
      </div>
    </div>
  );
}

export default CRUD;