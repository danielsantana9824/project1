document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username] === password) {
        alert('Login successful!');
        document.location.replace("./profile.html");
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        alert('Username already exists');
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert('User created successfully');
        document.getElementById('signupForm').reset();
        modal.style.display = "none";
    }
});