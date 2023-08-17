import { InitMap } from "./extendsTools/initmap.js";
import { CurrentPos } from "./extendsTools/currentPos.js";
import { Search } from "./extendsTools/search.js";

class Area {
    constructor() {
        this.maptool = new InitMap();
        this.currentPos = new CurrentPos();
        this.searchTool = new Search();

        this.map = null;
        this.currentLat;
        this.currentLon;

        this.polygons = [];
        this.data = null;
        this.name = [];

        this.start();

        this.markers = [];

        document.getElementById('searchBtn').addEventListener('click', () => {
            const searchWord = document.getElementById('searchInput').value;
            this.search(searchWord);
        });

        setInterval(() => {
            this.displayMapCenter();
        }, 1000);
    }

    start() {
        this.sideBar();
        this.initTmap();
    }

    initTmap() {
        this.currentPos.getCurrentLocation().then((position) => {
            console.log("position : ", position);

            this.currentLat = position.coords.latitude;
            this.currentLon = position.coords.longitude;
            this.maptool.createTmap(this.currentLat, this.currentLon)
                .then((map) => {
                    this.map = map;

                    this.map.on("ConfigLoad", () => {
                        this.startLoadFile();
                        this.getMapCenter();
                    });
                    this.search();
                })
        });
    }

    startLoadFile() {
        $.ajax({
            url: "/static/json/jinju_coordinates.json",
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                this.data = data.features;

                var coordinates = [];
                var user_data = {};

                for (let i = 0; i < this.data.length; i++) {
                    coordinates = this.data[i].geometry.coordinates;
                    var name = this.data[i].properties.EMD_NM;

                    this.name.push(name);

                    user_data[this.name[i]] = 0;

                    // if (this.name[i] == "사직동" || this.name[i] == "구로4동") {
                    //     user_data[name[i]] = '50';
                    // } else {
                    //     user_data[name[i]] = '0';
                    // }
                }

                var color = [];

                for (const key in user_data) {
                    console.log(key, user_data[key]);

                    if (user_data[key] < 3 && user_data[key] >= 0) {
                        color.push("#FF0000");
                    } else if (user_data[key] >= 3 && user_data[key] < 10) {
                        color.push("#FFFF00");
                    } else if (user_data[key] >= 10) {
                        color.push("#FFFFFF");
                    }
                }

                for (let i = 0; i < this.data.length; i++) {
                    coordinates = this.data[i].geometry.coordinates;
                    this.displayArea(coordinates, color[i]);
                }
            }
        });
    }

    displayArea(coordinates, color, admNm) {
        var path = [];
        var point = [];
        var points = [];

        var latSum = 0;
        var lngSum = 0;

        for (let j = 0; j < coordinates.length; j++) {
            for (let z = 0; z < coordinates[j].length; z++) {
                points = coordinates[j][z];

                var temp = points[1];
                points[1] = points[0];
                points[0] = temp;

                point.push(points);

                path.push(new Tmapv3.LatLng(points[0], points[1]));

                latSum += points[0];
                lngSum += points[1];

            }

        }
        // console.log(point);

        var avgLat = latSum / point.length;
        var avgLng = lngSum / point.length;

        var polygon = new Tmapv3.Polygon({
            paths: path,
            fillColor: color,
            strokeColor: "#99ccff",
            strokeWeight: 1,
            map: this.map,
            EMD_NM: admNm,
        });

        var polygonCenter = {
            lat: avgLat,
            lng: avgLng
        }

        this.polygons.push({
            polygon: polygon,
            center: polygonCenter,
        });
    }

    search(search_word) {
        this.clearMarker();

        this.searchTool.getList(this.currentlat, this.currentLon, search_word).then((result) => {
            const nameList = result.name_list;
            const add = result.addr;

            for (const coords of result.coords) {
                const marker = new Tmapv3.Marker({
                    position: new Tmapv3.LatLng(coords.latitude, coords.longitude),
                    map: this.map,
                    title: nameList,
                });
                this.markers.push(marker);
            }
            console.log(nameList);
            console.log(add);

            if (this.markers.length > 0) {
                var markerPosition = this.markers[0].getPosition();
                var latitude = markerPosition.lat();
                var longitude = markerPosition.lng();

                this.map.setCenter(this.markers[0].getPosition());

                console.log(latitude, longitude);
            }
        });
    }

    clearMarker() {
        this.markers.forEach(function (marker) {
            marker.setMap(null);
        })
        this.markers = [];
    }

    getMapCenter() {
        var center = this.map.getCenter();
        console.log(center.lat(), center.lng());

        return {
            latitude: center.lat(),
            longitude: center.lng(),
        };
    }

    displayMapCenter() {
        var center = this.getMapCenter();
        console.log(center.latitude, center.longitude);

        var closestDistance = Number.MAX_VALUE;
        var closestIndex = -1;

        for (let i = 0; i < this.polygons.length; i++) {
            var polygonData = this.polygons[i];
            var polygonCenter = polygonData.center;

            var distance = this.calculateDistance(center.latitude, center.longitude, polygonCenter.lat, polygonCenter.lng);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        }

        if (closestIndex !== -1) {
            console.log("법정동 index :", closestIndex);
            console.log(this.polygons[closestIndex].center.lat, this.polygons[closestIndex].center.lng);

            const closestNameElement = document.getElementById('closestName');
            const correspondingName = this.name[closestIndex];
            console.log("법정동 이름 :", correspondingName);
            closestNameElement.textContent = correspondingName + " 데이터 현황";
        }
        // console.log(closestIndex);
        // console.log(name[closestIndex]);
    }

    calculateDistance(lat1, lng1, lat2, lng2) {
        const earthRadius = 6371; // 지구 반지름

        const degToRad = (degrees) => {
            return degrees * (Math.PI / 180);
        };

        lat1 = degToRad(lat1);
        lng1 = degToRad(lng1);
        lat2 = degToRad(lat2);
        lng2 = degToRad(lng2);

        const dLat = lat2 - lat1;
        const dLng = lng2 - lng1;

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadius * c;
        return distance;
    }

    sideBar() {
        const sideBarBtn = document.querySelector('.sideBarBtn');
        const sideBar = document.querySelector('.sideBar');
        const sideBar_cancle = document.querySelector('.sideBar_cancle')

        // 사이드 바 나타내기
        sideBarBtn.addEventListener("click", () => {
            sideBar.classList.toggle('unactive', false);
        });

        sideBar_cancle.addEventListener('click', () => {
            sideBar.classList.toggle('unactive', true);
        });
    }
}

window.onload = () => {
    new Area();
}

fetch("http://127.0.0.1:8000/api/regions/?format=json/")
    .then((response) => response.json())
    .then((data) => console.log(data))