'use strict'

const toggleThemeBtn = document.querySelector('.logo');
const Body = document.querySelector('body');
const logo = document.querySelector(".logo");

toggleThemeBtn.addEventListener('click' ,function() {
  Body.classList.toggle('theme2');
  logo.classList.toggle('logo-toggle')
});


const form = document.querySelector('form');
const inputTask = document.querySelector('#TodoTextInput');
const taskCont = document.querySelector('.Todo-task__container');


form.addEventListener('submit',function(e){
  e.preventDefault();
  addTodo();
});

const addTodo = function(Element) {
  const TodoList = document.createElement('div');
  TodoList.classList.add('Todo-list-cont');
  let taskText = inputTask.value;
  if(Element) {
    taskText = Element.Text;
    console.log(taskText)
  }
  // console.log(Element)
  // console.log(Element.complete);
  if(taskText) {
  TodoList.innerHTML = `
  <div class="Todo-list-sub-cont">
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

  // if(Element)
  // taskCont.append(TodoList);
  // else
  taskCont.prepend(TodoList);5
  storeDataLs();

  const removeBtn = document.querySelector('.cross-logo-cont');
  removeBtn.addEventListener('click', function(){
    TodoList.remove();
    storeDataLs();
  });

  const textTodo = document.querySelector('.Todo-task');
  // console.log(textTodo)
  const checkBtn = document.querySelector('.check-logo-cont');
  // console.log(checkBtn)
  storeDataLs();
  checkBtn.addEventListener('click', function() {
    const ele = checkBtn.closest('.check-logo-cont');
    console.log(ele);
    ele.classList.toggle('check-logo-cont-toggle');
    textTodo.classList.toggle('complete');
    storeDataLs();
  })
  }
  inputTask.value="";
}

// taskCont.addEventListener('click', function(e) {
//   // console.log(e.target);
//   if(e.target.classList.contains('check-logo-cont')) {
//     const tar = e.target;
//     // console.log('ss');
//     const v = tar.closest('.check-logo-cont');
//     v.classList.toggle('check-logo-cont-toggle');

//   }

// })

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

let storageTodos = JSON.parse(localStorage.getItem("todos"));
if(storageTodos) {
  storageTodos=storageTodos.reverse();
  storageTodos.forEach( ele => {
    addTodo(ele);
    console.log(ele.Text);
  });
}