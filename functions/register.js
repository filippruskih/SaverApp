function register() {
    // reads in the values the user input for both passwords and email to run checks on them
    const email = document.getElementById("email").value;
    const password1 = document.getElementById("passwordfield1").value;
    const password2 = document.getElementById("passwordfield2").value;
    var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    // Validate the user's input
    if (!email || !password1 || !password2) {
        alert("All fields must be filled in");
        return;
    }

    if (password1 !== password2) {
        alert("Passwords do not match - Please re-try");
        return;
    }

    if ((password1.length < 8 || password2.length < 8) && (password1.length > 16 || password2.length > 16)) {
        alert("Passwords must be at least 8 characters long and a maximum of 16 characters long");
        return;
    }

    if (!regularExpression.test(password1) && !regularExpression.test(password2)) {
        alert("Password should contain atleast one number and one special character");
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password1)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            document.cookie = "accessToken=" + user.za;
            document.cookie = "uid=" + user.uid;
            window.location.href = "../"
            //window.location.href = "../index.html"
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage, errorCode);
            // ..
        });
}