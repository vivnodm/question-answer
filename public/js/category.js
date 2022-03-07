const category = document.getElementById('categoryInput');
const addButton = document.getElementById('addButton');

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    if(category.value===''){
        return alert('Enter category name');
    }
    fetch('/addcategory', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (localStorage?.getItem('token')!==undefined)?localStorage.getItem('token').toString():" "
        },
        body: JSON.stringify({ category:category.value })
    }).then((response) => {
        console.log(response);
        if (response.status === 201) {
            alert('category added');
            document.location.href='/'
        }
        else{
            alert('error')
        }

    })
})