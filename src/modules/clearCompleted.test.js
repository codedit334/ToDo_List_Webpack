import UI from './UI.js';

const simulateUl = () => {
  const ul = document.createElement('ul');
  ul.className = 'todo_list';
  document.querySelector('body').appendChild(ul);
};

beforeAll(() => {
  window.localStorage.clear();
  simulateUl();
});

it('Clear Completed', () => {
  let todoItems = [
    {
      index: 1,
      description: 'we have to apply test',
      completed: true,
    },
    {
      index: 2,
      description: 'Content 2',
      completed: true,
    },
    {
      index: 3,
      description: 'Content 3',
      completed: false,
    },
  ];
  localStorage.setItem('todoItems', JSON.stringify(todoItems));

  UI.clearCompleted();

  todoItems = UI.getItems();

  expect(todoItems.length).toBe(1);
});
