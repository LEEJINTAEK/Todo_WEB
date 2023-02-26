window.addEventListener("load", () => {
  const form = document.querySelector("#new-form");
  const input = document.querySelector("#new-text");
  const lists = document.querySelector("#tasks");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = input.value;

    if (!task) {
      alert("할 일을 적어주세요~");
      return;
    }

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
    task_input_el.value = task;
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

    input.value = "";

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
  });
});
