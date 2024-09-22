let taskList = [];

document.getElementById("add-task-btn").addEventListener("click", addTask);

function addTask() {
	let taskInput = document.getElementById("task-input");
	let task = taskInput.value.trim();
	if (task !== "") {
		taskList.push({ task, completed: false, dateTime: new Date().toLocaleString() });
		taskInput.value = "";
		updateTaskList();
	}
}

function updateTaskList() {
	let taskListHTML = "";
	taskList.forEach((task, index) => {
		taskListHTML += `
			<li class="task-item">
				<input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleCompleted(${index})">
				<span
class="task-text ${task.completed ? "completed" : ""}">${task.task}</span>
				<span class="date-time">${task.dateTime}</span>
				<button onclick="editTask(${index})">Edit</button>
				<button onclick="deleteTask(${index})">Delete</button>
				<div class="edit-mode">
					<input type="text" value="${task.task}">
					<button onclick="saveEdit(${index})">Save</button>
				</div>
			</li>
		`;
	});
	document.getElementById("task-list").innerHTML = taskListHTML;
}

function toggleCompleted(index) {
	taskList[index].completed = !taskList[index].completed;
	updateTaskList();
}
function editTask(index) {
	let editMode = document.querySelectorAll(".edit-mode")[index];
	editMode.classList.toggle("active");
}

function saveEdit(index) {
	let newTask = document.querySelectorAll(".edit-mode input")[index].value.trim();
	if (newTask !== "") {
		taskList[index].task = newTask;
		updateTaskList();
	}
}

function deleteTask(index) {
	taskList.splice(index, 1);
	updateTaskList();
}
