/* eslint no-use-before-define: ["error", { "classes": false }] */

// import displayImages from './images.js';
import Todo from './todo.js';

// UI interaction
const formInput = document.querySelector('.data_input');

// Delete item
const deleteEvent = () => {
  document.body.querySelectorAll('.trashImg').forEach((element) => {
    element.addEventListener('click', (event) => {
      UI.deleteItem(event);
    });
  });
};

// Change item
const changeEvent = () => {
  document.querySelectorAll('.todo_input').forEach((element) => {
    element.addEventListener('change', (elm) => {
      const newValue = elm.target.value;
      UI.changeItem(elm, newValue);
    });
  });
};

// Add item
window.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    UI.storeItem();
    formInput.value = '';
  }
});

// Clear completed
const clearCompletedEvent = () => {
  document
    .querySelector('.clear_completed')
    .addEventListener('click', (event) => {
      event.preventDefault();
      UI.clearCompleted();
    });
};

// Make completed
const validateEvent = () => {
  document.querySelectorAll('.todo_check').forEach((elem) => {
    elem.addEventListener('change', (event) => {
      UI.validate(event);
    });
  });
};

// Clear All
const clearAllEvent = () => {
  document.querySelector('#refreshImg').addEventListener('click', () => {
    localStorage.clear();
    UI.displayItems();
  });
};

function coreFlow() {
  changeEvent();
  deleteEvent();
  clearCompletedEvent();
  validateEvent();
  clearAllEvent();
}

const sortArray = require('sort-array/dist');

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

  static check() {
    todoItems = this.getItems();

    todoItems.forEach((elem) => {
      if (Boolean(elem.completed) === true) {
        document.querySelector(
          `[data-id="${elem.index}"] > .todo_check`,
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
                <i class="fa-regular fa-trash-can fa-2xl trashImg"></i>
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
    coreFlow();
  }

  static storeItem() {
    const dataInput = document.querySelector('.data_input');

    if (dataInput.value.length > 0) {
      todoItems = this.getItems();

      const todoItem = new Todo(dataInput.value, false, todoItems.length + 1);
      todoItems.push(todoItem);
      localStorage.setItem('todoItems', JSON.stringify(todoItems));

      UI.displayItems();
      return todoItems;
    }
    return false;
  }

  static deleteItem = (e) => {
    const dataId = e.target.parentElement.getAttribute('data-id');
    this.filterByID(dataId);
  };

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

    todoItems.forEach((elem) => {
      if (+elem.index === +dataId) elem.completed = valid;
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
