import React, { useState } from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import getAuth from "../config/auth";

const Category = () => {

    const [category, setCategory] = useState();
    const navigate= useNavigate();

    const categoryHandler = (e) => {
        e.preventDefault();
        if (category.value === '') {
            return alert('Enter category name');
        }
        fetch('/addcategory', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuth()
            },
            body: JSON.stringify({ category: category })
        }).then((response) => {
            console.log(response);
            if (response.status === 201) {
                alert('category added');
                navigate('/home');
            }
            else {
                alert('error')
            }

        })
    }



    return (
        <div class="container" style={{ marginTop: "15%", width: "30%" }}>
            <div className="row">
                <form id="loginform">
                    <h2 align="center">category</h2>
                    <div class="form-group">
                        <input type="text" class="form-control" value={category} onChange={(e) => setCategory(e.target.value)} id="categoryInput" placeholder="category" />
                    </div>
                    <button id="addButton" class="btn btn-primary" onClick={categoryHandler}>Add</button>
                </form>
            </div>
        </div>
    )
}

export default Category;