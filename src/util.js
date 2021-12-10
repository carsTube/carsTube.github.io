export function setUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
}


export function getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
}


export function clearUserData() {
    localStorage.removeItem('userData');
}


export function updateUserNav() {
    const user = document.getElementById('user');
    const guest = document.getElementById('guest');
    const userData = getUserData();

    if(userData) {
        user.style.display = 'inline-block';
        guest.style.display = 'none';
    } else {
        user.style.display = 'none';
        guest.style.display = 'inline-block';
    }

}