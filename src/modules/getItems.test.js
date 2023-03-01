import UI from './UI.js';

const simulateInput = () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'data_input';
  input.setAttribute('value', 'Jest Test');
  document.querySelector('body').appendChild(input);
};

beforeEach(() => simulateInput());

describe('Add function', () => {
  it('Store item in local storage', () => {
    expect(UI.storeItem()).toBeDefined();
  });

  it('Get items from local storage', () => {
    const todoItems = UI.getItems();
    expect(todoItems).not.toBeNull();
  });
});

describe('change item', () => {
  let dummyDataBase;
  let strike;
  beforeEach(() => {
    dummyDataBase = [
      { check: false, task: 'dummy task 1', id: 1 },
      { check: false, task: 'dummy task 2', id: 2 },
      { check: false, task: 'dummy task 3', id: 3 },
    ];
    strike = [
      {innerText: 'Task 1 has changed'},
      {innerText: 'Task 2 has changed'},
      {innerText: 'Task 3 has changed'}
    ];
    document.querySelectorAll = jest.fn(() => 'variable having changeItem applied');
  });

  it('edits the first task', () => {
    UI.changeItem(dummyDataBase, 0);
    expect(dummyDataBase).toEqual([
      { check: false, task: 'Task 1 has changed', id: 1 },
      { check: false, task: 'dummy task 2', id: 2 },
      { check: false, task: 'dummy task 3', id: 3 },
    ]);
  });
});