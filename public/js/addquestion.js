const questionform = document.getElementById('questionform');
const category = document.getElementById('category');
const question = document.getElementById('question');
let answerType = 'text';
let categories = [];

document.getElementById('answerType').addEventListener('change', (e) => {
    console.log(e.target.value)
    answerType = e.target.value;
})


questionform.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/question', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: category.value, question: question.value, answerType: answerType })
    }).then((response) => {
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