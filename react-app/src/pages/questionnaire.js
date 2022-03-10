import React, { useEffect, useState } from "react";
import getAuth from "../config/auth";

export default function Questionnaire() {

    const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState('');
    const [pointer, setPointer] = useState(0);
    const [category, setCategory] = useState('')

    const [loading, setLoading] = useState(false);

    const getCategory = async (category_id) => {
        const response = await fetch(`/getCategory/${category_id}`);
        const data = await response.json();
        setCategory(data.category);
        setLoading(true);
    }

    useEffect(() => {

        const getQuestions = async () => {

            const response = await fetch('http://127.0.0.1:5000/qa/getquestions', {
                headers: {
                    'Authorization': getAuth()
                }
            });
            if (response.status === 200) {
                const data = await response.json();
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
            if (pointer === questions.length - 1) {
                document.getElementById('next').setAttribute('disabled', 'disabled');
                return;
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
            getCategory(questions[pointer + 1].category_id);
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
                const response = await fetch('http://localhost:5000/qa/postanswers', {
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
                    return document.location.href = '/home';
                }
            })
            alert('Answer Submitted');
            document.location.href = '/home'
        }
        submitQues();
    }

    return (
        <div class="container" style={{ marginTop: "15%", width: "30%" }}>
            <div className="row">
                {loading ? <form id="answerForm">
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
                    <button type="submit" id="submit" onClick={submitQuestion} class="btn btn-primary" disabled>SUBMIT</button>

                </form> : <h1>loading....</h1>}
            </div>
        </div>
    )
}