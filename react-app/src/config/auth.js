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

export default getAuth;