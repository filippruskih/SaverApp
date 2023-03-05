function writeUserData() {
  //const userId = document.getElementById("usernamedb").value;
  const namebox = document.getElementById("namebox").value;
  //const email = document.getElementById("emaildb").value;
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
}
