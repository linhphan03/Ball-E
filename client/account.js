//-------------------Log in submit---------------------
//write API
const onLogIn = async (e) => {
    
    const email_LogIn = document.getElementById('email_login').value;
    const password_LogIn = document.getElementById('password_login').value;

    const response = await fetch('https://chatgpt-server-liart.vercel.app/auth/login', {
    // const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            //send info
            email: email_LogIn,
            password: password_LogIn

        })
    });
    const data = await response.json();

    if (response.ok){
        const { message, token, name } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);

        console.log('Successful log in submission');
        window.location.href = 'chatbot.html';
    }
    else{
        const {message} = data;
        document.querySelector("#message").innerHTML = message;
    }
};

//-------------------Sign up submit---------------------
const onSignUp = async () => {
    const email_SignUp = document.getElementById('email_signup').value;
    const password_SignUp = document.getElementById('password_signup').value;
    const confirmed_password_SignUp = document.getElementById('password_signup').value;

    const response = await fetch('https://chatgpt-server-liart.vercel.app/auth/signup', {
    // const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            //send info
            email: email_SignUp,
            password: password_SignUp,
            confirmed_password: confirmed_password_SignUp
        })
    });

    const data = await response.json();
    if (response.ok){
        //window.location.href = 'login.html';
    }
    else{
        const {message} = data;
        document.querySelector("#message").innerHTML = message;
    }
};

//-------------------Update information---------------------
const onUpdatePassword = async () => {
const token = localStorage.getItem('token');

    const email_Update = document.getElementById('email_update').value;
    const password_Update = document.getElementById('password_update').value;
    const confirmed_password_Update = document.getElementById('password_update').value;
    
    const response = await fetch('https://chatgpt-server-liart.vercel.app/auth/update/password', {
    // const response = await fetch('http://localhost:5000/auth/update/password', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            //send info
            email: email_Update,
            password: password_Update,
            confirmed_password: confirmed_password_Update
        })
    });

    const data = await response.json();
    if (response.ok){
        // window.location.href = 'login.html';
    }
    else{
        const {message} = data;
        console.log(message);
        document.querySelector("#message").innerHTML = message;
    }
}

const signup_btn = document.getElementById('signup_btn');
if (signup_btn) {
    signup_btn.addEventListener('click', onSignUp);
}

const login_btn = document.getElementById('login_btn');
if (login_btn) {
    login_btn.addEventListener('click', onLogIn);
}

const password_btn = document.getElementById('password_btn')
if (password_btn) {
    password_btn.addEventListener('click', onUpdatePassword);
}

