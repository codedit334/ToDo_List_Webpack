import displayImages from './images.js';

import Todo from './todo.js';
import sortArray from './sort-array/dist/index.mjs';

const dataInput = document.querySelector('.data_input');
const todoList = document.querySelector('.todo_list');

let todoItems = [];

export default class UI {
  static getItems() {
    todoItems = JSON.parse(localStorage.getItem('todoItems'));
    return todoItems || [];
  }

  static filterByID(ID) {
    todoItems = this.getItems();

    const filterTodoItems = todoItems.filter((element) => +element.index !== +ID);
    filterTodoItems.forEach((element) => {
      if (element.index > ID) element.index -= 1;
    });
    localStorage.setItem('todoItems', JSON.stringify(filterTodoItems));
    this.displayItems();
  }

  static isChecked(check) {
    if (check === true) return 'checked';
    return 'notChecked';
  }

  static check() {
    todoItems = this.getItems();

    todoItems.forEach((elem) => {
      if (elem.completed === true) {
        document.querySelector(
          `[data-id="${elem.index}"] > .todo_check`,
        ).checked = true;
      }
    });
  }

  static displayItems() {
    todoItems = this.getItems();
    const sortedArray = sortArray(todoItems, {
      by: 'index',
    });
    todoItems = sortedArray;

    // Reorder
    let count = 1;
    for (let i = 0; i < todoItems.length; i += 1) {
      todoItems[i].index = count;
      count += 1;
    }
    localStorage.setItem('todoItems', JSON.stringify(todoItems));

    // Render HTML
    if (todoItems) {
      todoList.innerHTML = '';
      todoItems.forEach((element) => {
        todoList.innerHTML += ` <li data-id="${element.index}" data-valid="${element.completed}"><input type="checkbox"  class="todo_check" />
                <input type="text" value="${element.description}"class="todo_input" />
                <img src="" class="trashImg" alt="trash" />
              </li>`;
      });
    }
    this.check();
    displayImages();
  }

  static storeItem() {
    if (dataInput.value.length > 0) {
      todoItems = this.getItems();

      const todoItem = new Todo(dataInput.value, false, todoItems.length + 1);

      todoItems.push(todoItem);
      localStorage.setItem('todoItems', JSON.stringify(todoItems));
    }
  }

  static deleteItem(e) {
    const dataId = e.target.parentElement.getAttribute('data-id');
    this.filterByID(dataId);
  }

  static changeItem(e, val) {
    const dataId = e.target.parentElement.getAttribute('data-id');

    todoItems = this.getItems();

    todoItems.forEach((elm) => {
      if (+elm.index === +dataId) elm.description = val;
    });
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    window.location.reload();
  }

  static clearCompleted() {
    todoItems = this.getItems();

    todoItems = todoItems.filter((elem) => elem.completed !== true);

    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    this.displayItems();
  }

  static preValidate(valid, event) {
    const dataId = event.target.parentElement.getAttribute('data-id');

    event.target.parentElement.setAttribute('data-valid', valid);
    const todoItems = this.getItems();
    todoItems.find((elem) => {
      let i;
      if (+elem.index === +dataId) {
        elem.completed = valid;
        i = 1;
      } else i = 0;
      return i;
    });

    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }

  static validate(event) {
    const isValid = event.target.parentElement.getAttribute('data-valid');

    todoItems = this.getItems();
    if (isValid === 'false') {
      this.preValidate(true, event);
    } else this.preValidate(false, event);
  }

  // end
}
