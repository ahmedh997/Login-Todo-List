var userNameInput = document.getElementById('userName');
var userEmailInput = document.getElementById('userEmail');
var userPassInput = document.getElementById('userPass');
var loginBtn = document.getElementById('loginBtn');
var signBtn = document.getElementById('signBtn');
var logInParagraph = document.querySelector('.logIn');
var signUpParagraph = document.querySelector('.signUp');
var loginText = document.querySelector('.loginText');
var signUpText = document.querySelector('.signUpText');
var nameInputHolder = document.querySelector('.nameInputHolder');

var userContainer = [];


// Load existing users from localStorage
if (localStorage.getItem('data') !== null) {
    userContainer = JSON.parse(localStorage.getItem('data'));

    const lastUser = userContainer[userContainer.length - 1]; // Fill last user's data

    userNameInput.value = lastUser.code;
    userEmailInput.value = lastUser.email;
    userPassInput.value = lastUser.password;
}


function register() {

    if (!userNameInput.value || !userEmailInput.value || !userPassInput.value) {
        alert("All fields are required!");
        return;
    }
    if (!validateEmail(userEmailInput.value)) {
        alert("Invalid email format!");
        return;
    }
    var existingUser = userContainer.find(user => user.email === userEmailInput.value);
    if (existingUser) {
        alert("This email is already registered. Please use a different email.");
        return;
    }
    var userData = {
        code: userNameInput.value,
        email: userEmailInput.value,
        password: userPassInput.value,
    };



    userContainer.push(userData);

    localStorage.setItem("data", JSON.stringify(userContainer));


    alert("Registration successful! Please login.");
    clearForm();


}


// Login function
function login() {
    if (!userEmailInput.value || !userPassInput.value) {
        alert("Both fields are required!");
        return;
    }
    var user = userContainer.find(user => user.email === userEmailInput.value);

    if (!user) {
        alert("This email is not registered. Please sign up.");
        return;
    }

    if (user.password !== userPassInput.value) {
        alert("Incorrect password!");
        return;
    }

    const lastUser = userContainer[userContainer.length - 1];

    alert(`Welcome, ${lastUser.code}! Redirecting to Home.`);
    clearForm();

    window.location.href = './home.html';

}




// Email Regex validation
function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


// Clear form function
function clearForm() {
    userNameInput.value = '';
    userEmailInput.value = '';
    userPassInput.value = '';
}


// Editing btns display
function replaceLogin() {
    logInParagraph.classList.remove('d-none');
    signUpParagraph.classList.add('d-none');
    nameInputHolder.classList.remove('d-none');
    loginBtn.classList.add('d-none');
    signBtn.classList.remove('d-none');
}

function replaceSignup() {
    logInParagraph.classList.add('d-none');
    signUpParagraph.classList.remove('d-none');
    nameInputHolder.classList.add('d-none');
    loginBtn.classList.remove('d-none');
    signBtn.classList.add('d-none');
}

// Btns Events
loginBtn.addEventListener('click', login);
signBtn.addEventListener('click', register);
signUpText.addEventListener('click', replaceLogin);
loginText.addEventListener('click', replaceSignup);




