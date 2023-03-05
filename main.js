window.addEventListener("load", () => {
  const form = document.querySelector("#new-form");
  const input = document.querySelector("#new-text");
  const lists = document.querySelector("#tasks");

  let todoList = [];

  const jsonLocalStorage = {
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
      return JSON.parse(localStorage.getItem(key));
    },
  };

  function saveTodo(todo) {
    const toObject = {
      text: todo,
      id: todoList.length + 1,
    };
    todoList.push(toObject);
    jsonLocalStorage.setItem("todolist", todoList);
  }

  function loadToDoList() {
    const loadedToDoList = jsonLocalStorage.getItem("todolist");
    if (loadedToDoList !== null) {
      for (let toDo of loadedToDoList) {
        const { text } = toDo; //const text = toDo.text
        paint(text);
        saveTodo(text);
      }
    }
  }

  function paint(text) {
    //html 주석 처리부분
    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    lists.appendChild(task_el);
    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = text;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);

    const btn_el = document.createElement("div");
    btn_el.classList.add("btn");

    const btn_edit = document.createElement("button");
    btn_edit.classList.add("edit");
    btn_edit.innerText = "Edit";

    const btn_delete = document.createElement("button");
    btn_delete.classList.add("delete");
    btn_delete.innerText = "Delete";

    task_el.appendChild(btn_el);
    btn_el.appendChild(btn_edit);
    btn_el.appendChild(btn_delete);

    //edit
    btn_edit.addEventListener("click", () => {
      if (btn_edit.innerText === "Edit") {
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
        btn_edit.innerText = "Save";
      } else {
        task_input_el.setAttribute("readonly", "readonly");
        btn_edit.innerText = "Edit";
      }
    });

    //delete
    btn_delete.addEventListener("click", () => {
      lists.removeChild(task_el);
    });
  }

  function createToDo(e) {
    e.preventDefault();
    const task = input.value;
    paint(task);
    saveTodo(task);
    if (!task) {
      alert("할 일을 적어주세요~");
      return;
    }
    input.value = "";
  }

  function init() {
    loadToDoList();
    form.addEventListener("submit", createToDo);
  }
  init();
});
