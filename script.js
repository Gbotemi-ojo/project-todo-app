
//toggle light or dark mode code here
let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkMode', 'enabled');
}
const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkMode', null);
}
if (darkMode === 'enabled') {
    enableDarkMode();
}
darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode');
    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});
let rebble = document.querySelector('.rebble');
rebble.addEventListener('click', () => {
    if (rebble.getAttribute('src') == 'images/icon-sun.svg') {
        rebble.setAttribute('src', 'images/icon-moon.svg');
    }
    else {
        rebble.setAttribute('src', 'images/icon-sun.svg');
    }
})
//Drag and drop api
const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.todoList')

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }
    })
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
};

// application logic;
const input = document.querySelector('input');
const addTodoBtn = document.querySelector('.addBtn');
const pageContainer = document.querySelector('.todoList');
const activeTodo = document.querySelector('.activeTodo');
const completedTodo = document.querySelector('.completedTodo');
const inputContainer = document.querySelector('.inputData');

//switch between pages
const allBtn = document.querySelectorAll('.allBtn');
const activeBtn = document.querySelectorAll('.activeBtn');
const completedBtn = document.querySelectorAll('.completedBtn');
const allTodoListDisplay = document.querySelector('.todoList');
const activeTodoLIstDisplay = document.querySelector('.activeTodo');
const completedTodoDisplay = document.querySelector('.completedTodo');
allBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        inputContainer.style.display = 'flex';
        allTodoListDisplay.style.display = 'block';
        activeTodoLIstDisplay.style.display = 'none';
        completedTodoDisplay.style.display = 'none';
        completedTodo.textContent = ''
        activeTodo.textContent = ''
        btn.style.color = 'hsl(220, 98%, 61%)'
        activeBtn.forEach(btn => {
            btn.style.pointerEvents = 'all'
            btn.style.color = 'hsl(236, 9%, 61%)'
        });
        completedBtn.forEach(btn => {
            btn.style.pointerEvents = 'all'
            btn.style.color = 'hsl(236, 9%, 61%)'
        })
    })
});
activeBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        inputContainer.style.display = "none"
        allTodoListDisplay.style.display = 'none';
        activeTodoLIstDisplay.style.display = 'block';
        completedTodoDisplay.style.display = 'none';
        completedTodo.textContent = ''
        btn.style.pointerEvents = 'none'
        btn.style.color = 'hsl(220, 98%, 61%)'
        completedBtn.forEach(btn => {
            btn.style.pointerEvents = 'all'
            btn.style.color = 'hsl(236, 9%, 61%)'
        })
        allBtn.forEach(btn => {
            btn.style.color = 'hsl(236, 9%, 61%)';
        });
        activeArray.forEach(element => {
            container = factoryDraggableElements();
            activeTodo.appendChild(container);
            todoContainer = factoryDivWithAttributes('', 'todo');
            todoWrapper = factoryDiv();
            todoText = factoryDivWithAttributes();
            horizontalLine = factoryHorizontalLine();
            container.appendChild(todoContainer);
            todoContainer.appendChild(todoWrapper);
            todoWrapper.appendChild(todoText);
            container.appendChild(horizontalLine);
            appendReadOnlyList(container, todoContainer, todoWrapper, todoText, horizontalLine);
            for (let i = 0; i < activeArray.length; i++) {
                todoText.textContent = element.text;
            }
        });
    })
});
completedBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        allTodoListDisplay.style.display = 'none';
        activeTodoLIstDisplay.style.display = 'none';
        completedTodoDisplay.style.display = 'block';
        inputContainer.style.display = "none";
        activeTodo.textContent = '';
        btn.style.pointerEvents = 'none';
        btn.style.color = 'hsl(220, 98%, 61%)';
        activeBtn.forEach(btn => {
            btn.style.pointerEvents = 'all';
            btn.style.color = 'hsl(236, 9%, 61%)';
        });
        allBtn.forEach(btn => {
            btn.style.color = 'hsl(236, 9%, 61%)';
        });

        completedArray.forEach(element => {
            container = factoryDraggableElements();
            completedTodo.appendChild(container);
            todoContainer = factoryDivWithAttributes('', 'todo');
            todoWrapper = factoryDiv();
            todoText = factoryDivWithAttributes();
            horizontalLine = factoryHorizontalLine();
            container.appendChild(todoContainer);
            todoContainer.appendChild(todoWrapper);
            todoWrapper.appendChild(todoText);
            container.appendChild(horizontalLine);
            appendReadOnlyList(container, todoContainer, todoWrapper, todoText, horizontalLine);
            for (let i = 0; i < completedArray.length; i++) {
                todoText.textContent = element.text;
            }
        });
    })
})
let todoArray = [];
let activeArray = [];
let completedArray = [];
class todoObject {
    constructor(text) {
        this.text = text;
        this.completed = false;
        this.setTrue = function () {
            return this.completed = true;
        }
        this.setFalse = function () {
            return this.completed = false;
        }
        this.getState = function () {
            return this.completed;
        }
    }
}
function clearInput() {
    input.value = "";
}
function updateArray() {
    activeArray = todoArray.filter(function (todo) {
        return todo.completed == false;
    });
    completedArray = todoArray.filter(function (todo) {
        return todo.completed == true;
    })
}
addTodoBtn.addEventListener('click', () => {
    if (input.value === '') {
        return;
    }
    todoArray.push(createTodo());
    updateArray()
    createTodoDiv();
    setTodoMethods();
    clearInput();
    resetTodos();
    todoCount.textContent = activeArray.length;
})
function resetTodos() {
    activeTodo.textContent = '';
    completedTodo.textContent = '';
}
function createTodo() {
    const todoItem = new todoObject(input.value);
    return todoItem;
}
function createTodoDiv(container, todoContainer, todoWrapper, todo, checkImg, todoText, deleteButton, horizontalLine) {
    container = factoryDraggableElements();
    pageContainer.appendChild(container)
    todoContainer = factoryDivWithAttributes('', 'todo');
    todoWrapper = factoryDiv();
    todo = factoryDivWithAttributes('', 'circle');
    checkImg = factoryImage('images/icon-check.svg', 'check Svg');
    todoText = factoryDivWithAttributes(input.value);
    deleteButton = factoryImage('images/icon-cross.svg', 'delete Button');
    horizontalLine = factoryHorizontalLine();
    container.appendChild(todoContainer);
    todoContainer.appendChild(todoWrapper);
    todoWrapper.appendChild(todo);
    todo.appendChild(checkImg);
    todoWrapper.appendChild(todoText);
    todoContainer.appendChild(deleteButton);
    container.appendChild(horizontalLine);
    appendTodoList(container, todoContainer, todoWrapper, todo, checkImg, todoText, deleteButton, horizontalLine);
    return container;
}
function setTodoMethods() {
    const setTodo = document.querySelector(".todoList > :last-child > :nth-child(1) > :nth-child(1) > :nth-child(2)");
    setTodo.textContent = createTodo().text;
    //////////////////////DELETE BUTTON 
    const deletebutton = document.querySelector(".todoList > :last-child > :nth-child(1) > :nth-child(2)");
    deletebutton.setAttribute('class', 'delete');
    const deleteButton = document.querySelectorAll('.delete');
    deleteButton.forEach(item => {
        item.addEventListener('click', () => {
            const itemText = item.parentElement.firstChild.lastChild.textContent;
            const itemPos = todoArray.findIndex(item => item.text == itemText);
            if (itemPos > -1) {
                todoArray.splice(itemPos, 1);
                completedArray.splice(itemPos, 1);
                activeArray.splice(itemPos, 1);
                item.parentElement.parentElement.remove();
                updateArray()
                todoCount.textContent = activeArray.length
            }
        });
    });
    const checkBtn = document.querySelector('.todoList > :last-child > :nth-child(1) >:nth-child(1) >:nth-child(1)');
    checkBtn.setAttribute('class', 'circle');
    const checkButton = document.querySelectorAll('.circle');
    checkButton.forEach(item => {
        item.addEventListener("click", () => {
            const itemText = item.parentElement.lastChild.textContent;
            const itemPos = todoArray.findIndex(item => item.text == itemText);
            item.firstChild.style.visibility = 'visible';
            item.style.backgroundImage = 'linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))';
            item.parentElement.lastChild.style.textDecoration = 'line-through';
            if (itemPos > -1) {
                if (todoArray[itemPos].getState() === false) {
                    todoArray[itemPos].completed = true;
                    console.log(todoArray[itemPos]);
                }
            }
            activeArray = [];
            completedArray = [];
            activeArray = todoArray.filter(function (todo) {
                return todo.completed == false;
            });
            completedArray = todoArray.filter(function (todo) {
                return todo.completed == true;
            })
            todoCount.textContent = activeArray.length
        })
    })
}
function appendTodoList(container, todoContainer, todoWrapper, todo, checkImg, todoText, deleteButton, horizontalLine) {
    container.appendChild(todoContainer);
    todoContainer.appendChild(todoWrapper);
    todoWrapper.appendChild(todo);
    todo.appendChild(checkImg);
    todoWrapper.appendChild(todoText);
    todoContainer.appendChild(deleteButton);
    container.appendChild(horizontalLine);
};
function appendReadOnlyList(container, todoContainer, todoWrapper, todoText, horizontalLine) {
    container.appendChild(todoContainer);
    todoContainer.appendChild(todoWrapper);
    todoWrapper.appendChild(todoText);
    container.appendChild(horizontalLine);
};
const clearCompleted = document.querySelector('.clearCompleted');
clearCompleted.addEventListener('click', () => {
    resetArray();
    updateArray();
    clearTicks();
    todoCount.textContent = activeArray.length;
})
function resetArray() {
    todoArray.map(function (element) {
        return element.completed = false;
    })
}
function clearTicks() {
    let circle = document.querySelectorAll('.circle');
    circle.forEach(element => {
        element.style.background = 'rgba(4, 2, 4, 0)';
        element.firstChild.style.visibility = 'hidden';
        element.parentElement.lastChild.style.textDecoration = 'none';
    });
}
const todoCount = document.querySelector('.todoCount')
todoCount.textContent = activeArray.length;
function factoryDiv() {
    return document.createElement('div');
}
function factoryDraggableElements() {
    const div = document.createElement('div');
    div.setAttribute('class', 'draggable');
    div.setAttribute('draggable', 'true');
    return div;
}
function factoryDivWithAttributes(text, className) {
    const div = document.createElement('div');
    div.textContent = text;
    div.setAttribute('class', className);
    return div;
}
function factoryImage(src, alt) {
    const image = document.createElement('img');
    image.setAttribute('src', src);
    image.setAttribute('alt', alt);
    return image;
}
function factoryHorizontalLine() {
    const horizontalLine = document.createElement('hr');
    horizontalLine.setAttribute('size', '1');
    return horizontalLine;
}
