'use strict'

const toggleThemeBtn = document.querySelector('.logo');
const Body1 = document.querySelector('body');
const logo = document.querySelector('.logo');

//form control
const form = document.querySelector('form');
const inputTask = document.querySelector('#TodoTextInput');
const taskCont = document.querySelector('.Todo-task__container');
const info = document.querySelectorAll('.Todo-status button');
const countList = document.querySelectorAll('.total-items-left'); 
const addBtnTop = document.querySelector('.check-logo-cont-top');

 //touch sounds
 const switchThemeAudio = new Audio('https://www.fesliyanstudios.com/play-mp3/641');
 const taskDoneAudio = new Audio();
 taskDoneAudio.src="/assets/sounds/mixkit-select-click-1109 AETrim1668595932780.wav";
 const removeTaskAudio = new Audio();
 removeTaskAudio.src="/assets/sounds/removeSound.mp3";

class App {

  constructor() {
    toggleThemeBtn.addEventListener('click' ,this._toggleTheme);
    this._display();
    addBtnTop.addEventListener('click', this._formFunction);
    form.addEventListener('submit', this._bind(formFunction(e)))
  }

  _toggleTheme() {
    Body1.classList.toggle('theme2');
    logo.classList.toggle('logo-toggle');
    switchThemeAudio.volume = .5;
    switchThemeAudio.play();
  }

  _display() {
    if(info[0].classList.contains('active')) {
      allStatus();
      infoHide();
      }
  
    if(info[1].classList.contains('active')) {
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

  _formFunction() {
    const taskText = inputTask.value;
  if(taskText.trim()) {
  // addTodo();
  this._display();
  // totalTaskLeft();
  infoContainer.classList.remove('hideInfoContainer');
  infoContainer.classList.add('displayInfoContainer');
  infoMob.classList.remove('Todo-info-mob-toggle');
  }
  }



}

const obj = new App();