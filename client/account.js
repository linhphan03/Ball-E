//-------------------Log in submit---------------------
//write API
const onLogIn = async (e) => {
    
    const email_LogIn = document.getElementById('email_login').value;
    const password_LogIn = document.getElementById('password_login').value;

    const response = await fetch('https://chatgpt-server-liart.vercel.app/user/login', {
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
        const { message, token } = data;
        localStorage.setItem('token', token);
        console.log('Successful log in submission');
        //alert('log in ok');
        window.location.replace('chatbot.html');
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

    console.log(email_SignUp);

    const response = await fetch('https://chatgpt-server-liart.vercel.app/user/signup', {
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
        window.location.replace('login.html');
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
    
    console.log(email_Update, password_Update, confirmed_password_Update);

    const response = await fetch('https://chatgpt-server-liart.vercel.app/user/update/password', {
        method: 'PUT',
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
        window.location.replace('login.html');
    }
    else{
        const {message} = data;
        document.querySelector("#message").innerHTML = message;
    }
}

const signup = document.getElementById('signup_btn')
if (signup) {
    signup.addEventListener('click', onSignUp)
}

const login_btn = document.getElementById('login_btn')
if (login_btn) {
    login_btn.addEventListener('click', onLogIn)
}

const password_btn = document.getElementById('password_btn')
if (password_btn) {
    password_btn.addEventListener('click', onUpdatePassword)
}

