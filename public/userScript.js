document.getElementById('addForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('addName').value;
    const email = document.getElementById('addEmail').value;
    const password = document.getElementById('addPassword').value;

    fetch('/api/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password}),
    })
        .then(response => response.json())
        .then(data => Swal.fire({text:'User added!', icon: "success"}))
        .catch((error) => console.error('Error:', error));
    loadUsers();
});


document.getElementById('updateForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;
    const password = document.getElementById('updatePassword').value;

    fetch('/api/user/' + id, {
        method: 'patch',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password}),
    })
        .then(response => response.json())
        .then(data => Swal.fire('User updated!'))
        .catch((error) => console.error('Error:', error));
    loadUsers()
});

document.getElementById('deleteForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('deleteId').value;

    fetch('/api/user/' + id, {
        method: 'DELETE'
    })
        .then(() => Swal.fire('User deleted'))
        .catch((error) => console.error('Error:', error));
    loadUsers()
});

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('searchId').value;

    fetch('api/user/' + id)
        .then(response => response.json())
        .then(data => {
            console.log(user)
            const resultDiv = document.getElementById('searchResult');
            const userData = `<p>ID: ${data.id}</p>
                          <p>Name: ${data.name}</p>
                          <p>Email: ${data.email}</p>`;
            resultDiv.innerHTML = userData;
        })
        .catch((error) => {
            document.getElementById('searchResult').innerHTML = `<p>${error.message}</p>`;
            console.error('Error:', error);
        });
});

function loadUsers() {
    fetch('api/users')
        .then(response => response.json())
        .then(users => {
            const tableBody = document.getElementById('usersTableBody');
            tableBody.innerHTML = ''; // Очистить текущие строки таблицы
            console.log(users.data)
            users.data.forEach(user => {
                const row = `<tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                        </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch((error) => console.error('Error:', error));
}
// Загрузить пользователей при загрузке страницы
window.onload = loadUsers;
