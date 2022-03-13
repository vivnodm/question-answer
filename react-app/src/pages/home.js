import React from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
const Home = () => {
    // if (!localStorage.getItem('token')) {
    //     document.location.href = '/'
    // }
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    const navigate = useNavigate();

    return (
        <div class="container justify-content-center">
            <nav class="navbar navbar-light bg-light">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 class="display-1">Question and Answer</h1>
                    <button id="logout" class="btn btn-primary" onClick={logout} style={{ height: "50px" }}>Logout</button>
                </div>

            </nav>
            <div class="row">
                <div class="col-md-8">
                    <div class="col-4">
                        {JSON.parse(localStorage.getItem('user'))?.isAdmin &&
                            <div class="list-group" id="list-tab" role="tablist">
                                <Link class="list-group-item list-group-item-action " id="list-home-list"
                                    data-toggle="list" role="tab" to="/category">Add category</Link>
                                <Link class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list"
                                    role="tab" to="/addquestion">Add Question</Link>
                                <Link class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list"
                                    role="tab" to="/showAnswers">Show Answers</Link>
                            </div>}
                        {!JSON.parse(localStorage?.getItem('user'))?.isAdmin &&
                            <div class="list-group" id="list-tab" role="tablist">
                                <a class="list-group-item list-group-item-action " id="list-home-list"
                                    data-toggle="list" role="tab" href="/category">Add category</a>
                                <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list"
                                    role="tab" href="/addquestion">Add Question</a>
                                <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list"
                                    role="tab" href="/showAnswers">Show Answers</a>
                                <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list"
                                    role="tab" href="/questionnaire">Answer Questionnaire</a>
                                <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list"
                                    role="tab" href="https://vl-strapi-project.herokuapp.com/admin/auth/login">Strapi</a>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;