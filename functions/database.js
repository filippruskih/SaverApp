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
}
  