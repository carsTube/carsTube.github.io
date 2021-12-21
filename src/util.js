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

    if (userData) {
        user.style.display = 'inline-block';
        guest.style.display = 'none';
    } else {
        user.style.display = 'none';
        guest.style.display = 'inline-block';
    }

}


export function parseQuery(queryString) {
    if (queryString == '') {
        return {}
    } else {
        return queryString.split('&').reduce((a, c) => {
            const [key, value] = c.split('=');
            a[key] = value;
            return a;
        }, {});
    }
}

export function currentAdId() {
    return window.location.href.split('/')[4];
}

export function craeateQueryWithDoublePointers(ownerId, adId) {
    return `where={ \"ad\":{ \"__type\": \"Pointer\", \"className\": \"Ad\", \"objectId\": \"${adId}\" },\"owner\":{ \"__type\": \"Pointer\", \"className\": \"_User\", \"objectId\": \"${ownerId}\" } }`
}