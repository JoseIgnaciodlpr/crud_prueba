document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("userForm");
    const userTable = document.getElementById("userTable");
    const loginForm = document.getElementById("loginForm");

    // Load users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Display users on page load
    displayUsers();

    // CRUD Operations
    userForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const imageInput = document.getElementById("image").files[0];

        const reader = new FileReader();
        reader.onload = function (e) {
            const image = e.target.result;
            const user = { username, email, image };
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));  // Save to localStorage
            displayUsers();
            userForm.reset();
        };
        reader.readAsDataURL(imageInput);
    });

    function displayUsers() {
        userTable.innerHTML = "";
        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${user.image}" alt="${user.username}" class="img-thumbnail"></td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Eliminar</button>
                </td>
            `;
            userTable.appendChild(row);
        });
    }

    window.editUser = function (index) {
        const user = users[index];
        document.getElementById("username").value = user.username;
        document.getElementById("email").value = user.email;
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));  // Update localStorage
        displayUsers();
    };

    window.deleteUser = function (index) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));  // Update localStorage
        displayUsers();
    };

    // Simple Login Redirection
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            window.location.href = "index.html";
        });
    }
});
