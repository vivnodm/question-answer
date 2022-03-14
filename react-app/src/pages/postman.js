import React, { useState } from "react";

export default function Postman() {

    const [url, setUrl] = useState();

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            document.getElementById('responseArea').innerHTML = JSON.stringify(data,undefined,3);
        }
        else {
            alert('Invalid url');
        }
    }
    return (
        <div class="container" style={{ marginTop: "15%", width: "30%" }}>
            <div className="row">
                <form id="loginform">
                    <h2 align="center">Strapi CMS</h2>
                    <div class="form-group">
                        <label >URL</label>
                        <input type="text" class="form-control" id="InputEmail"
                            placeholder="Enter url" value={url} onChange={(e) => setUrl(e.target.value)} />
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={submitHandler}>Submit</button>
                    <div class="form-group">
                        <pre id='responseArea'></pre>
                    </div>

                </form>
            </div>
        </div>
    )
}