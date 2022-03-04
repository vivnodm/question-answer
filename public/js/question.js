let cnt = 0;
let questions = [];
const category = document.getElementById('category');
const question = document.getElementById('question')
const answer = document.getElementById('answer')

document.getElementById('answerForm').addEventListener('submit', (e) => {
    e.preventDefault()
})

fetch('/questions', {
    method: 'get',
    headers: {
        'Content-Type': 'application/json'
    }
}).then((response) => {
    console.log(response);
    if (response.status === 200) {
        response.json().then((data) => {
            console.log(data)
            questions = [...data.questions]
            console.log(questions)
            if (questions.length > 0) {
                category.innerHTML = questions[cnt].category
                question.innerHTML = questions[cnt].question
                answer.setAttribute('type', questions[cnt].answerType)
            }
        })
    }
    else {
        alert('Error: fetching questions');
    }

})



document.getElementById('next').addEventListener('click', () => {
    try {
        if (answer.value !== '') {
            cnt = cnt + 1
            category.innerHTML = questions[cnt].category
            question.innerHTML = questions[cnt].question
            answer.setAttribute('type', questions[cnt].answerType)
            answer.value = ''
        }
        else{
            throw new Error("error")
        }

    }
    catch (e) {
        console.log(e);
        alert("PLease provide valid input!")
    }

})

document.getElementById('back').addEventListener('click', () => {
    if (cnt > 0) {
        cnt = cnt - 1
        category.innerHTML = questions[cnt].category
        question.innerHTML = questions[cnt].question
        answer.value = ''
    }
})

