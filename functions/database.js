/*function writeUserData(userId, name, email) {
    /*const userId = document.getElementById("usernamedb").value;
    const name = document.getElementById("namedb").value;
    const email = document.getElementById("emaildb").value;
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
    })
        .then(() => {
            // Data saved successfully!
        })
        .catch((error) => {
            // The write failed...
        });
  }*/

  function writeUserData1() {
    const userID = document.getElementById("useriddb").value;
    const name = document.getElementById("usernamedb").value;
    const email = document.getElementById("emaildb").value;
    //const db = getDatabase();
    const db = firebase.database();
    db.ref('users/' + userID).set({
        username: name,
        email: email
    })
        .then(() => {
            // Data saved successfully!
        })
        .catch((error) => {
            // The write failed...
        });
}
  


import { getDatabase, ref, child, get } from "firebase/database";

function readData() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userID}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function writeUserData(userID, name, email) {
  const db = getDatabase();
  set(ref(db, 'users/' + userID), {
    username: name,
    email: email
  });
}