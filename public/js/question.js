let cnt = 0;
let questions = [];
const category = document.getElementById('category');
const question = document.getElementById('question')
const answer = document.getElementById('answer')

document.getElementById('answerForm').addEventListener('submit', (e) => {
    e.preventDefault()
})

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault()
    if(answer.value===''){
        return alert('provide your answer')
    }
    questions[cnt].answerValue = answer.value;
    questions.map((ques) => {
        fetch('/postanswers', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (localStorage.getItem('token') !== undefined) ? localStorage.getItem('token').toString() : " "
            },
            body: JSON.stringify({ user_id: JSON.parse(localStorage.getItem('user'))._id, question_id: ques._id, answer: ques.answerValue })
        }).then((response) => {
            console.log(response);
            if (response.status === 201) {

            }
            else {
                alert('Error: submiting answers');
                return document.location.href = '/';
            }

        })

    })
    alert('Answer Submitted');
    document.location.href = '/'

})

fetch('/questions', {
    headers: {
        'Authorization': 'Bearer ' + (localStorage.getItem('token') !== undefined) ? localStorage.getItem('token').toString() : " "
    }
}).then((response) => {
    console.log(response);
    if (response.status === 200) {
        response.json().then(async (data) => {
            console.log(data)
            questions = [...data.questions]
            console.log(questions)
            if (questions.length > 0) {
                category.innerHTML = await fetch(`/getCategory/${questions[cnt].category_id}`).then((res) => res.json().then((data) =>{ return (data.category)}));
                question.innerHTML = questions[cnt].question
                answer.setAttribute('type', questions[cnt].answerType)
            }
        })
    }
    else {
        alert('Error: fetching questions');
    }

})


document.getElementById('next').addEventListener('click', async () => {
    try {
        if (cnt === questions.length - 1) {
            return;
        }
        if (cnt === questions.length - 2) {
            document.getElementById('submit').removeAttribute('disabled');
        }

        if (answer.value !== '') {
            questions[cnt].answerValue = answer.value;
            cnt = cnt + 1
            console.log(questions[cnt].category_id)
            category.innerHTML = await fetch(`/getCategory/${questions[cnt].category_id}`).then((res) => res.json().then((data) =>{ return (data.category)}));
            question.innerHTML = questions[cnt].question
            answer.setAttribute('type', questions[cnt].answerType)
            answer.value = ''
        }
        else {
            throw new Error("error")
        }


    }
    catch (e) {
        console.log(e);
        alert("PLease provide valid input!")
    }

})

document.getElementById('back').addEventListener('click', async () => {
    if (cnt > 0) {
        cnt = cnt - 1
        category.innerHTML = await fetch(`/getCategory/${questions[cnt].category_id}`).then((res) => res.json().then((data) =>{ return (data.category)}));
        question.innerHTML = questions[cnt].question
        answer.value=questions[cnt].answerValue
    }
    if(cnt <= questions.length-2){
        document.getElementById('submit').setAttribute('disabled','disabled');
    }
})

