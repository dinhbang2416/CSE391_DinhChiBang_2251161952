
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const counter = document.querySelector("#counter");
const clearCompletedBtn = document.querySelector("#clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";

function saveTodos() {
    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}

function updateCounter() {
    const activeCount = todos.filter(
        todo => !todo.completed
    ).length;

    counter.textContent =
        `${activeCount} items left`;
}

function createTodoElement(todo) {

    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (todo.completed) {
        li.classList.add("completed");
    }
    li.dataset.id = todo.id;
    const span = document.createElement("span");
    span.classList.add("todo-text");
    span.textContent = todo.text;
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "❌";
    li.append(span, deleteBtn);
    return li;
}

function renderTodos() {
    todoList.textContent = "";
    let filtered = [...todos];
    if (currentFilter === "active") {
        filtered = todos.filter(
            todo => !todo.completed
        );
    }
    if (currentFilter === "completed") {
        filtered = todos.filter(
            todo => todo.completed
        );
    }
    filtered.forEach(todo => {
        const element =
            createTodoElement(todo);

        todoList.appendChild(element);
    });
    updateCounter();
}
todoForm.addEventListener("submit", e => {
    e.preventDefault();
    const text =
        todoInput.value.trim();
    if (!text) return;
    todos.push({
        id: Date.now(),
        text,
        completed: false
    });
    saveTodos();
    renderTodos();
    todoInput.value = "";
});
todoList.addEventListener("click", e => {
    const li = e.target.closest(".todo-item");
    if (!li) return;
    const id = Number(li.dataset.id);
    if (e.target.classList.contains("delete-btn")) {
        todos = todos.filter(
            todo => todo.id !== id
        );
        saveTodos();
        renderTodos();
        return;
    }
    if (e.target.classList.contains("todo-text")) {
        const todo = todos.find(
            todo => todo.id === id
        );
        todo.completed =
            !todo.completed;
        saveTodos();
        renderTodos();
    }
});
todoList.addEventListener(
    "dblclick",
    e => {
        if (!e.target.classList.contains("todo-text")) 
        {
            return;
        }
        const li =
            e.target.closest(".todo-item");
        const id =
            Number(li.dataset.id);
        const todo =
            todos.find(
                t => t.id === id
            );
        const input =
            document.createElement("input");
        input.classList.add(
            "edit-input"
        );
        input.value = todo.text;
        e.target.replaceWith(input);
        input.focus();
        input.addEventListener(
            "keydown",
            event => {
                if (event.key === "Enter"){
                    const value =
                        input.value.trim();
                    if (value) {
                        todo.text = value;
                    }
                    saveTodos();
                    renderTodos();
                }
            }
        );
    }
);
filterButtons.forEach(btn => {
    btn.addEventListener("click",() => {filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTodos();
    }
    );
});
clearCompletedBtn.addEventListener(
    "click",
    () => {
        todos = todos.filter(
            todo => !todo.completed
        );
        saveTodos();
        renderTodos();
    }
);
renderTodos();