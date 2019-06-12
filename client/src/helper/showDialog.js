var dialogMessage = '';

function buildErrorDialog(root, dialog) {
    if (root.firstElementChild) {
        return;
    }

    const div = window.document.createElement('div');
    const br = window.document.createElement('br');
    const acceptButton = window.document.createElement('vaadin-button');

    div.textContent = dialogMessage;
    acceptButton.setAttribute('theme', 'primary');
    acceptButton.textContent = 'Accept';
    acceptButton.setAttribute('style', 'margin-right: 1em');
    acceptButton.addEventListener('click', () => dialog.opened = false);
    root.style.textAlign = 'center';

    root.appendChild(div);
    root.appendChild(br);
    root.appendChild(acceptButton);
}

export default (dialog, message) => {
    dialogMessage = message;
    dialog.renderer = buildErrorDialog;
    dialog.opened = true;
};