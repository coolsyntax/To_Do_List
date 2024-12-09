document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");

  const addTaskButton = document.getElementById("add-task-btn");

  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    renderTasks(task);
  });

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();

    if (taskText === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks(newTask);
    todoInput.value = "";
  });

  function renderTasks(task) {
    const li = document.createElement("li");
    li.setAttribute("task-id", task.id);
    if (task.completed) {
      li.classList.add("line-through");
    }
    const liClass = [
      "relative",
      "text-xl",
      "px-3",
      "py-1",
      "bg-slate-200",
      "p-2",
      "rounded-3xl",
      "focus:outline-none",
      "mb-2",
      "cursor-pointer",
    ];
    liClass.forEach((element) => {
      li.classList.add(element);
    });

    li.innerHTML = `${task.text}`;

    const btn = document.createElement("button");

    const btnClass = [
      "bg-red-600",
      "font-medium",
      "right-0",
      "absolute",
      "px-2",
      "rounded-3xl",
      "hover:bg-red-700",
    ];

    btnClass.forEach((element) => {
      btn.classList.add(element);
    });

    btn.innerHTML = "Delete";

    li.appendChild(btn);

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        return;
      }

      task.completed = !task.completed;
      li.classList.toggle("line-through");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id != task.id);
      li.remove;
      saveTasks();
      location.reload();
    });

    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
