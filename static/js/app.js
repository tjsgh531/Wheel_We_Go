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

/***/ "./js/extendsTools/currentPos.js":
/*!***************************************!*\
  !*** ./js/extendsTools/currentPos.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CurrentPos: () => (/* binding */ CurrentPos)\n/* harmony export */ });\nclass CurrentPos{\r\n    constructor(){\r\n     \r\n    }\r\n    \r\n    watchLocation(success){\r\n        if (navigator.geolocation) {\r\n            const watchid = navigator.geolocation.watchPosition(\r\n                success\r\n                , ()=>{\r\n                    console.error(`ERROR(${err.code}): ${err.message}`);\r\n                }, {\r\n                    enableHighAccuracy: true,\r\n                    timeout: 5000,\r\n                    maximumAge: 0,\r\n                });\r\n            console.log(\"watch loaction id : \", watchid);\r\n            return watchid;\r\n        }\r\n    }\r\n    \r\n    // const currentLocation = {\r\n    //     latitude : position.coords.latitude,\r\n    //     longitude : position.coords.longitude,  \r\n    // }\r\n    \r\n        \r\n    \r\n\r\n    getCurrentLocation() {\r\n        return new Promise((resolve, reject) => {\r\n            if (navigator.geolocation) {\r\n                navigator.geolocation.getCurrentPosition(resolve, reject);\r\n            } else {\r\n                reject(new Error('Geolocation이 지원되지 않는 브라우저입니다.'));\r\n            }\r\n        });\r\n    }\r\n}\n\n//# sourceURL=webpack://wheel_we_go/./js/extendsTools/currentPos.js?");

/***/ }),

/***/ "./js/extendsTools/drawShape.js":
/*!**************************************!*\
  !*** ./js/extendsTools/drawShape.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DrawShape: () => (/* binding */ DrawShape)\n/* harmony export */ });\nclass DrawShape{\r\n    constructor(){\r\n\r\n    }\r\n\r\n    setMap(map){\r\n        this.map = map;\r\n    }\r\n\r\n    //원\r\n    addCircle(lat, lon, radius){\r\n        const circle = new Tmapv3.Circle({\r\n\t\t\tcenter: new Tmapv3.LatLng(lat, lon),\r\n\t\t\tradius: radius,\r\n\t\t\tmap: this.map\r\n\t\t});\r\n\r\n        return circle;\r\n    }\r\n\r\n    //원 위치 변경\r\n    moveCircle(circle, lat, lon){\r\n        console.log(circle);\r\n        const newCircle = new Tmapv3.Circle({\r\n\t\t\tcenter: new Tmapv3.LatLng(lat, lon),\r\n\t\t\tradius: circle._shape_data.radius,\r\n\t\t\tmap: this.map\r\n\t\t});\r\n\r\n        circle.setMap(null);\r\n\r\n        return newCircle;\r\n    }\r\n\r\n    //선\r\n\taddPolyline(startLat, startLon, endLat, endLon, strokeWeight, color){\r\n\t\tconst polyline = new Tmapv3.Polyline({\r\n\t\t\tpath: [new Tmapv3.LatLng(startLat, startLon),\t// 선의 꼭짓점 좌표\r\n\t\t\t\tnew Tmapv3.LatLng(endLat, endLon),\t// 선의 꼭짓점 좌표\r\n            ],\r\n\t\t\tstrokeColor: color,\r\n\t\t\tstrokeWeight: strokeWeight,\r\n\t\t\tmap: this.map\r\n\t\t});\r\n        \r\n\r\n        return polyline\r\n    }\r\n\r\n    //선 지우기\r\n    deletePolyline(polyline){\r\n        polyline.setMap(null);\r\n    }\r\n    \r\n    //사각형\r\n\taddRectangle(maxLat, maxLon, minLat, minLon, strokeWeight, color){\r\n\t\tconst rect = new Tmapv3.Rectangle({\r\n            bounds: new Tmapv3.LatLngBounds(new Tmapv3.LatLng(minLat, minLon), new Tmapv3.LatLng(maxLat, maxLon)),\r\n            fillColor: color,\r\n            strokeWeight : strokeWeight,\r\n            map: this.map\r\n\t\t});\r\n\r\n        return rect;\r\n\t}\r\n\r\n    //다각형\r\n\taddPolygon(pointArray, strokeWeight, color){\r\n        //pointArray: [(위도1, 경도1), (위도2, 경도2) ...]\r\n        let newpaths = [];\r\n        pointArray.forEach(ele => {\r\n            const pointLat = ele[0];\r\n            const pointLon = ele[1];\r\n            const newPoint = new Tmapv3.LatLng(pointLat, pointLon);\r\n\r\n            newpaths.push(newPoint);\r\n        });\r\n\r\n\t\tconst polygon = new Tmapv3.Polygon({\r\n\t\t\tpaths: newpaths,\r\n\t\t    fillColor: color,\r\n\t\t    strokeWeight: strokeWeight,\r\n\t\t    map: this.map\r\n\t\t});\r\n\r\n        return polygon\r\n\t}\r\n}\r\n\r\n\t\r\n\t\r\n\t\r\n\t\r\n\t\n\n//# sourceURL=webpack://wheel_we_go/./js/extendsTools/drawShape.js?");

/***/ }),

/***/ "./js/extendsTools/initmap.js":
/*!************************************!*\
  !*** ./js/extendsTools/initmap.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   InitMap: () => (/* binding */ InitMap)\n/* harmony export */ });\nclass InitMap {\r\n    constructor() {\r\n\r\n    }\r\n  \r\n    createTmap(lat, lon) {\r\n        try {\r\n            let map = new Tmapv3.Map(\"map_div\", {\r\n                center: new Tmapv3.LatLng(lat, lon),\r\n                width: \"100%\",\r\n                height: \"100vh\",\r\n                zoom: 18\r\n            });\r\n\r\n            return map;\r\n\r\n        } catch (error) {\r\n            console.error('지도 초기화 중 오류 발생:', error);\r\n            return null;\r\n        }\r\n    }\r\n    \r\n    updateMap(map, lat, lon){\r\n        const newcenter = new Tmapv3.LatLng(lat, lon);\r\n        map.setCenter(newcenter);\r\n\r\n        return map;\r\n    }\r\n    \r\n}\r\n  \r\n\n\n//# sourceURL=webpack://wheel_we_go/./js/extendsTools/initmap.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _extendsTools_initmap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extendsTools/initmap.js */ \"./js/extendsTools/initmap.js\");\n/* harmony import */ var _extendsTools_drawShape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extendsTools/drawShape.js */ \"./js/extendsTools/drawShape.js\");\n/* harmony import */ var _extendsTools_currentPos_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extendsTools/currentPos.js */ \"./js/extendsTools/currentPos.js\");\n\r\n\r\n\r\n\r\nclass App{\r\n    constructor(){\r\n        this.currentLat;\r\n        this.currentLon;\r\n\r\n        this.map;\r\n        \r\n        this.maptool = new _extendsTools_initmap_js__WEBPACK_IMPORTED_MODULE_0__.InitMap();\r\n\r\n        this.drawTools;\r\n\r\n        this.currentPosCircle;h\r\n\r\n        this.currentPos = new _extendsTools_currentPos_js__WEBPACK_IMPORTED_MODULE_2__.CurrentPos();\r\n        \r\n        this.init();\r\n    }\r\n\r\n    init(){\r\n        \r\n        const currentLocation = this.currentPos.getLocation();\r\n        this.currentLat = currentLocation[0];\r\n        this.currentLon = currentLocation[1];\r\n\r\n        this.map = this.maptool.createTmap(this.currentLat, this.currentLon);\r\n            \r\n        this.map.on(\"ConfigLoad\",function(){\r\n            this.drawTools = new _extendsTools_drawShape_js__WEBPACK_IMPORTED_MODULE_1__.DrawShape(this.map);\r\n            this.currentPosCircle = this.drawTools.addCircle(this.currentLat, this.currentLon, 2, 2, \"#FFC573\");\r\n                    \r\n            setInterval(()=>{\r\n                this.update();\r\n            }, 500);\r\n            \r\n        }.bind(this));\r\n    }\r\n\r\n    //프래임마다 반복하는 함수\r\n    update(){\r\n        // 현재 위치 업데이트\r\n        this.currenLat, this.currentLon = this.currentPos.getLocation();\r\n\r\n        //자기 위치 표현하는 원 움직이기\r\n        this.currentPosCircle = this.drawTools.moveCircle(this.currentPosCircle, this.currentLat, this.currentLon);\r\n\r\n        //맵을 현재 위치에 중앙 맞추기\r\n        this.map = this.maptool.updateMap(this.map, this.currentLat, this.currentLon);\r\n    \r\n        \r\n    }\r\n    \r\n}\r\n\r\nwindow.onload = ()=>{\r\n    new App();\r\n}\r\n\r\n// window.addEventListener(\"click\", ()=>{\r\n//     alert(\"STOP\");\r\n// });\r\n\r\n\n\n//# sourceURL=webpack://wheel_we_go/./js/main.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;