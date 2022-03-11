import { useState } from "react";
import {Link, Navigate} from "react-router-dom";
const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    if (localStorage) {
        if (localStorage.getItem('token')) {
           return <Navigate to='/home'/>
        }
    }

    const loginHandler = (e) => {
        e.preventDefault();
        fetch('/user/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password })
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                response.json().then((data) => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    return <Navigate to='/home'/>
                })
            }
            else {
                alert('INVALID CREDENTAILS')
            }

        })
    }

    return (
        <div class="container" style={{marginTop:"15%",width:"30%"}}>
            <div className="row">
                <form id="loginform">
                    <h2 align="center">Login</h2>
                    <div class="form-group">
                        <label htmlfor="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp"
                            placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" value={password} id="InputPassword" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={loginHandler}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login;