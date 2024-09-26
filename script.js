function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== "" && dateInput.value && timeInput.value) {
        const taskItem = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.innerText = `${taskInput.value} (Due: ${dateInput.value} ${timeInput.value})`;

        const completeButton = document.createElement('button');
        completeButton.innerText = 'Complete';
        completeButton.onclick = () => completeTask(taskItem);

        taskItem.appendChild(taskText);
        taskItem.appendChild(completeButton);
        taskList.appendChild(taskItem);

        const dueTime = new Date(`${dateInput.value}T${timeInput.value}`);
        taskItem.dueTime = dueTime;

        checkTaskOverdue(taskItem);

        taskInput.value = "";
        dateInput.value = "";
        timeInput.value = "";
    }
}

function completeTask(taskItem) {
    taskItem.remove();
    showCompletionPopup();
}

function showCompletionPopup() {
    const popup = document.getElementById('completionPopup');
    const sound = document.getElementById('completionSound');
    popup.style.display = 'block';
    sound.play();
}

function closePopup() {
    const popup = document.getElementById('completionPopup');
    popup.style.display = 'none';
}

function checkTaskOverdue(taskItem) {
    const alertSound = document.getElementById('alertSound');
    const intervalId = setInterval(() => {
        const currentTime = new Date();
        if (currentTime > taskItem.dueTime) {
            alertSound.play();
            clearInterval(intervalId);
        }
    }, 1000);
}
