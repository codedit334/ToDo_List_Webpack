// import displayImages from './images.js';
import Todo from './todo.js';

const sortArray = require("sort-array/dist");

let todoItems = [];

export default class UI {
  static getItems() {
    todoItems = JSON.parse(localStorage.getItem('todoItems'));
    return todoItems || [];
  }

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
          `[data-id="${elem.index}"] > .todo_check`
        ).checked = true;
      }
    });
  }

  static renderHTML(obj) {
    const todoList = document.querySelector('.todo_list');

    if (obj) {
      todoList.innerHTML = '';
      obj.forEach((element) => {
        todoList.innerHTML += ` <li data-id="${element.index}" data-valid="${element.completed}"><input type="checkbox"  class="todo_check" />
                <input type="text" value="${element.description}"class="todo_input" />
                <img class="trashImg" src="./trash.svg"/>
              </li>`;
      });
    }
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
    this.renderHTML(todoItems);
    this.check();
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
