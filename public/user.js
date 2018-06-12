function loginFunction() {
    email = $('#email').val();
    password = $('#password').val();
    console.log('login: ' + email);

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        if (error.hasOwnProperty('message')) {
            var text = error.message;
            document.querySelector('#errtext').textContent = text;
        }
    });
}

function registerFunction() {
    email = $('#email').val();
    password = $('#password').val();
    console.log('register: ' + email);

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            document.querySelector("#errtext").textContent = 'The password is too weak.';
        } else {
            document.querySelector("#errtext").textContent = errorMessage;
        }
    });

    console.log('created user');
}

function logoutFunction() {
    var mail = firebase.auth().currentUser.email;
    console.log('logout: ' + mail);
    firebase.auth().signOut();
    localStorage.removeItem('token');
    console.log('signed out user: ' + mail);
    window.location.href = "./index.html";
}