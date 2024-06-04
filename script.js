document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').innerText,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    const addTaskToDOM = (task) => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.innerText = task.text;
        taskItem.appendChild(taskText);

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';

        const completeBtn = document.createElement('button');
        completeBtn.innerText = task.completed ? 'Undo' : 'Complete';
        completeBtn.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            completeBtn.innerText = taskItem.classList.contains('completed') ? 'Undo' : 'Complete';
            saveTasks();
        });
        taskButtons.appendChild(completeBtn);

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => {
            const newText = prompt('Edit your task', taskText.innerText);
            if (newText) {
                taskText.innerText = newText;
                saveTasks();
            }
        });
        taskButtons.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
            saveTasks();
        });
        taskButtons.appendChild(deleteBtn);

        taskItem.appendChild(taskButtons);
        taskList.appendChild(taskItem);
    };
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
        }
    });
    loadTasks();
});
