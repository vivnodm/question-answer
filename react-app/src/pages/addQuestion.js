import React, { useEffect, useState } from "react";
import getAuth from "../config/auth";
import {Link, Redirect} from "react-router-dom";

export default function AddQuestion() {

    const [categories, setCategories] = useState();
    const [category, setCategory] = useState();
    const [question, setQuestion] = useState();
    const [answerType, setAnswerType] = useState('number');
    const [done, setDone] = useState(false);

    useEffect(() => {
        const getcategories = async () => {
            try {
                const response = await fetch('/qa/getcategories', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getAuth()
                    }
                });
                if (response.status === 200) {
                    console.log(response)
                    const data = await response.json();
                    setCategories(data.categories)
                    setCategory(data.categories[0]);
                    setDone(true);
                }
                else {
                    alert('Error:getting categories');
                }
            }
            catch (e) {
                console.log(e)
            }
        }
        getcategories();

    }, []);

    const questionHandler = async (e) => {
        e.preventDefault();
        if (question === '') {
            return alert("Enter your question")
        }
        const response = await fetch('/qa/postquestion', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuth()
            },
            body: JSON.stringify({ category_id: category, question: question, answerType: answerType })
        })
        if (response.status === 201) {
            alert("Question Added");
            return <Redirect to='/home'/>
        }
        else {
            alert('Error: adding question');
        }
    }

    return (
        <div class="container" style={{ marginTop: "15%", width: "30%" }}>
            <div className="row">
                {done ? <form id="questionform">
                    <h2 align="center" >Question Form</h2>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select class="form-select" id="category" onChange={(e) => setCategory(e.target.value)}>
                            {categories.map((cat) => <option value={cat._id}>{cat.category}</option>)}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="question">Question</label>
                        <input type="text" class="form-control" onChange={(e) => setQuestion(e.target.value)} id="question" placeholder="Enter question" />
                    </div>
                    <div class="form-group">
                        <label>Answer Type</label>
                        <select class="form-select form-select-lg mb-3" onChange={(e) => setAnswerType(e.target.value)} aria-label=".form-select-lg example"
                            id="answerType">
                            <option value="number">number</option>
                            <option value="text">text</option>
                            <option value="Date">Date</option>
                        </select>
                    </div>
                    <button type="submit" onClick={questionHandler} class="btn btn-primary">Submit</button>
                </form> : <h1>loading...</h1>}
            </div>
        </div>
    )
}