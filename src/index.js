import UI from "./modules/UI.js";
import displayImages from "./modules/images.js";

import "./styles/index.css";

// Display items
UI.displayItems();
UI.check();
displayImages();

// UI interaction
const form = document.querySelector("form");

// Add item
form.addEventListener("submit", () => {
  UI.storeItem();
});

// Delete item
document.querySelectorAll(".trashImg").forEach((element) => {
  element.addEventListener("click", (event) => {
    UI.deleteItem(event);
  });
});

// Change item
document.querySelectorAll(".todo_input").forEach((element) => {
  element.addEventListener("change", (elm) => {
    const newValue = elm.target.value;
    UI.changeItem(elm, newValue);
  });
});

// Clear completed
document
  .querySelector(".clear_completed")
  .addEventListener("click", (event) => {
    event.preventDefault();
    UI.clearCompleted();
  });

// Make completed
document.querySelectorAll(".todo_check").forEach((elem) => {
  elem.addEventListener("change", (event) => {
    UI.validate(event);
  });
});

// Clear All
document.querySelector("#refreshImg").addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});
