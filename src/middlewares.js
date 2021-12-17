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
    buttonOk.textContent = 'Delete';
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