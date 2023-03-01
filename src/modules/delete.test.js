import UI from './UI.js';

const similateUl = () => {
  const ul = document.createElement('ul');
  ul.className = 'todo_list';
  document.querySelector('body').appendChild(ul);

  const img = document.createElement("img");
  img.setAttribute("id", "enter");
  document.querySelector("body").appendChild(img);

  const img2 = document.createElement("img");
  img2.setAttribute("id", "refreshImg");
  document.querySelector("body").appendChild(img2);
}

beforeAll(() => {
  window.localStorage.clear();
  similateUl();
});

const task = UI.getItems();
task.push({ completed: false, description: 'a dummy task to test', index: 0 });
localStorage.setItem('todoItems', JSON.stringify(task));

describe('delete item', () => {
  it('delete item', () => {
    expect(UI.filterByID(0)).toEqual([]);
  });
});