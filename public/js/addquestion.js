const questionform = document.getElementById('questionform');
const category = document.getElementById('category');
const question = document.getElementById('question');
let answerType = 'number';


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
            'Authorization': 'Bearer ' + (localStorage?.getItem('token')!==undefined)?localStorage.getItem('token').toString():" "
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