import React, { useState } from "react";
import {Link, Navigate} from "react-router-dom";

const Register = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isAdmin, setIsAdmin] = useState(false);

    const registerHandler = (e) => {
        e.preventDefault();
        fetch('/user/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password, isAdmin: isAdmin })
        }).then((response) => {
            console.log(response);
            if (response.status === 201) {
                response.json().then((data) => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert("Registration Successfull");
                    document.location.href = '/';
                })
            }
            else {
                alert('Invalid user details/ User Exists');
            }

        })
    }

    return (
        <div class="container" style={{marginTop:"15%",width:"30%"}}>
            <div className="row">
                <form id="registerform">
                    <h2 align="center">Register</h2>
                    <div class="form-group">
                        <div class="form-group">
                            <label for="username">Name</label>
                            <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)} id="username" placeholder="Name"/>
                        </div>
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp"
                            placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                                else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="InputPassword" placeholder="Password"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputisAdmin">isAdmin</label>
                        <input type="checkbox" id="isAdmin" onChange={(e)=>setIsAdmin(e.target.checked)}/>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={registerHandler}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register;