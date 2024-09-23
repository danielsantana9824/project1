document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission
    // Get the entered username and password
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const messageEl = document.getElementById('message'); // Element to display messages
    // Retrieve stored users from localStorage, or use an empty object if none exist
    const users = JSON.parse(localStorage.getItem('users')) || {};

    messageEl.innerHTML = ''; // Clear any existing messages

    // 1.2 Login Validation Process
    // Check if the entered username exists in the users object and if the password matches
    if (users[username] && users[username] === password) {
        // If the credentials are valid:
        messageEl.innerHTML = 'Login successful!';
        // Redirect the user to the profile page
        document.location.replace("./profile.html");
    } else {
        // If the credentials are invalid:
        messageEl.innerHTML = 'Invalid username or password';
    }
});

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const messageEl = document.getElementById('message');

    messageEl.innerHTML = '';

    // 2.2 User Creation Process
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
    // 3.2 Modal Helper Functions
    // Function to open a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    // Function to close a modal
    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    // Function to close all modals
    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // 3.3 Modal Trigger Event Listeners
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // 3.4 Modal Close Event Listeners
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // 3.5 Keyboard Event for Closing Modals
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });
});