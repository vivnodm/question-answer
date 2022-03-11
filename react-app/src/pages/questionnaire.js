import React, { useEffect, useState } from "react";
import getAuth from "../config/auth";
import {Link, Redirect} from "react-router-dom";

export default function Questionnaire() {

    const [questions, setQuestions] = useState([]);
    let [answer, setAnswer] = useState('');
    let [pointer, setPointer] = useState(0);
    let [category, setCategory] = useState('')

    const [loading, setLoading] = useState(false);

    const getCategory = async (category_id) => {
        const response = await fetch(`/getCategory/${category_id}`);
        const data = await response.json();
        setCategory(data.category);
        setLoading(true);
    }

    useEffect(() => {

        const getQuestions = async () => {

            const response = await fetch('/qa/getquestions', {
                headers: {
                    'Authorization': getAuth()
                }
            });
            if (response.status === 200) {
                //response.json(data=>console.log(data))
                const data = await response.json();
                console.log(data)
                setQuestions(data.questions);
                getCategory(data.questions[0].category_id);

            }
            else {
                alert('Error: fetching questions');
            }
        }
        getQuestions();
    }, [])

    const nextQuestion = (e) => {
        e.preventDefault();
        try {
            if (pointer === questions.length - 2) {
                document.getElementById('next').setAttribute('disabled', 'disabled');
            }
            if (pointer === questions.length - 2) {
                document.getElementById('submit').removeAttribute('disabled');
            }

            if (answer !== '') {
                questions[pointer].answerValue = answer;
                setPointer(p => p + 1);
                getCategory(questions[pointer + 1].category_id);
                document.getElementById('answer').setAttribute('type', questions[pointer + 1].answerType)
                setAnswer('')
            }
            else {
                throw new Error("error")
            }
        }
        catch (e) {
            console.log(e);
            alert("PLease provide valid input!")
        }

    }

    const prevQuestion = (e) => {
        e.preventDefault();

        if (pointer > 0) {
            document.getElementById('next').removeAttribute('disabled');
            setPointer(p => p - 1)
            getCategory(questions[pointer - 1].category_id);
            answer = questions[pointer - 1].answerValue

        }
        if (pointer <= questions.length - 2) {
            document.getElementById('submit').setAttribute('disabled', 'disabled');
        }
    }

    const submitQuestion = (e) => {
        console.log('00000')
        e.preventDefault();
        const submitQues = async () => {
            if (answer === '') {
                return alert('provide your answer')
            }
            questions[pointer].answerValue = answer;
            questions.map(async (ques) => {
                const response = await fetch('/qa/postanswers', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getAuth()
                    },
                    body: JSON.stringify({ user_id: JSON.parse(localStorage.getItem('user'))._id, question_id: ques._id, answer: ques.answerValue })
                })
                console.log(response.status)
                if (response.status === 201) {

                }
                else {
                    alert('Error: submiting answers');
                    return <Redirect to='/home'/>
                }
            })
            alert('Answer Submitted');
            return <Redirect to='/home'/>;
        }
        submitQues();
    }

    return (
        <div class="container" style={{ marginTop: "15%", width: "30%" }}>
            <div className="row">
                {loading ?
                    <form id="answerForm" onSubmit={submitQuestion}>
                        <h2 align="center">Answer Form</h2>
                        <div class="form-group">
                            <h2 class="Display-1" id="category">{category}</h2>
                        </div>
                        <div class="form-group">
                            <h2 class="Display-1" id="question">{questions[pointer]?.question}</h2>
                        </div>
                        <div class="form-group">
                            <input type="text" name="answer" value={answer} onChange={e => setAnswer(e.target.value)} id="answer" class="form-control" />
                        </div>
                        <div class="form-group">
                            <button type="submit" id="next" onClick={nextQuestion} class="btn btn-primary">Next</button>
                            <button type="submit" id="back" onClick={prevQuestion} class="btn btn-primary">Back</button>
                        </div>
                        <button id="submit" class="btn btn-primary" disabled>SUBMIT</button>

                    </form> : <h1>loading....</h1>}
            </div>
        </div>
    )
}