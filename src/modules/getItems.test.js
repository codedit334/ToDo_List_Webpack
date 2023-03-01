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
