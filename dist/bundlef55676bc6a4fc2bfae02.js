/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ "./src/modules/todo.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint no-use-before-define: ["error", { "classes": false }] */

// import displayImages from './images.js';


// UI interaction
var formInput = document.querySelector('.data_input');

// Delete item
var deleteEvent = function deleteEvent() {
  document.body.querySelectorAll('.trashImg').forEach(function (element) {
    element.addEventListener('click', function (event) {
      UI.deleteItem(event);
    });
  });
};

// Change item
var changeEvent = function changeEvent() {
  document.querySelectorAll('.todo_input').forEach(function (element) {
    element.addEventListener('change', function (elm) {
      var newValue = elm.target.value;
      UI.changeItem(elm, newValue);
    });
  });
};

// Add item
window.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    UI.storeItem();
    formInput.value = '';
  }
});

// Clear completed
var clearCompletedEvent = function clearCompletedEvent() {
  document.querySelector('.clear_completed').addEventListener('click', function (event) {
    event.preventDefault();
    UI.clearCompleted();
  });
};

// Make completed
var validateEvent = function validateEvent() {
  document.querySelectorAll('.todo_check').forEach(function (elem) {
    elem.addEventListener('change', function (event) {
      UI.validate(event);
    });
  });
};

// Clear All
var clearAllEvent = function clearAllEvent() {
  document.querySelector('#refreshImg').addEventListener('click', function () {
    localStorage.clear();
    UI.displayItems();
  });
};
function coreFlow() {
  changeEvent();
  deleteEvent();
  clearCompletedEvent();
  validateEvent();
  clearAllEvent();
}
var sortArray = __webpack_require__(/*! sort-array/dist */ "./node_modules/sort-array/dist/index.js");
var todoItems = [];
var UI = /*#__PURE__*/function () {
  function UI() {
    _classCallCheck(this, UI);
  }
  _createClass(UI, null, [{
    key: "getItems",
    value: function getItems() {
      todoItems = JSON.parse(localStorage.getItem('todoItems'));
      return todoItems || [];
    }
  }, {
    key: "filterByID",
    value: function filterByID(ID) {
      todoItems = this.getItems();
      var filterTodoItems = todoItems.filter(function (element) {
        return +element.index !== +ID;
      });
      localStorage.setItem('todoItems', JSON.stringify(filterTodoItems));
      this.displayItems();
      return todoItems;
    }
  }, {
    key: "check",
    value: function check() {
      todoItems = this.getItems();
      todoItems.forEach(function (elem) {
        if (Boolean(elem.completed) === true) {
          document.querySelector("[data-id=\"".concat(elem.index, "\"] > .todo_check")).checked = true;
        }
      });
    }
  }, {
    key: "renderHTML",
    value: function renderHTML(obj) {
      var todoList = document.querySelector('.todo_list');
      if (obj) {
        todoList.innerHTML = '';
        obj.forEach(function (element) {
          todoList.innerHTML += " <li data-id=\"".concat(element.index, "\" data-valid=\"").concat(element.completed, "\"><input type=\"checkbox\"  class=\"todo_check\" />\n                <input type=\"text\" value=\"").concat(element.description, "\"class=\"todo_input\" />\n                <i class=\"fa-regular fa-trash-can fa-xl trashImg\"></i>\n              </li>");
        });
      }
    }
  }, {
    key: "displayItems",
    value: function displayItems() {
      todoItems = this.getItems();
      var sortedArray = sortArray(todoItems, {
        by: 'index'
      });
      todoItems = sortedArray;

      // Reorder
      var count = 1;
      for (var i = 0; i < todoItems.length; i += 1) {
        todoItems[i].index = count;
        count += 1;
      }
      localStorage.setItem('todoItems', JSON.stringify(todoItems));

      // Render HTML
      this.renderHTML(todoItems);
      this.check();
      coreFlow();
    }
  }, {
    key: "storeItem",
    value: function storeItem() {
      var dataInput = document.querySelector('.data_input');
      if (dataInput.value.length > 0) {
        todoItems = this.getItems();
        var todoItem = new _todo_js__WEBPACK_IMPORTED_MODULE_0__["default"](dataInput.value, false, todoItems.length + 1);
        todoItems.push(todoItem);
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
        UI.displayItems();
        return todoItems;
      }
      return false;
    }
  }, {
    key: "changeItem",
    value: function changeItem(e, val) {
      var dataId = e.target.parentElement.getAttribute('data-id');
      todoItems = this.getItems();
      todoItems.forEach(function (elm) {
        if (+elm.index === +dataId) elm.description = val;
      });
      localStorage.setItem('todoItems', JSON.stringify(todoItems));
      this.displayItems();
    }
  }, {
    key: "clearCompleted",
    value: function clearCompleted() {
      todoItems = this.getItems();
      todoItems = todoItems.filter(function (elem) {
        return elem.completed !== true;
      });
      localStorage.setItem('todoItems', JSON.stringify(todoItems));
      this.displayItems();
    }
  }, {
    key: "validateByID",
    value: function validateByID(valid, event) {
      var dataId = event.target.parentElement.getAttribute('data-id');
      event.target.parentElement.setAttribute('data-valid', valid);
      var todoItems = this.getItems();
      todoItems.forEach(function (elem) {
        if (+elem.index === +dataId) elem.completed = valid;
      });
      localStorage.setItem('todoItems', JSON.stringify(todoItems));
    }
  }, {
    key: "validate",
    value: function validate(event) {
      var isValid = event.target.parentElement.getAttribute('data-valid');
      if (isValid === 'false') {
        this.validateByID(true, event);
      } else this.validateByID(false, event);
    }

    // end
  }]);
  return UI;
}();
_defineProperty(UI, "deleteItem", function (e) {
  var dataId = e.target.parentElement.getAttribute('data-id');
  UI.filterByID(dataId);
});


/***/ }),

/***/ "./src/modules/todo.js":
/*!*****************************!*\
  !*** ./src/modules/todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Todo = /*#__PURE__*/_createClass(function Todo(description, completed, index) {
  _classCallCheck(this, Todo);
  this.description = description;
  this.completed = completed;
  this.index = index;
});


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/index.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.cdnfonts.com/css/cocogoose);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'COCOGOOSE', sans-serif;\r\n  font-weight: 400;\r\n}\r\n\r\nmain {\r\n  width: 100vw;\r\n  height: 100vh;\r\n  display: grid;\r\n  place-items: center;\r\n}\r\n\r\nform {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 350px;\r\n  height: auto;\r\n  border: 0.5px solid #ccc;\r\n}\r\n\r\n.title_wrapper {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  border-bottom: 0.5px solid #ccc;\r\n  height: 45px;\r\n}\r\n\r\n.title_wrapper img {\r\n  width: 32px;\r\n  padding-right: 10px;\r\n  cursor: pointer;\r\n}\r\n\r\nform h1 {\r\n  font-size: 135%;\r\n  padding: 0 10px;\r\n}\r\n\r\n.data_input_wrapper {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  border-bottom: 0.5px solid #ccc;\r\n}\r\n\r\n#enter {\r\n  height: 25px;\r\n  width: 25px;\r\n  align-self: center;\r\n  position: relative;\r\n  top: 12px;\r\n  right: 12px;\r\n}\r\n\r\n.data_input {\r\n  border: none;\r\n  font-style: italic;\r\n  padding: 0 10px;\r\n  border-bottom: 0.5px solid #ccc;\r\n}\r\n\r\n.data_input:focus {\r\n  outline: none;\r\n}\r\n\r\nform > * {\r\n  width: 100%;\r\n  height: 45px;\r\n}\r\n\r\n.todo_list {\r\n  height: 100%;\r\n}\r\n\r\n.todo_list li {\r\n  list-style: none;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  height: 45px;\r\n  border-bottom: 0.5px solid #ccc;\r\n}\r\n\r\n.todo_list .todo_check {\r\n  margin: auto;\r\n}\r\n\r\n.todo_list li .todo_input {\r\n  height: 100%;\r\n  width: 75%;\r\n  border: none;\r\n}\r\n\r\n.todo_list li .trashImg {\r\n  width: 28px;\r\n  height: 28px;\r\n  margin: auto;\r\n  cursor: pointer;\r\n  position: relative;\r\n  z-index: 30000;\r\n  top: 10px;\r\n}\r\n\r\n.clear_completed {\r\n  position: relative;\r\n  z-index: 2000;\r\n  width: 100%;\r\n  height: 45px;\r\n  background-color: #f8f8f8;\r\n  color: #c4c3c3;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.clear_completed:hover {\r\n  text-decoration: underline;\r\n}\r\n\r\n#refreshImg {\r\n  position: relative;\r\n  z-index: 30000;\r\n  right: 12px;\r\n}\r\n\r\n/* Linter */\r\n.todo_check:checked + .todo_input {\r\n  text-decoration: line-through;\r\n}\r\n\r\n.todo_list li .todo_input:focus {\r\n  border: none;\r\n  outline: none;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles/index.css"],"names":[],"mappings":"AAEA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,oCAAoC;EACpC,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,wBAAwB;AAC1B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,+BAA+B;EAC/B,YAAY;AACd;;AAEA;EACE,WAAW;EACX,mBAAmB;EACnB,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,+BAA+B;AACjC;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,kBAAkB;EAClB,SAAS;EACT,WAAW;AACb;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,+BAA+B;AACjC;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,8BAA8B;EAC9B,YAAY;EACZ,+BAA+B;AACjC;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,UAAU;EACV,YAAY;AACd;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,kBAAkB;EAClB,cAAc;EACd,SAAS;AACX;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,cAAc;EACd,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,kBAAkB;EAClB,cAAc;EACd,WAAW;AACb;;AAEA,WAAW;AACX;EACE,6BAA6B;AAC/B;;AAEA;EACE,YAAY;EACZ,aAAa;AACf","sourcesContent":["@import url('https://fonts.cdnfonts.com/css/cocogoose');\r\n\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'COCOGOOSE', sans-serif;\r\n  font-weight: 400;\r\n}\r\n\r\nmain {\r\n  width: 100vw;\r\n  height: 100vh;\r\n  display: grid;\r\n  place-items: center;\r\n}\r\n\r\nform {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 350px;\r\n  height: auto;\r\n  border: 0.5px solid #ccc;\r\n}\r\n\r\n.title_wrapper {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  border-bottom: 0.5px solid #ccc;\r\n  height: 45px;\r\n}\r\n\r\n.title_wrapper img {\r\n  width: 32px;\r\n  padding-right: 10px;\r\n  cursor: pointer;\r\n}\r\n\r\nform h1 {\r\n  font-size: 135%;\r\n  padding: 0 10px;\r\n}\r\n\r\n.data_input_wrapper {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  border-bottom: 0.5px solid #ccc;\r\n}\r\n\r\n#enter {\r\n  height: 25px;\r\n  width: 25px;\r\n  align-self: center;\r\n  position: relative;\r\n  top: 12px;\r\n  right: 12px;\r\n}\r\n\r\n.data_input {\r\n  border: none;\r\n  font-style: italic;\r\n  padding: 0 10px;\r\n  border-bottom: 0.5px solid #ccc;\r\n}\r\n\r\n.data_input:focus {\r\n  outline: none;\r\n}\r\n\r\nform > * {\r\n  width: 100%;\r\n  height: 45px;\r\n}\r\n\r\n.todo_list {\r\n  height: 100%;\r\n}\r\n\r\n.todo_list li {\r\n  list-style: none;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  height: 45px;\r\n  border-bottom: 0.5px solid #ccc;\r\n}\r\n\r\n.todo_list .todo_check {\r\n  margin: auto;\r\n}\r\n\r\n.todo_list li .todo_input {\r\n  height: 100%;\r\n  width: 75%;\r\n  border: none;\r\n}\r\n\r\n.todo_list li .trashImg {\r\n  width: 28px;\r\n  height: 28px;\r\n  margin: auto;\r\n  cursor: pointer;\r\n  position: relative;\r\n  z-index: 30000;\r\n  top: 10px;\r\n}\r\n\r\n.clear_completed {\r\n  position: relative;\r\n  z-index: 2000;\r\n  width: 100%;\r\n  height: 45px;\r\n  background-color: #f8f8f8;\r\n  color: #c4c3c3;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.clear_completed:hover {\r\n  text-decoration: underline;\r\n}\r\n\r\n#refreshImg {\r\n  position: relative;\r\n  z-index: 30000;\r\n  right: 12px;\r\n}\r\n\r\n/* Linter */\r\n.todo_check:checked + .todo_input {\r\n  text-decoration: line-through;\r\n}\r\n\r\n.todo_list li .todo_input:focus {\r\n  border: none;\r\n  outline: none;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/sort-array/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/sort-array/dist/index.js ***!
  \***********************************************/
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, (function () { 'use strict';

  /**
   * Takes any input and guarantees an array back.
   *
   * - Converts array-like objects (e.g. `arguments`, `Set`) to a real array.
   * - Converts `undefined` to an empty array.
   * - Converts any another other, singular value (including `null`, objects and iterables other than `Set`) into an array containing that value.
   * - Ignores input which is already an array.
   *
   * @module array-back
   * @example
   * > const arrayify = require('array-back')
   *
   * > arrayify(undefined)
   * []
   *
   * > arrayify(null)
   * [ null ]
   *
   * > arrayify(0)
   * [ 0 ]
   *
   * > arrayify([ 1, 2 ])
   * [ 1, 2 ]
   *
   * > arrayify(new Set([ 1, 2 ]))
   * [ 1, 2 ]
   *
   * > function f(){ return arrayify(arguments); }
   * > f(1,2,3)
   * [ 1, 2, 3 ]
   */

  function isObject$1 (input) {
    return typeof input === 'object' && input !== null
  }

  function isArrayLike$1 (input) {
    return isObject$1(input) && typeof input.length === 'number'
  }

  /**
   * @param {*} - The input value to convert to an array
   * @returns {Array}
   * @alias module:array-back
   */
  function arrayify (input) {
    if (Array.isArray(input)) {
      return input
    } else if (input === undefined) {
      return []
    } else if (isArrayLike$1(input) || input instanceof Set) {
      return Array.from(input)
    } else {
      return [input]
    }
  }

  /**
   * Isomorphic, functional type-checking for Javascript.
   * @module typical
   * @typicalname t
   * @example
   * const t = require('typical')
   * const allDefined = array.every(t.isDefined)
   */

  /**
   * Returns true if input is a number. It is a more reasonable alternative to `typeof n` which returns `number` for `NaN` and `Infinity`.
   *
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   * @example
   * > t.isNumber(0)
   * true
   * > t.isNumber(1)
   * true
   * > t.isNumber(1.1)
   * true
   * > t.isNumber(0xff)
   * true
   * > t.isNumber(0644)
   * true
   * > t.isNumber(6.2e5)
   * true
   * > t.isNumber(NaN)
   * false
   * > t.isNumber(Infinity)
   * false
   */
  function isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  /**
   * A plain object is a simple object literal, it is not an instance of a class. Returns true if the input `typeof` is `object` and directly decends from `Object`.
   *
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   * @example
   * > t.isPlainObject({ something: 'one' })
   * true
   * > t.isPlainObject(new Date())
   * false
   * > t.isPlainObject([ 0, 1 ])
   * false
   * > t.isPlainObject(/test/)
   * false
   * > t.isPlainObject(1)
   * false
   * > t.isPlainObject('one')
   * false
   * > t.isPlainObject(null)
   * false
   * > t.isPlainObject((function * () {})())
   * false
   * > t.isPlainObject(function * () {})
   * false
   */
  function isPlainObject (input) {
    return input !== null && typeof input === 'object' && input.constructor === Object
  }

  /**
   * An array-like value has all the properties of an array yet is not an array instance. An example is the `arguments` object. Returns `true`` if the input value is an object, not `null`` and has a `length` property set with a numeric value.
   *
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   * @example
   * function sum(x, y){
   *   console.log(t.isArrayLike(arguments))
   *   // prints `true`
   * }
   */
  function isArrayLike (input) {
    return isObject(input) && typeof input.length === 'number'
  }

  /**
   * Returns true if the typeof input is `'object'` but not null.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isObject (input) {
    return typeof input === 'object' && input !== null
  }

  /**
   * Returns true if the input value is defined.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isDefined (input) {
    return typeof input !== 'undefined'
  }

  /**
   * Returns true if the input value is undefined.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isUndefined (input) {
    return !isDefined(input)
  }

  /**
   * Returns true if the input value is null.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isNull (input) {
   return input === null
  }

  /**
   * Returns true if the input value is not one of `undefined`, `null`, or `NaN`.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isDefinedValue (input) {
   return isDefined(input) && !isNull(input) && !Number.isNaN(input)
  }

  /**
   * Returns true if the input value is an ES2015 `class`.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isClass (input) {
    if (typeof input === 'function') {
      return /^class /.test(Function.prototype.toString.call(input))
    } else {
      return false
    }
  }

  /**
   * Returns true if the input is a string, number, symbol, boolean, null or undefined value.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isPrimitive (input) {
    if (input === null) return true
    switch (typeof input) {
      case 'string':
      case 'number':
      case 'symbol':
      case 'undefined':
      case 'boolean':
        return true
      default:
        return false
    }
  }

  /**
   * Returns true if the input is a Promise.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isPromise (input) {
    if (input) {
      const isPromise = isDefined(Promise) && input instanceof Promise;
      const isThenable = input.then && typeof input.then === 'function';
      return !!(isPromise || isThenable)
    } else {
      return false
    }
  }

  /**
   * Returns true if the input is an iterable (`Map`, `Set`, `Array`, Generator etc.).
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   * @example
   * > t.isIterable('string')
   * true
   * > t.isIterable(new Map())
   * true
   * > t.isIterable([])
   * true
   * > t.isIterable((function * () {})())
   * true
   * > t.isIterable(Promise.resolve())
   * false
   * > t.isIterable(Promise)
   * false
   * > t.isIterable(true)
   * false
   * > t.isIterable({})
   * false
   * > t.isIterable(0)
   * false
   * > t.isIterable(1.1)
   * false
   * > t.isIterable(NaN)
   * false
   * > t.isIterable(Infinity)
   * false
   * > t.isIterable(function () {})
   * false
   * > t.isIterable(Date)
   * false
   * > t.isIterable()
   * false
   * > t.isIterable({ then: function () {} })
   * false
   */
  function isIterable (input) {
    if (input === null || !isDefined(input)) {
      return false
    } else {
      return (
        typeof input[Symbol.iterator] === 'function' ||
        typeof input[Symbol.asyncIterator] === 'function'
      )
    }
  }

  /**
   * Returns true if the input value is a string. The equivalent of `typeof input === 'string'` for use in funcitonal contexts.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isString (input) {
    return typeof input === 'string'
  }

  /**
   * Returns true if the input value is a function. The equivalent of `typeof input === 'function'` for use in funcitonal contexts.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isFunction (input) {
    return typeof input === 'function'
  }

  var t = {
    isNumber,
    isPlainObject,
    isArrayLike,
    isObject,
    isDefined,
    isUndefined,
    isNull,
    isDefinedValue,
    isClass,
    isPrimitive,
    isPromise,
    isIterable,
    isString,
    isFunction
  };

  /**
   * Isomorphic, load-anywhere function to sort an array by scalar, deep or computed values in any standard or custom order.
   *
   * @module sort-array
   * @typicalname sortArray
   * @example
   * const sortArray = require('sort-array')
   */

  /**
   * @param {Array} array - The input array to sort. It is sorted in place.
   * @param {object} [options] - Sort options.
   * @param {string[]} [options.by] - One or more property names or computed fields to sort by. Specifying property names is only relevant when sorting an array of objects.
   * @param {string[]} [options.order] - One or more sort orders. Specify `'asc'`, `'desc'` or a property name from the `options.customOrders` object.
   * @param {object} [options.customOrders] - A dictionary object containing one or more custom orders. Each custom order value must be an array defining the order expected values must be sorted in.
   * @param {object} [options.computed] - A dictionary object containing one or more computed field functions. The function will be invoked once per item in the array. Each invocation will receive the array item as input and must return a primitive value by which the array can be sorted.
   * @param {number} [options.nullRank] - Configures whether `null` values will be sorted before or after defined values. Set to `-1` for before, `1` for after. Defaults to `1`.
   * @param {number} [options.undefinedRank] - Configures whether `undefined` values will be sorted before or after defined values. Set to `-1` for before, `1` for after. Defaults to `1`.
   * @returns {Array} Returns the array that was passed in.
   * @alias module:sort-array
   */
  function sortArray (arr, options = {}) {
    options = Object.assign(
      {
        computed: {},
        customOrders: {},
        nullRank: 1,
        undefinedRank: 1
      },
      options
    );
    arr.sort(getCompareFunc(options));
    return arr
  }

  function getCompareFunc (options = {}) {
    const by = arrayify(options.by);
    const order = arrayify(options.order);
    const { customOrders, computed } = options;
    return function compareFunc (xIn, yIn, byIndex = 0) {
      const currOrder = order[byIndex] || 'asc';
      if (!(currOrder === 'asc' || currOrder === 'desc' || customOrders[currOrder])) {
        return 0
      }

      let result, x, y;
      if (by.length) {
        x = t.isDefined(xIn[by[byIndex]])
          ? xIn[by[byIndex]]
          : computed[by[byIndex]] && computed[by[byIndex]](xIn);
        y = t.isDefined(yIn[by[byIndex]])
          ? yIn[by[byIndex]]
          : computed[by[byIndex]] && computed[by[byIndex]](yIn);
      } else {
        x = xIn;
        y = yIn;
      }

      if (customOrders && customOrders[currOrder]) {
        result = customOrders[currOrder].indexOf(x) - customOrders[currOrder].indexOf(y);
      } else if (x === y) {
        result = 0;
      } else if (t.isNull(x) && t.isUndefined(y)) {
        result = currOrder === 'asc'
          ? 1
          : currOrder === 'desc'
            ? -1
            : 0;
      } else if (t.isUndefined(x) && t.isNull(y)) {
        result = currOrder === 'asc'
          ? -1
          : currOrder === 'desc'
            ? 1
            : 0;
      } else if (t.isNull(x) && t.isDefinedValue(y)) {
        result = options.nullRank;
      } else if (t.isUndefined(x) && t.isDefinedValue(y)) {
        result = options.undefinedRank;
      } else if (t.isNull(y) && t.isDefinedValue(x)) {
        result = -options.nullRank;
      } else if (t.isUndefined(y) && t.isDefinedValue(x)) {
        result = -options.undefinedRank;
      } else {
        result = x < y ? -1 : x > y ? 1 : 0;
        if (currOrder === 'desc') {
          result = result * -1;
        }
      }
      if (result === 0 && t.isDefined(by[byIndex + 1])) {
        result = compareFunc(xIn, yIn, byIndex + 1);
      }
      return result
    }
  }

  return sortArray;

})));


/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");
/* harmony import */ var _modules_UI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/UI.js */ "./src/modules/UI.js");


_modules_UI_js__WEBPACK_IMPORTED_MODULE_1__["default"].displayItems();
})();

/******/ })()
;
//# sourceMappingURL=bundlef55676bc6a4fc2bfae02.js.map