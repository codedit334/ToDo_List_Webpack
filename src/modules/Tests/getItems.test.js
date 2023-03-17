import UI from "../UI.js";

const simulateUI = () => {
  const input = document.createElement("input");
  input.type = "text";
  input.className = "data_input";
  input.setAttribute("value", "Jest Test");
  document.querySelector("body").appendChild(input);

  const ul = document.createElement("ul");
  ul.className = "todo_list";
  document.querySelector("body").appendChild(ul);

  const button = document.createElement('button');
  button.className = 'clear_completed';
  document.querySelector('body').appendChild(button);

  const refresh = document.createElement('button');
  refresh.setAttribute("id", "refreshImg");
  document.querySelector('body').appendChild(refresh);
};

beforeEach(() => simulateUI());

describe("Add function", () => {
  it("Store item in local storage", () => {
    expect(UI.storeItem()).toBeDefined();
  });

  it("Get items from local storage", () => {
    const todoItems = UI.getItems();
    expect(todoItems).not.toBeNull();
  });
});
