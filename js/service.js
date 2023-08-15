import { InitMap } from "./extendsTools/initmap.js";
import { CurrentPos } from "./extendsTools/currentPos.js";
import { Search } from "./extendsTools/search.js";

class Area {
    constructor() {
        this.maptool = new InitMap();
        this.currentPos = new CurrentPos();
        this.searchTool = new Search();

        this.map;
        this.currentLat;
        this.currentLon;

        this.polygons = [];
        this.data = null;

        this.start();

        this.markers = [];

        document.getElementById('searchBtn').addEventListener('click', () => {
            const searchWord = document.getElementById('searchInput').value;
            this.search(searchWord);
        });
    }

    start() {
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
                        this.search();
                    });
                })
        });
    }

    startLoadFile() {
        $.ajax({
            url: "/static/json/seoul_jsonfile.json",
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                this.data = data.features;

                var coordinates = [];
                var name = [];
                var user_data = {};

                for (let i = 0; i < this.data.length; i++) {
                    coordinates = this.data[i].geometry.coordinates;
                    name.push(this.data[i].properties.ADM_NM);

                    if (name[i] == "사직동" || name[i] == "구로4동") {
                        user_data[name[i]] = '50';
                    } else {
                        user_data[name[i]] = '0';
                    }
                }

                var color = [];

                for (const key in user_data) {
                    console.log(key, user_data[key]);

                    if (user_data[key] < 3) {
                        color.push("#fff000");
                    } else if (user_data[key] >= 3 && user_data[key] < 10) {
                        color.push("#fff00");
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

    displayArea(coordinates, color) {
        var path = [];
        var point = [];
        var points = [];

        for (let j = 0; j < coordinates.length; j++) {
            for (let z = 0; z < coordinates[j].length; z++) {
                points = coordinates[j][z];

                var temp = points[1];
                points[1] = points[0];
                points[0] = temp;

                point.push(points);

                path.push(new Tmapv3.LatLng(points[0], points[1]));
            }
        }
        var polygon = new Tmapv3.Polygon({
            paths: path,
            fillColor: color,
            strokeColor: "#99ccff",
            strokeWeight: 1,
            map: this.map,
        }
        );
        this.polygons.push(polygon);
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

    clearMarker(){
        this.markers.forEach(function (marker){
            marker.setMap(null);
        })
        this.markers = [];
    }
}

window.onload = () => {
    new Area();
}