'use strict'

const toggleThemeBtn = document.querySelector('.logo');
const Body = document.querySelector('body');
const logo = document.querySelector('.logo');

toggleThemeBtn.addEventListener('click' ,function() {
  Body.classList.toggle('theme2');
  logo.classList.toggle('logo-toggle');
});

const form = document.querySelector('form');
const inputTask = document.querySelector('#TodoTextInput');
const taskCont = document.querySelector('.Todo-task__container');
const info = document.querySelectorAll('.Todo-status button');
const countList = document.querySelectorAll('.total-items-left'); 
const addBtnTop = document.querySelector('.check-logo-cont-top');
const display = function() {
  if(info[0].classList.contains('active')) {
    allStatus();
    totalList();
    infoHide();
    }

  if(info[1].classList.contains('active')) {
      console.log('bb');
      const count = activeStatus();
      countList.forEach( ele => {
        ele.innerText = `${count} items left`;
      });
      infoHide();
      activeStatus();
    }

  if(info[2].classList.contains('active')) {
    infoHide();
    const count = completedTask();
    countList.forEach( ele => {
      ele.innerText = `${count} items left`;
    });
  }
}

//inserting task list in container
const formFunction = function() {
  const taskText = inputTask.value;
  if(taskText.trim()) {
  addTodo();
  display();
  infoContainer.classList.remove('hideInfoContainer');
  infoContainer.classList.add('displayInfoContainer');
  infoMob.classList.remove('Todo-info-mob-toggle');
  }
}

//add Btn
addBtnTop.addEventListener('click', function() {
  formFunction();
});

//on submit
form.addEventListener('submit', function(e){
  e.preventDefault();
  formFunction();
});

// inserting task list 
const addTodo = function(Element) {
  const TodoList = document.createElement('div');
  TodoList.classList.add('Todo-list-cont');
  // TodoList.classList.add('draggables');
  let taskText = inputTask.value;
  if(Element) {
    taskText = Element.Text;
  }
  if(taskText) {
  TodoList.innerHTML = `
          <div draggable="true" class="Todo-list-sub-cont">
            <div class="cont">
              <button class="check-logo-cont ${Element && Element.complete ? "check-logo-cont-toggle":""}">
              <img class="check-logo" src="/assets/images/icon-check.svg" alt="check-logo">
              </button>
            </div>
            <p class="Todo-task ${Element && Element.complete ? "complete":""}">${taskText}</p>
          </div>
          <button class="cross-logo-cont">
            <img class="cross-logo" src="/assets/images/icon-cross.svg" alt="cross-logo">
          </button>
  `

  taskCont.prepend(TodoList);
  storeDataLs();

  //removeBtn/cross-logo
  const removeBtn = document.querySelector('.cross-logo-cont');
  removeBtn.addEventListener('click', function(){
    TodoList.remove();
    storeDataLs();
    display();
  });

  //check /mark done task
  const textTodo = document.querySelector('.Todo-task');
  const checkBtn = document.querySelector('.check-logo-cont');
  checkBtn.addEventListener('click', function() {
    const ele = checkBtn.closest('.check-logo-cont');
    ele.classList.toggle('check-logo-cont-toggle');
    textTodo.classList.toggle('complete');
    storeDataLs();
    display();
   });
  }
  
  inputTask.value = "";
}


// saving data in localStorage
const storeDataLs = function() {
  let todos = document.querySelectorAll('.Todo-task');
  let arr = [];
  todos.forEach( Element => {
      arr.push ({
        Text : Element.innerText,
        complete : Element.classList.contains('complete')
      })
  });
  localStorage.setItem("todos",JSON.stringify(arr));
}

//getting data from localStorage
  let storageTodos = JSON.parse(localStorage.getItem("todos"));
  if(storageTodos) {
    storageTodos = storageTodos.reverse();
    storageTodos.forEach( ele => {
      addTodo(ele);
    });
  }

//event delegation 
const manageTodos = document.querySelector('.Todo-container__overflow');

const clearComplete = function() {
const todoList = document.querySelectorAll('.Todo-list-cont');
todoList.forEach( ele => { 
  if(ele.children[0].children[1].classList.contains('complete')){
    ele.remove();
    storeDataLs();
  }
}); 
}

// displays all tasks lists
const allStatus = function() {
  let count = 0;
const todoList = document.querySelectorAll('.Todo-list-cont');
  todoList.forEach( ele => {
    ele.style.display = 'flex';
    count++;
  });
  return count;
}
// allStatus();

// display active task lists
const activeStatus = function() {
  let count = 0;
const todoList = document.querySelectorAll('.Todo-list-cont');
  todoList.forEach( ele => {
    if(!ele.children[0].children[1].classList.contains('complete')){
      ele.style.display = "flex";
      count++;
    }
    else 
      ele.style.display = "none";
  });
  return count;
}

// displays completed task lists
const completedTask = function() {
  let count = 0;
const todoList = document.querySelectorAll('.Todo-list-cont');

  todoList.forEach( ele => {
    if(ele.children[0].children[1].classList.contains('complete')) {
      ele.style.display = "flex";
      count++;
    }
    else {
      ele.style.display = "none";
    }
  });
  return count;
}

//count total task lists

const totalList = function(countItems) {
const todoList = document.querySelectorAll('.Todo-list-cont');
const countList = document.querySelectorAll('.total-items-left'); 
let count = 0;
if(countItems == 0 || countItems){
  count = countItems;
  countList.forEach( ele => {
    ele.innerText = `${count} items left`;
  });
}
else {
  todoList.forEach( ele => {
    count++;
  });
  countList.forEach( ele => {
    ele.innerText = `${count} items left`;
  });
}
 
}
totalList();

//handling footer part (all,active,completed)
manageTodos.addEventListener('click',function(e) {
  e.preventDefault();
  storeDataLs();
  if(e.target.classList.contains('clear-item')) {
    clearComplete();
    totalList();
    infoHide();
    allStatus();
    removeActiveClass();
    document.querySelector('.All-status').classList.add('active');
  }

  else if(e.target.classList.contains('All-status')) {
    removeActiveClass();
    e.target.classList.add('active');
    allStatus();
    totalList();
  }

  else if(e.target.classList.contains('Active-status')) {
    removeActiveClass();
    e.target.classList.add('active');
    const count = activeStatus()
    totalList(count);
  }

  else if(e.target.classList.contains('Completed-status')) {
    removeActiveClass();
    e.target.classList.add('active');
    const count = completedTask();
    totalList(count);
  }

});

//remove active classes
const removeActiveClass = function() {
  const info = document.querySelectorAll('.Todo-status button');
  info.forEach( ele => 
    ele.classList.remove('active')
    );
}

//hide info
const infoContainer = document.querySelector('.Todo-status-container');
const infoMob = document.querySelector('.Todo-info-mob');
const infoHide = function() {
  if(allStatus() === 0) {
    infoContainer.classList.remove('displayInfoContainer');
    infoContainer.classList.add('hideInfoContainer');
    infoMob.classList.add('Todo-info-mob-toggle');
  }
}
infoHide();


