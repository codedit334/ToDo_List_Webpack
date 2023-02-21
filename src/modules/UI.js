import sortArray from '../../node_modules/sort-array/dist/index.mjs';

const todoList = document.querySelector('.todo_list');

let todoItems = [
  {
    description: 'ToDo 1',
    completed: false,
    index: 1,
  },
  {
    description: 'ToDo 2',
    completed: false,
    index: 3,
  },
  {
    description: 'ToDo 3',
    completed: false,
    index: 2,
  },
];
export default class UI {
  static displayItems() {
    const sortedArray = sortArray(todoItems, {
      by: 'openIssues',
    });
    todoItems = sortedArray;
    if (todoItems != null) {
      todoList.innerHTML = '';
      todoItems.forEach((element) => {
        todoList.innerHTML += ` <li data-id="${element.index}" data-valid="${element.completed}"><input type="checkbox"  class="todo_check" />
                <input type="text" value="${element.description}"class="todo_input" />
                <img src="" class="trashImg" alt="trash" />
              </li>`;
      });
    }
  }
}
