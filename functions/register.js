function register() {
    // reads in the values the user input for both passwords and email to run checks on them
    const email = document.getElementById("email").value;
    const password1 = document.getElementById("passwordfield1").value;
    const password2 = document.getElementById("passwordfield2").value;

    const checkPasswordValidity = (value) => {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
            alert("Password must not contain Whitespaces.");
            return "Password must not contain Whitespaces.";
        }

        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
            alert("Password must have at least one Uppercase Character.");
            return "Password must have at least one Uppercase Character.";
        }

        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
            alert("Password must have at least one Lowercase Character.");
            return "Password must have at least one Lowercase Character.";
        }

        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
            alert("Password must contain at least one Digit.");
            return "Password must contain at least one Digit.";
        }

        const isContainsSymbol =
            /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(value)) {
            alert("Password must contain at least one Special Symbol.");
            return "Password must contain at least one Special Symbol.";
        }

        const isValidLength = /^.{8,16}$/;
        if (!isValidLength.test(value)) {
            alert("Password must be 8-16 Characters Long.");
            return "Password must be 8-16 Characters Long.";
        }
        return null;
    }

    const message = checkPasswordValidity(password1);
    const message2 = checkPasswordValidity(password2);

    if (!message) {
        console.log("Your Password is Valid and Strong.");
    } else {
        console.log(message);
    }

    if (!message2) {
        console.log("Your Password is Valid and Strong.");
    } else {
        console.log(message2);
    }

    firebase.auth().createUserWithEmailAndPassword(email, password1)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            document.cookie = "accessToken=" + user.za;
            document.cookie = "uid=" + user.uid;
            window.location.href = "../"
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage, errorCode);
        });
}