import UI from "./UI";

const simulateLi = () => {
  const ul = document.createElement("ul");
  ul.className = "todo_list";
  document.querySelector("body").appendChild(ul);

  const li = document.createElement("li");
  li.className = "test_todo_input";
  li.setAttribute("data-valid", "false");
  li.setAttribute("data-id", "1");
  document.querySelector("body").appendChild(li);

  const input = document.createElement("input");
  input.className = "todo_input";
  input.type = "text";
  document.querySelector(".test_todo_input").appendChild(input);
};

beforeAll(() => {
  window.localStorage.clear();
  simulateLi();
});

test("change item", () => {
  let todoItems = [];
  let todoItem = {
    index: 1,
    description: "we have to apply test",
    completed: false,
  };
  todoItems.push(todoItem);
  localStorage.setItem("todoItems", JSON.stringify(todoItems));

  const ele = document.querySelector(".todo_input");
  ele.addEventListener("click", (e) => {
    UI.changeItem(e, "this is changed item");
  });
  ele.dispatchEvent(new Event("click", { bubbles: true }));
  todoItems = JSON.parse(localStorage.getItem("todoItems"));
  expect(todoItems[0].description).toBe("this is changed item");
});
