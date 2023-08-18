/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/first.js":
/*!*********************!*\
  !*** ./js/first.js ***!
  \*********************/
/***/ (() => {

eval("let activePage = 0;\r\n\r\nconst preBtn = document.querySelector('.pre');\r\nconst nxtBtn = document.querySelector('.next');\r\n\r\nconst contents = document.querySelectorAll(\".content\");\r\n\r\n\r\nnxtBtn.addEventListener(\"click\", ()=>{\r\n    if(activePage > 4){\r\n        activePage = 4;\r\n    }\r\n    else{\r\n        activePage++;\r\n    }\r\n\r\n    btnsAct();\r\n    allUnactive();\r\n    contents[activePage].classList.toggle(\"unactive\", false);\r\n});\r\n\r\npreBtn.addEventListener(\"click\", ()=>{\r\n    if(activePage < 0){\r\n        activePage = 0;\r\n    }\r\n    else{\r\n        activePage--;\r\n    }\r\n\r\n    btnsAct();\r\n    allUnactive();\r\n    contents[activePage].classList.toggle(\"unactive\", false);\r\n});\r\n\r\nconst start = document.querySelector(\".content_4_start\");\r\nstart.addEventListener(\"click\", ()=>{\r\n\r\n    activePage++;\r\n    btnsAct();\r\n    allUnactive();\r\n    contents[activePage].classList.toggle(\"unactive\", false);\r\n});\r\n\r\nfunction allUnactive(){\r\n    contents.forEach(element => {\r\n        element.classList.toggle(\"unactive\", true);\r\n    });\r\n}\r\n\r\nfunction btnsAct(){\r\n    const btns = document.querySelector(\".btns\");\r\n\r\n    if(activePage >=3){\r\n        btns.classList.toggle(\"unactive\", true);\r\n    }\r\n    else{\r\n        btns.classList.toggle(\"unactive\", false);\r\n    }\r\n}\n\n//# sourceURL=webpack://wheel_we_go/./js/first.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/first.js"]();
/******/ 	
/******/ })()
;