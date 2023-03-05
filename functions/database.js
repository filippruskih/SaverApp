function writeUserData(userId, name, email) {
    //const userId = document.getElementById("usernamedb").value;
    //const name = document.getElementById("namedb").value;
    //const email = document.getElementById("emaildb").value;
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
  }
  