//-------------------Log in submit---------------------
//write API
const onLogIn = async (e) => {
    
    const email_LogIn = document.getElementById('email_login').value;
    const password_LogIn = document.getElementById('password_login').value;
    console.log(email_LogIn, password_LogIn)

    const response = await fetch('http://localhost:5000/user/login', {
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
        alert('log in ok');
    }
    else{
        const {message} = data;
        document.querySelector("#message").innerHTML = message;
    }
};

//-------------------Sign up submit---------------------
const onSignUp = async () => {
    const email_SignUp = document.getElementById('email_signup');
    const password_SignUp = document.getElementById('password_signup');
    const confirmed_password_SignUp = document.getElementById('password_signup');

    const response = await fetch('http://localhost:5000/user/signup', {
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
        //TODO: redirect to log in

    }
    else{
        const {message} = data;
        document.querySelector("#message").innerHTML = message;
    }
};

//-------------------Update information---------------------
const onUpdatePassword = async () => {
    const token = localStorage.getItem('token');
    
    const response = await fetch('http://localhost:5000/user/update/password', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
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
        //TODO: redirect to log in

    }
    else{
        const {message} = data;
        document.querySelector("#message").innerHTML = message;
    }
}