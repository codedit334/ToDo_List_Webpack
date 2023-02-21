/* eslint-disable eqeqeq */

export default function preValidate(valid, e, arr) {
  const dataId = e.target.parentElement.getAttribute('data-id');

  e.target.parentElement.setAttribute('data-valid', valid);
  const todoItems = arr;
  todoItems.find((elem) => {
    let i;
    if (elem.index == dataId) {
      elem.completed = valid;
      i = 1;
    } else i = 0;
    return i;
  });

  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}