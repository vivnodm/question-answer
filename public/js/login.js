const loginform = document.getElementById('loginform');
const emailfield = document.getElementById('InputEmail');
const passwordfield = document.getElementById('InputPassword');

if(localStorage){
    if(localStorage.getItem('token')){
        document.location.href='/home'
    }
}

loginform.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/user/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailfield.value, password: passwordfield.value })
    }).then((response) => {
        console.log(response);
        if (response.status === 200) {
            response.json().then((data) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                document.location.href='/home';
            })
        }
        else{
            alert('INVALID CREDENTAILS')
        }

    })
})