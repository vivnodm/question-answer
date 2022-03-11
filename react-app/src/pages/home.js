import React from "react";
import {Link, Navigate} from "react-router-dom";
const Home = () => {
    // if (!localStorage.getItem('token')) {
    //     document.location.href = '/'
    // }
    const logout = () => {
        localStorage.clear();
        document.location.href = '/'
    }

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
                                <Link class="list-group-item list-group-item-action " id="list-home-list"
                                    data-toggle="list" role="tab" to="/category">Add category</Link>
                                <Link class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list"
                                    role="tab" to="/addquestion">Add Question</Link>
                                <Link class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list"
                                    role="tab" to="/showAnswers">Show Answers</Link>
                                <Link class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list"
                                    role="tab" to="/questionnaire">Answer Questionnaire</Link>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;