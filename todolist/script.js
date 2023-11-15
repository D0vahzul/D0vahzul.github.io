function addTask() {
    var taskInput = document.getElementById('taskInput');
    var task = taskInput.value.trim();

    if (task) {
        addTaskToList(task);
        taskInput.value = ''; // Clear the input field
        updateTasksCookie();
    } else {
        alert('Please enter a task.');
    }
}

function deleteAllTasks() {
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // This clears out all the tasks
    updateTasksCookie(); // Update the cookie to reflect the change
}

function addTaskToList(task) {
    var li = document.createElement('li');
    li.textContent = task;

    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        li.remove();
        updateTasksCookie();
    };

    li.appendChild(deleteBtn);
    document.getElementById('taskList').appendChild(li);
}

function updateTasksCookie() {
    var tasks = [];
    document.querySelectorAll('#taskList li').forEach(function(li) {
        tasks.push(li.textContent.replace('Delete', '').trim());
    });
    document.cookie = "tasks=" + JSON.stringify(tasks) + ";path=/";
}

function loadTasksFromCookie() {
    var tasksCookie = document.cookie.split('; ').find(row => row.startsWith('tasks='));
    if (tasksCookie) {
        var tasks = JSON.parse(tasksCookie.split('=')[1]);
        tasks.forEach(function(task) {
            addTaskToList(task);
        });
    }
}

// Load tasks from cookie when the page loads
window.onload = loadTasksFromCookie;

// Event listener for the Enter key on the task input
document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});