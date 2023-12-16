document.getElementById('addModel').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('addName').value;
    const score = document.getElementById('addScore').value;

    fetch('/api/model/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, score}),
    })
        .then(response => response.json())
        .then(data => Swal.fire({text:'Model added!', icon: "success"}))
        .catch((error) => console.error('Error:', error));
    loadModels();
});

document.getElementById('updateModel').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const score = document.getElementById('updateScore').value;

    fetch('/api/model/' + id, {
        method: 'patch',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, score}),
    })
        .then(response => response.json())
        .then(data => Swal.fire('Model updated!'))
        .catch((error) => console.error('Error:', error));
    loadModels()
});



document.getElementById('deleteModel').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('deleteId').value;

    fetch('/api/model/' + id, {
        method: 'DELETE'
    })
        .then(() => Swal.fire('Model deleted'))
        .catch((error) => console.error('Error:', error));
    loadModels()
});



document.getElementById('searchModel').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('searchId').value;

    fetch('api/model/' + id)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const resultDiv = document.getElementById('searchResultModel');
            const modelData = `<p>ID: ${data.data.id}</p>
                          <p>Name: ${data.data.name}</p>
                          <p>Score: ${data.data.score}</p>`;
            resultDiv.innerHTML = modelData;
        })
        .catch((error) => {
            document.getElementById('searchResultModel').innerHTML = `<p>${error.message}</p>`;
            console.error('Error:', error);
        });
});

function loadModels() {
    fetch('/api/models')
        .then(response => response.json())
        .then(models => {
            const tableBody = document.getElementById('modelsTableBody');
            tableBody.innerHTML = ''; // Очистить текущие строки таблицы
            models.data.forEach(model => {
                const row = `<tr>
                            <td>${model.id}</td>
                            <td>${model.name}</td>
                            <td>${model.score}</td>
                        </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch((error) => console.error('Error:', error));
}

// Загрузить пользователей при загрузке страницы
window.onload = loadModels();
