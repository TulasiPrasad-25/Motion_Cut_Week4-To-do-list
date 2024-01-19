document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    taskList.addEventListener('click', function (e) {
        const target = e.target;

        if (target.tagName === 'BUTTON') {
            deleteTask(target.parentElement);
        } else if (target.tagName === 'LI') {
            toggleTask(target);
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button>Delete</button>
        `;
        taskList.appendChild(li);
        updateLocalStorage();
    }

    function deleteTask(taskElement) {
        taskElement.remove();
        updateLocalStorage();
    }

    function toggleTask(taskElement) {
        taskElement.classList.toggle('completed');
        updateLocalStorage();
    }

    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li span').forEach(task => tasks.push(task.innerText));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => addTask(taskText));
    }

    loadTasksFromLocalStorage();
});