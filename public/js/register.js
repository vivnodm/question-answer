const registerform = document.getElementById('registerform');
const username = document.getElementById('username');
const emailfield = document.getElementById('InputEmail');
const passwordfield = document.getElementById('InputPassword');
const isAdminfield = document.getElementById('isAdmin');

registerform.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/user/register', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:username.value, email: emailfield.value, password: passwordfield.value, isAdmin: isAdminfield.checked })
    }).then((response) => {
        console.log(response);
        if (response.status === 201) {
            response.json().then((data) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                alert("Registration Successfull");
                document.location.href='/';
            })
        }
        else{
            alert('Invalid user details/ User Exists');
        }

    })
})