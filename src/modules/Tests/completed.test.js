import UI from '../UI.js';

const simulateLi = () => {
  const li = document.createElement('li');
  li.className = 'test_todo_check';
  li.setAttribute('data-valid', 'false');
  li.setAttribute('data-id', '1');
  document.querySelector('body').appendChild(li);

  const input = document.createElement('input');
  input.className = 'todo_check';
  input.type = 'checkbox';
  document.querySelector('.test_todo_check').appendChild(input);
};

beforeEach(() => {
  window.localStorage.clear();
  simulateLi();
});

it('Test check', () => {
  let todoItem = {};
  let todoItems = [];
  todoItem = { description: 'item 1', completed: false, index: 1 };
  todoItems.push(todoItem);
  localStorage.setItem('todoItems', JSON.stringify(todoItems));

  const element = document.querySelector('.todo_check');
  element.addEventListener('change', (event) => {
    UI.validate(event);
  });
  element.dispatchEvent(new Event('change', { bubbles: true }));

  todoItems = UI.getItems();
  expect(todoItems[0].completed).toBeTruthy();
});
