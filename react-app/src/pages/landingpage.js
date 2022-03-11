import React from "react";

const Landingpage = () => {
    return (
        <div class="container justify-content-center">
            <nav class="navbar navbar-light bg-light">
                <div>
                    <h1 class="display-1">Landing Page</h1>
                </div>
            </nav>
            <div class="row">
                <div class="col-md-8">
                    <div class="col-4">
                        <div class="list-group" id="list-tab" role="tablist">
                            <a class="list-group-item list-group-item-action " id="list-home-list"
                                data-toggle="list" role="tab" href="/login">Login to Q/A</a>
                            <a class="list-group-item list-group-item-action " id="list-home-list"
                                data-toggle="list" role="tab" href="/register">Register to Q/A</a>
                            <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list"
                                role="tab" href="https://vinod-chat-app.herokuapp.com/">Chat</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landingpage;