import UI from './UI.js';

const similateUl = () => {
    const ul = document.createElement('ul');
    ul.className = 'todo_list';
    document.querySelector('body').appendChild(ul);
  };
  beforeEach(() => {
    window.localStorage.clear();
    similateUl();
  });
  let task = UI.getItems();
  task.push({completed: false, description: 'a dummy task to test', index: 0});
  localStorage.setItem('todoItems', JSON.stringify(task));
  
  describe('delete item', () => {
    it('delete item', () => {
      expect(UI.filterByID(0)).toEqual([]);
    })
  });