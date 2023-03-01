import UI from "./UI.js";

let todoItems;
const simulateInput = () => {
  var input = document.createElement("input");
  input.type = "text";
  input.className = "data_input";
  input.setAttribute("value", "Jest Test");
  document.querySelector("body").appendChild(input);
};

beforeEach(() => simulateInput());

describe("Add function", () => {
  it("Store item in local storage", () => {
    expect(UI.storeItem()).toBeDefined();
  });

  it("Get items from local storage", () => {
    expect((todoItems = UI.getItems())).not.toBeNull();
  });
});
