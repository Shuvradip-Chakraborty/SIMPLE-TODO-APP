///select DOM elements..

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

//We have to check that if there are any todos present in the localStorage or not!, if any then saved it
const saved = localStorage.getItem("todos"); ///if any todos present get this in saved variable
const todos = saved? JSON.parse(saved) : [];  //If there’s something saved in localStorage, convert it from JSON string to a JavaScript array; otherwise, start with an empty array.”

///function to save Todos to LocalStorage..
function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

//creating a node for a todo object and append it to the list..
function createTodoNode(todo, index){
    const li = document.createElement('li');

    //creating checkbox for toggle completion..
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;        //convert true to true & false to false..

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;

      //TODO: Visual feedback => a strike-through when completed.
      textSpan.style.textDecoration = todo.completed ? "line-through" : "";
      saveTodos();
    })

  
     
    //Text of the todo..
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }


    //Add double-click event listener to edit todo..
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if(newText !== null){
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    })

    //Delete Todo Button.
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;

}


//render the whole todo list from the todos array.
function render(){
    list.innerHTML = '';

    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);      
        list.appendChild(node);        
    });
}

//function for add todo..
function addTodo(){
    const text = input.value.trim();
    if(!text){
        return;
    }

    todos.push({text, completed:false});
    input.value = '';
    render();
    saveTodos();
}

addBtn.addEventListener("click", addTodo);

//add the task when the enter button is clicked..
input.addEventListener("keydown", (e) => {
    if(e.key == "Enter"){
        addTodo();
    }
})

render();