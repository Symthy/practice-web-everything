'use strict';

// initialize
const addLightsHtml = () => {
  // $('.ly_main').append(`  // jQuery
  document.querySelector('.ly_main').insertAdjacentHTML('beforeend', `
    <div class="bl_light_frame">
      <div class="js_red_lamp el_light"></div>
      <div class="js_yellow_lamp el_light"></div>
      <div class="js_blue_lamp el_light"></div>
    </div>
  `);
}
const addModalHtml = () => {
  document.querySelector('#js_modal').insertAdjacentHTML('beforeend', `
    <div class="ly_modal">
      <p>点灯ランプの選択</p>
      <div class="bl_actions">
        <button class="el_btn js_red_btn">Red</button>
        <button class="el_btn js_yellow_btn">Yellow</button>
        <button class="el_btn js_blue_btn">Blue</button>
        <button class="el_btn js_add_btn">Add</button>
        <button class="el_btn js_remove_btn">Remove</button>
        <button class="el_btn js_cancel_btn">Cancel</button>
      </div>
    </div>
  `);
}
(function () {
  addLightsHtml();
  $('.ly_main').append(`<button id="js_open" type="button" class="el_btn">Change Mode</button>`)
  addModalHtml();
}());

const open = document.getElementById('js_open');
const modal = document.getElementById('js_modal');

open.addEventListener('click', () => {  // アロー関数
  modal.classList.remove('is_hidden');
  modal.classList.add('is_active');
});
//
// open.addEventListener('click', function () {  // function
//   modal.classList.remove('is_hidden');
//   modal.classList.add('is_active');
// });
//
// $('#js_open').on('click', function () {  // jQuery
//   modal.classList.remove('is_hidden');
//   modal.classList.add('is_active');
// });

// lamp
const redLamp = document.querySelector('.js_red_lamp');
// const redLamp = $('.js_red_lamp').get(0);  // jQuery
const yellowLamp = document.querySelector('.js_yellow_lamp');
const blueLamp = document.querySelector('.js_blue_lamp');
const clearLamps = () => {
  redLamp.classList.remove('is_red')
  yellowLamp.classList.remove('is_yellow')
  blueLamp.classList.remove('is_blue')
};
redLamp.addEventListener('on_light_red', () => {
// $('.js_red_lamp').on('on_light_red', function () {  // jQuery
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
const redBtn = document.querySelector('.js_red_btn');
const yellowBtn = document.querySelector('.js_yellow_btn');
const blueBtn = document.querySelector('.js_blue_btn');
const cancelBtn = document.querySelector('.js_cancel_btn');
const closeModalHandler = () => {
  modal.classList.remove('is_active');
  modal.classList.add('is_hidden');
}
redBtn.addEventListener('click', () => {
  redLamp.dispatchEvent(new CustomEvent('on_light_red'));
  // $('.js_red_lamp').trigger('on_light_red');   // jQuery
  closeModalHandler();
});
yellowBtn.addEventListener('click', () => {
  yellowLamp.dispatchEvent(new CustomEvent('on_light_yellow'));
  closeModalHandler();
});
blueBtn.addEventListener('click', () => {
  blueLamp.dispatchEvent(new CustomEvent('on_light_blue'));
  closeModalHandler();
});
cancelBtn.addEventListener('click', closeModalHandler);

const getLast = array => array[array.length - 1];
const eventHandlerForAddedLamp = (lampElem, className) => {
  lampElem.classList.add(className);
}
const addBtn = document.querySelector('.js_add_btn');
addBtn.addEventListener('click', () => {
  addLightsHtml();
  // const lastRedLamp = getLast(document.querySelectorAll('.js_red_lamp'));
  // redBtn.addEventListener('click', () => {
  //   lastRedLamp.dispatchEvent(new CustomEvent('on_light_red'));
  // });
  // lastRedLamp.addEventListener('on_light_red', () => eventHandlerForAddedLamp(lastRedLamp, 'is_red'));
  closeModalHandler();
});
const removeBtn = document.querySelector('.js_remove_btn');
removeBtn.addEventListener('click', () => {
  const elements = document.querySelectorAll('.bl_light_frame')
  elements[elements.length - 1].remove();
  closeModalHandler();
});
