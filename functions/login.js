function login()
{
    const email = document.getElementById('email').value
    const password = document.getElementById('passwordfield').value

     if (!email || !password)
    {
        alert("All fields must be filled in");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            document.cookie = "accessToken=" + user.za;
            document.cookie = "uid=" + user.uid; //not currently using yet
            console.log("User object", user);
            // Call firebase function to save users other credentials, create another docs etc.
             //window.location.href = "https://saverhomeenergysavingapp.web.app/"
             window.location.href = "../index.html"
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}