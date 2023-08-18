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

/***/ "./js/shopping.js":
/*!************************!*\
  !*** ./js/shopping.js ***!
  \************************/
/***/ (() => {

eval("\r\nclass Shopping {\r\n    constructor() {\r\n        this.slider = document.querySelector('.slider');\r\n        this.totalSlides = this.slider.childElementCount;\r\n        this.slideIndex = 0;\r\n        this.direction = 1; // 움직이는 방향 (1: 정방향, -1: 역방향)\r\n        this.showSlide(this.slideIndex);\r\n        setInterval(this.nextSlide.bind(this), 3000); // 3초마다 다음 슬라이드로 전환\r\n    }\r\n\r\n    showSlide(index) {\r\n        this.slider.style.transform = `translateX(-${index * 100}%)`;\r\n    }\r\n\r\n    nextSlide() {\r\n        this.slideIndex = (this.slideIndex + this.direction) % this.totalSlides;\r\n        if (this.slideIndex === -1) {\r\n            this.slideIndex = this.totalSlides - 1;\r\n        }\r\n        this.showSlide(this.slideIndex);\r\n    }\r\n}\r\n\r\nconst shopping = new Shopping();\r\n\n\n//# sourceURL=webpack://wheel_we_go/./js/shopping.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/shopping.js"]();
/******/ 	
/******/ })()
;