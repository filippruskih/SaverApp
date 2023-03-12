/*function writeUserData() {
  /*const userId = document.getElementById("usernamedb").value;
  const namebox = document.getElementById("namebox").value;
  const email = document.getElementById("emaildb").value;
  const db = getDatabase();
  set(ref(db, 'users/' + namebox), {
      username: namebox,
      email: namebox,
  })
      .then(() => {
          // Data saved successfully!
          alert("Data saved successfully!");
      })
      .catch((error) => {
          // The write failed...
          alert("The write failed...");
      });
}*/

/*
function writeUserData() {
    const userID1 = document.getElementById("useriddb").value;
    const name1 = document.getElementById("usernamedb").value;
    const email1 = document.getElementById("emaildb").value;
    //const db = getDatabase();
    const db = firebase.database();

    set(ref(db, 'users/' + userID1), {
        username: name1,
        email: email1,
    })
        .then(() => {
            // Data saved successfully!
        })
        .catch((error) => {
            // The write failed...
        });
}*/

function writeUserData() {
    const userID1 = document.getElementById("useriddb").value;
    const name1 = document.getElementById("usernamedb").value;
    const email1 = document.getElementById("emaildb").value;
    //const db = getDatabase();
    const db = firebase.database();
    db.ref('users/' + userID1).set({
        username: name1,
        email: email1
    })
        .then(() => {
            // Data saved successfully!
        })
        .catch((error) => {
            // The write failed...
        });
}