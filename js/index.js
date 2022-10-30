'use strict'

const toggleThemeBtn = document.querySelector('.logo');
const Body = document.querySelector('body');

toggleThemeBtn.addEventListener('click' ,function() {
  Body.classList.toggle('theme2');
});

