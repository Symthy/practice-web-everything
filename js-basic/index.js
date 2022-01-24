'use strict';

document.write("<p>JSによる差し込み</p>");

const open = document.getElementById('js_open');
const modal = document.getElementById('js_modal');

open.addEventListener('click', () => {
  modal.classList.remove('is_hidden');
  modal.classList.add('is_active');
});
// open.addEventListener('click', function () {
//   modal.classList.remove('is_hidden');
// });

// lamp
const redLamp = document.getElementById('js_red_lamp');
const yellowLamp = document.getElementById('js_yellow_lamp');
const blueLamp = document.getElementById('js_blue_lamp');
const clearLamps = () => {
  redLamp.classList.remove('is_red')
  yellowLamp.classList.remove('is_yellow')
  blueLamp.classList.remove('is_blue')
};
redLamp.addEventListener('on_light_red', () => {
  clearLamps();
  redLamp.classList.add('is_red');
});
yellowLamp.addEventListener('on_light_yellow', () => {
  clearLamps();
  yellowLamp.classList.add('is_yellow');
});
blueLamp.addEventListener('on_light_blue', () => {
  clearLamps();
  blueLamp.classList.add('is_blue');
});

// modal
const redButton = document.getElementById('js_red_btn');
const yellowButton = document.getElementById('js_yellow_btn');
const blueButton = document.getElementById('js_blue_btn');
const cancelButton = document.getElementById('js_cancel_btn');
const closeModalHandler = () => {
  modal.classList.remove('is_active');
  modal.classList.add('is_hidden');
}
redButton.addEventListener('click', () => {
  redLamp.dispatchEvent(new CustomEvent('on_light_red'));
  closeModalHandler();
});
yellowButton.addEventListener('click', () => {
  yellowLamp.dispatchEvent(new CustomEvent('on_light_yellow'));
  closeModalHandler();
});
blueButton.addEventListener('click', () => {
  blueLamp.dispatchEvent(new CustomEvent('on_light_blue'));
  closeModalHandler();
});
cancelButton.addEventListener('click', closeModalHandler);
