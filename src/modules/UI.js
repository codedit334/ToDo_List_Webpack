/* istanbul ignore file */
import displayImages from './images.js';
import Todo from './todo.js';
// import {sortArray} from './sort-array/dist/index.mjs';
const sortArray = require('sort-array');

// const dataInput = document.querySelector(".data_input");
const todoList = document.querySelector('.todo_list');

let todoItems = [];

export default class UI {
  // This
  static getItems() {
    todoItems = JSON.parse(localStorage.getItem('todoItems'));
    return todoItems || [];
  }

  // This
  static filterByID(ID) {
    todoItems = this.getItems();

    const filterTodoItems = todoItems.filter(
      (element) => +element.index !== +ID,
    );

    localStorage.setItem('todoItems', JSON.stringify(filterTodoItems));
    this.displayItems();
    return todoItems;
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
    const todoList = document.querySelector('.todo_list');
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
    // displayImages();
  }

  // This
  static storeItem() {
    const dataInput = document.querySelector('.data_input');

    if (dataInput.value.length > 0) {
      todoItems = this.getItems();

      const todoItem = new Todo(dataInput.value, false, todoItems.length + 1);

      todoItems.push(todoItem);
      localStorage.setItem('todoItems', JSON.stringify(todoItems));
      return todoItems;
    }
    return false;
  }

  // This
  static deleteItem = (e) => {
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
    this.displayItems();
  }

  static clearCompleted() {
    todoItems = this.getItems();

    todoItems = todoItems.filter((elem) => elem.completed !== true);

    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    this.displayItems();
  }

  static validateByID(valid, event) {
    const dataId = event.target.parentElement.getAttribute('data-id');

    event.target.parentElement.setAttribute('data-valid', valid);
    const todoItems = this.getItems();
    todoItems.find((elem) => {
      if (+elem.index === +dataId) (elem.completed = valid);
      return 1;
    });

    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }

  static validate(event) {
    const isValid = event.target.parentElement.getAttribute('data-valid');

    if (isValid === 'false') {
      this.validateByID(true, event);
    } else this.validateByID(false, event);
  }

  // end
}
