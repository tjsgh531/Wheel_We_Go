/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/extendsTools/restApiData.js":
/*!****************************************!*\
  !*** ./js/extendsTools/restApiData.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RestApiData: () => (/* binding */ RestApiData)\n/* harmony export */ });\n\r\nclass RestApiData{\r\n    constructor(){\r\n\r\n\r\n    }\r\n    ///////////////////////////////////////////////////////////////////////\r\n    //////////////////////////  create data  //////////////////////////////\r\n    ///////////////////////////////////////////////////////////////////////\r\n    // 지역(Regions) 생성\r\n    async createRegion(regionData) {\r\n        const apiUrl = 'http://127.0.0.1:8000/api/regions/';\r\n\r\n        return fetch(apiUrl, {\r\n            method: 'POST',\r\n            headers: {\r\n                'Content-Type': 'application/json'\r\n            },\r\n            body: JSON.stringify(regionData)\r\n        })\r\n\r\n        .then(response => response.json());\r\n    }\r\n\r\n    // 한 건 당(saveRecords) 생성\r\n    async createSaveRecord(saveRecordData) {\r\n        const apiUrl = 'http://127.0.0.1:8000/api/saveRecords/post';\r\n\r\n        return fetch(apiUrl, {\r\n            method: 'POST',\r\n            headers: {\r\n                'Content-Type': 'application/json'\r\n            },\r\n            body: JSON.stringify(saveRecordData)\r\n        })\r\n\r\n        .then(response => response.json());\r\n\r\n    }\r\n\r\n\r\n    ///////////////////////////////////////////////////////////////////////\r\n    ///////////////////////////// read data ///////////////////////////////\r\n    ///////////////////////////////////////////////////////////////////////\r\n\r\n    // 지역 불러오기\r\n\r\n    getRegionData(){\r\n        return new Promise((resolve, reject)=>{\r\n            const apiUrl = 'http://127.0.0.1:8000/api/regions/?format=json';\r\n\r\n            // fetch 함수를 사용하여 데이터 가져오기\r\n            fetch(apiUrl)\r\n            .then(response => response.json())\r\n            .then(data => {\r\n                resolve(data);\r\n            });\r\n        });  \r\n    }\r\n    // 유저 불러오기\r\n    getUserData(){\r\n        return new Promise((resolve,reject)=>{\r\n            const apiUrl= 'http://127.0.0.1:8000/api/users/?format=json'\r\n\r\n            fetch(apiUrl)\r\n            .then(response => response.json())\r\n            .then(data=> {\r\n                resolve(data);\r\n            });\r\n        });\r\n    };\r\n    //기록 불러오기\r\n    getsaveRecordsData(){\r\n        return new Promise((resolve,reject)=>{\r\n            const apiUrl= 'http://127.0.0.1:8000/api/saveRecords/?format=json'\r\n\r\n            fetch(apiUrl)\r\n            .then(response => response.json())\r\n            .then(data=> {\r\n                resolve(data);\r\n            });\r\n        });\r\n    };\r\n\r\n    ///////////////////////////////////////////////////////////////////////\r\n    //////////////////////////  update data  //////////////////////////////\r\n    ///////////////////////////////////////////////////////////////////////\r\n\r\n    // 유저 정보 업데이트 \r\n    updateUser(userId, updatedUserData) {\r\n        return new Promise((resolve, reject) => {\r\n            const apiUrl = `http://127.0.0.1:8000/api/users/${userId}/`;\r\n\r\n            fetch(apiUrl, {\r\n                method: 'PUT',\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                },\r\n                body: JSON.stringify(updatedUserData)\r\n            })\r\n\r\n            .then(response => response.json())\r\n            .then(data => {\r\n                resolve(data);\r\n            });\r\n        });\r\n    }\r\n\r\n    // 지역(Regions) 정보 업데이트 \r\n    updateUser(regions, updatedUserData) {\r\n        return new Promise((resolve, reject) => {\r\n            const apiUrl = `http://127.0.0.1:8000/api/regionos/${regions}/`;\r\n\r\n            fetch(apiUrl, {\r\n                method: 'PUT',\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                },\r\n                body: JSON.stringify(updatedUserData)\r\n            })\r\n\r\n            .then(response => response.json())\r\n            .then(data => {\r\n                resolve(data);\r\n            });\r\n\r\n        });\r\n    }\r\n\r\n    // 한 건 당(saveRecords) 정보 업데이트 \r\n    updatesaveRecords(saveRecords, updatedUserData) {\r\n        return new Promise((resolve, reject) => {\r\n            const apiUrl = `http://127.0.0.1:8000/api/regionos/${saveRecords}/`;\r\n\r\n            fetch(apiUrl, {\r\n                method: 'PUT',\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                },\r\n                body: JSON.stringify(updatedUserData)\r\n            })\r\n\r\n            .then(response => response.json())\r\n            .then(data => {\r\n                resolve(data);\r\n            });\r\n\r\n        });\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack://wheel_we_go/./js/extendsTools/restApiData.js?");

/***/ }),

/***/ "./js/mypage.js":
/*!**********************!*\
  !*** ./js/mypage.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _extendsTools_restApiData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extendsTools/restApiData.js */ \"./js/extendsTools/restApiData.js\");\n\r\n\r\n\r\n\r\n\r\nclass MyPage {\r\n\r\n    constructor() {\r\n        this.restApiTool = new _extendsTools_restApiData_js__WEBPACK_IMPORTED_MODULE_0__.RestApiData();\r\n        this.username = this.getCurrentLoginUser();\r\n\r\n        this.start();\r\n    }\r\n\r\n    getCurrentLoginUser() {\r\n        let userinfo = document.getElementById('user-info');\r\n        let user = userinfo.dataset.username;\r\n        return user;\r\n      }\r\n    \r\n    async start() {\r\n        const userCoin = await this.getUserCoin();\r\n        this.updateCoinInfo(userCoin);\r\n        this.sideBar();\r\n    }\r\n\r\n    async getUserCoin() {\r\n        const data = await this.restApiTool.getUserData();\r\n        const userRecord = data.find(record => record.user_id === this.username);\r\n        const userCoin = userRecord ? userRecord.user_coin : 0;\r\n        return userCoin;\r\n    }\r\n\r\n    updateCoinInfo(userCoin) {\r\n        const coinPriceElement = document.querySelector('.price'); \r\n        coinPriceElement.textContent = `${userCoin} `;\r\n    }\r\n    sideBar() {\r\n        const sideBarBtn = document.querySelector('.sideBarBtn');\r\n        const sideBar = document.querySelector('.sideBar');\r\n        const sideBar_cancle = document.querySelector('.sideBar_cancle')\r\n\r\n        // 사이드 바 나타내기\r\n        sideBarBtn.addEventListener(\"click\", () => {\r\n            sideBar.classList.toggle('unactive', false);\r\n        });\r\n\r\n        sideBar_cancle.addEventListener('click', () => {\r\n            sideBar.classList.toggle('unactive', true);\r\n        });\r\n    }\r\n}\r\n\r\nwindow.onload = () => {\r\n    new MyPage();\r\n}\n\n//# sourceURL=webpack://wheel_we_go/./js/mypage.js?");

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/mypage.js");
/******/ 	
/******/ })()
;