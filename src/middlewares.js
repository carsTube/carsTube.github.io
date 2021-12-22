import { html } from './lib.js'

export function spinner() {
    return html`<div class="ring">Loading<span class="spinner"></span></div>`;
}


export function createDeleteConfirm(message, onOk, onCancel) {
    const divOverlay = document.createElement('div');
    divOverlay.id = 'overlay';

    const divModal = document.createElement('div');
    divModal.id = 'modal';
    divOverlay.appendChild(divModal);

    const title = document.createElement('p');
    title.textContent = message;
    divModal.appendChild(title);

    const buttonOk = document.createElement('button');
    buttonOk.textContent = 'Confirm';
    buttonOk.addEventListener('click', onOk);
    divModal.appendChild(buttonOk);

    const buttonCancel = document.createElement('button');
    buttonCancel.textContent = 'Cancel';
    buttonCancel.addEventListener('click', onCancel);
    divModal.appendChild(buttonCancel);

    document.querySelector('main').appendChild(divOverlay);
}


export function createErrorModal(message) {
    const divOverlay = document.createElement('div');
    divOverlay.id = 'overlay';

    const divModal = document.createElement('div');
    divModal.id = 'modal';
    divOverlay.appendChild(divModal);

    const title = document.createElement('p');
    title.textContent = message;
    divModal.appendChild(title);

    const buttonOk = document.createElement('button');
    buttonOk.textContent = 'Okay';
    buttonOk.addEventListener('click', (event) => {
        event.target.parentElement.parentElement.remove();
    });
    divModal.appendChild(buttonOk);

    document.querySelector('main').appendChild(divOverlay);
}


export function createRateModal(message, onRate) {
    const divOverlay = document.createElement('div');
    divOverlay.id = 'overlay';

    const divModal = document.createElement('div');
    divModal.id = 'modal';
    divOverlay.appendChild(divModal);

    const title = document.createElement('p');
    title.textContent = message;
    divModal.appendChild(title);

    const divChoices = document.createElement('div');
    divChoices.className = "modalChoices"
    divModal.appendChild(divChoices);

    const bad = document.createElement('button');
    bad.className = "actionLink";
    bad.innerHTML = "Bad &#x2605;&#x2606;&#x2606;&#x2606;&#x2606;"
    bad.dataset.rating = 1;
    divChoices.appendChild(bad);

    const middle = document.createElement('button');
    middle.className = "actionLink";
    middle.innerHTML = "Middle &#x2605;&#x2605;&#x2606;&#x2606;&#x2606;";
    middle.dataset.rating = 2;
    divChoices.appendChild(middle);

    const good = document.createElement('button');
    good.className = "actionLink";
    good.innerHTML = "Good &#x2605;&#x2605;&#x2605;&#x2606;&#x2606;";
    good.dataset.rating = 3;
    divChoices.appendChild(good);

    const veryGood = document.createElement('button');
    veryGood.className = "actionLink";
    veryGood.innerHTML = "Very good &#x2605;&#x2605;&#x2605;&#x2605;&#x2606;";
    veryGood.dataset.rating = 4;
    divChoices.appendChild(veryGood);

    const excellent = document.createElement('button');
    excellent.className = "actionLink";
    excellent.innerHTML = "Excellent &#x2605;&#x2605;&#x2605;&#x2605;&#x2605;";
    excellent.dataset.rating = 5;
    divChoices.appendChild(excellent);


    document.querySelector('main').appendChild(divOverlay);

    divChoices.addEventListener('click', (event) => {
        if (event.target.nodeName == 'BUTTON'){
            event.target.parentElement.parentElement.parentElement.remove();
            let rating = event.target.dataset.rating;
            console.log(event.target.dataset);
            rating = Number(rating);
            onRate(rating);
        }
         
    })
    


}