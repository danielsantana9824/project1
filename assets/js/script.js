document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const messageEl = document.getElementById('message');
    const users = JSON.parse(localStorage.getItem('users')) || {};

    messageEl.innerHTML = '';

    if (users[username] && users[username] === password) {
        messageEl.innerHTML = 'Login successful!';
        document.location.replace("./profile.html");
    } else {
        messageEl.innerHTML = 'Invalid username or password';
    }
});

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const messageEl = document.getElementById('message');

    messageEl.innerHTML = '';

    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        messageEl.innerHTML = 'Username already exists';
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        messageEl.innerHTML = 'User created successfully';
        document.getElementById('signupForm').reset();
        modal.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });
});