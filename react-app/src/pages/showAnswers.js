import React, { useEffect, useState } from "react";
import getAuth from "../config/auth";
import {Link, Redirect} from "react-router-dom";
export default function ShowAnswers() {

    const [ans, setAns] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('hehe')
        const requestAnswers = async () => {
            const response = await fetch('/qa/showAnswers', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuth()
                }
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data.ans);
                setAns(data.ans);
                setLoading(false);
            }
            else {
                alert("error: fetching answers");
                return <Redirect to= '/home'/>
            }
        }
        requestAnswers();
    }, [])

    return (
        <div class="container" style={{ marginTop: "15%", width: "30%" }}>
            <div className="row">

                {!loading ? <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Question</th>
                            <th scope="col">Answer</th>
                            <th scope="col">SubmittedAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ans.map((answer) =>
                            <tr>
                                <td> {answer.name}</td>
                                <td> {answer.question}</td>
                                <td>{answer.answer}</td>
                                <td> {answer.createdAt} </td>
                            </tr>
                        )
                        }
                    </tbody>
                </table> : <h1>loading...</h1>}

            </div>
        </div>
    )
}