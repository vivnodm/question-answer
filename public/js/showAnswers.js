const username = document.getElementById('username');
const question = document.getElementById('question');
const answer = document.getElementById('answer');

const getAuth = () => {
    if (localStorage) {
        if (localStorage.getItem('token')) {
            return 'Bearer ' + localStorage.getItem('token').toString();
        }
    }
    else {
        return 'Bearer ' + " "
    }
}

document.getElementById('answerType').addEventListener('change', (e) => {
    console.log(e.target.value)
    answerType = e.target.value;
})


questionform.addEventListener('submit', (e) => {
    e.preventDefault();
    if(question.value===''){
        return alert("Enter your question")
    }
    fetch('/question', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuth()
        },
        body: JSON.stringify({ category_id: category.value, question: question.value, answerType: answerType })
    }).then((response) => {
        console.log(category.value)
        console.log(response);
        if (response.status === 201) {
            alert("Question Added");
            document.location.href = '/';
        }
        else {
            alert('Error: adding question');
        }

    })
})