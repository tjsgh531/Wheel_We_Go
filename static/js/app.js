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

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _initmap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initmap.js */ \"./js/initmap.js\");\n/* harmony import */ var _drawShape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawShape.js */ \"./js/drawShape.js\");\n/* harmony import */ var _currentPos_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currentPos.js */ \"./js/currentPos.js\");\n\n\n\n\nclass App{\n    constructor(){\n        this.currentLat;\n        this.currentLon;\n\n        this.map;\n        \n        this.maptool = new _initmap_js__WEBPACK_IMPORTED_MODULE_0__.InitMap();\n\n        this.drawTools;\n\n        this.currentPosCircle;h\n\n        this.currentPos = new _currentPos_js__WEBPACK_IMPORTED_MODULE_2__.CurrentPos();\n        \n        this.init();\n    }\n\n    init(){\n        \n        const currentLocation = this.currentPos.getLocation();\n        this.currentLat = currentLocation[0];\n        this.currentLon = currentLocation[1];\n\n        this.map = this.maptool.createTmap(this.currentLat, this.currentLon);\n            \n        this.map.on(\"ConfigLoad\",function(){\n            this.drawTools = new _drawShape_js__WEBPACK_IMPORTED_MODULE_1__.DrawShape(this.map);\n            this.currentPosCircle = this.drawTools.addCircle(this.currentLat, this.currentLon, 2, 2, \"#FFC573\");\n                    \n            setInterval(()=>{\n                this.update();\n            }, 500);\n            \n        }.bind(this));\n    }\n\n    //프래임마다 반복하는 함수\n    update(){\n        // 현재 위치 업데이트\n        this.currenLat, this.currentLon = this.currentPos.getLocation();\n\n        //자기 위치 표현하는 원 움직이기\n        this.currentPosCircle = this.drawTools.moveCircle(this.currentPosCircle, this.currentLat, this.currentLon);\n\n        //맵을 현재 위치에 중앙 맞추기\n        this.map = this.maptool.updateMap(this.map, this.currentLat, this.currentLon);\n    \n        \n    }\n    \n}\n\nwindow.onload = ()=>{\n    new App();\n}\n\n// window.addEventListener(\"click\", ()=>{\n//     alert(\"STOP\");\n// });\n\n\n\n//# sourceURL=webpack://wheel_we_go/./js/app.js?");

/***/ }),

/***/ "./js/currentPos.js":
/*!**************************!*\
  !*** ./js/currentPos.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CurrentPos: () => (/* binding */ CurrentPos)\n/* harmony export */ });\nclass CurrentPos{\n    constructor(){\n        this.currentLat = 35.151368;\n        this.currentLon = 128.099938;\n        \n        setInterval(()=>{\n            this.updateCurrentPos();\n        }, 100);\n    }\n\n    getLocation(){\n        return [this.currentLat, this.currentLon];\n    }\n\n    updateCurrentPos(){\n        this.getCurrentLocation().then((position)=>{\n\n            if(position.coords.latitude == undefined || position.coords.longitude == undefined){\n                this.currentLat = position.coords.latitude;\n                this.currentLon = position.coords.longitude;\n            }\n            //console.log(\"현재 좌표 : \", this.currentLat, this.currentLon);\n\n            //requestAnimationFrame(this.updateCurrentPos.bind(this));\n        });\n    }\n\n    getCurrentLocation() {\n        return new Promise((resolve, reject) => {\n            if (navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(resolve, reject);\n            } else {\n                reject(new Error('Geolocation이 지원되지 않는 브라우저입니다.'));\n            }\n        });\n    }\n}\n\n//# sourceURL=webpack://wheel_we_go/./js/currentPos.js?");

/***/ }),

/***/ "./js/drawShape.js":
/*!*************************!*\
  !*** ./js/drawShape.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DrawShape: () => (/* binding */ DrawShape)\n/* harmony export */ });\nclass DrawShape{\n    constructor(map){\n        this.map = map;\n    }\n\n    //원\n    addCircle(lat, lon, radius, strokeWeight, color){\n        const circle = new Tmapv3.Circle({\n\t\t\tcenter: new Tmapv3.LatLng(lat, lon),\n\t\t\tradius: radius,\n\t\t\tstrokeWeight : strokeWeight,\n\t\t\tfillColor: color,\n\t\t\tmap: this.map\n\t\t});\n\n        return circle;\n    }\n\n    //원 위치 변경\n    moveCircle(circle, lat, lon){\n        circle._shape_data.center._lat = lat;\n        circle._shape_data.center._lng = lon;\n\n        return circle;\n    }\n\n    //선\n\taddPolyline(startLat, startLon, endLat, endLon, strokeWeight, color){\n\t\tconst polyline = new Tmapv3.Polyline({\n\t\t\tpath: [new Tmapv3.LatLng(startLat, startLon),\t// 선의 꼭짓점 좌표\n\t\t\t\tnew Tmapv3.LatLng(endLat, endLon),\t// 선의 꼭짓점 좌표\n            ],\n\t\t\tstrokeColor: color,\n\t\t\tstrokeWeight: strokeWeight,\n\t\t\tmap: this.map\n\t\t});\n        \n\n        return polyline\n    }\n\n    //선 지우기\n    deletePolyline(polyline){\n        polyline.setMap(null);\n    }\n    \n    //사각형\n\taddRectangle(maxLat, maxLon, minLat, minLon, strokeWeight, color){\n\t\tconst rect = new Tmapv3.Rectangle({\n            bounds: new Tmapv3.LatLngBounds(new Tmapv3.LatLng(minLat, minLon), new Tmapv3.LatLng(maxLat, maxLon)),\n            fillColor: color,\n            strokeWeight : strokeWeight,\n            map: this.map\n\t\t});\n\n        return rect;\n\t}\n\n    //다각형\n\taddPolygon(pointArray, strokeWeight, color){\n        //pointArray: [(위도1, 경도1), (위도2, 경도2) ...]\n        let newpaths = [];\n        pointArray.forEach(ele => {\n            const pointLat = ele[0];\n            const pointLon = ele[1];\n            const newPoint = new Tmapv3.LatLng(pointLat, pointLon);\n\n            newpaths.push(newPoint);\n        });\n\n\t\tconst polygon = new Tmapv3.Polygon({\n\t\t\tpaths: newpaths,\n\t\t    fillColor: color,\n\t\t    strokeWeight: strokeWeight,\n\t\t    map: this.map\n\t\t});\n\n        return polygon\n\t}\n}\n\n\t\n\t\n\t\n\t\n\t\n\n//# sourceURL=webpack://wheel_we_go/./js/drawShape.js?");

/***/ }),

/***/ "./js/initmap.js":
/*!***********************!*\
  !*** ./js/initmap.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   InitMap: () => (/* binding */ InitMap)\n/* harmony export */ });\nclass InitMap {\n    constructor() {\n\n    }\n  \n    createTmap(lat, lon) {\n        try {\n            let map = new Tmapv3.Map(\"map_div\", {\n                center: new Tmapv3.LatLng(lat, lon),\n                width: \"100%\",\n                height: \"100vh\",\n                zoom: 18\n            });\n\n            return map;\n\n        } catch (error) {\n            console.error('지도 초기화 중 오류 발생:', error);\n            return null;\n        }\n    }\n    \n    updateMap(map, lat, lon){\n\n        console.log(\"맵의 중심 : \", map.getCenter());\n\n        const newcenter = new Tmapv3.LatLng(lat, lon);\n        map.setCenter(newcenter);\n\n        return map;\n    }\n    \n}\n  \n\n\n//# sourceURL=webpack://wheel_we_go/./js/initmap.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./js/app.js");
/******/ 	
/******/ })()
;