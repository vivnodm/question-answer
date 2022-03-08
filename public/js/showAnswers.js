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
