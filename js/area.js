class Area {
    constructor(){
        this.initTmap();

        this.polygons = [];
    }

    initTmap() {
        console.log("되랏!!");
        this.map = new Tmapv3.Map("map_div", {
            center: new Tmapv3.LatLng(37.56520450, 126.98702028),
            width: "100%",
            height: "100vh",
            zoom: 12
        });
        
        this.map.on("ConfigLoad", () => {
            this.startLoadFile();
        });
    }

    startLoadFile() {
        $.ajax({
            url: '../geojson/seoul_coordinates.geojson',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                var data = data.features;
                var coordinates = [];
                

                for (let i = 0; i < data.length; i++) {
                    coordinates = data[i].geometry.coordinates;
                    // name = data[i].properties.temp;
                    this.displayArea(coordinates);
                }
            }
        });
    }

   

    displayArea(coordinates) {
        var path = [];
        var point = [];
        var points = [];

        for (let j = 0; j < coordinates.length; j++) {
            for (let z = 0; z < coordinates[j].length; z++) {
                for (let x = 0; x < coordinates[j][z].length; x++) {
                    points = coordinates[j][z][x];

                    var temp = points[1];
                    points[1] = points[0];
                    points[0] = temp;

                    point.push(points);

                    path.push(new Tmapv3.LatLng(points[0], points[1]));
                }
            }
        }

        var polygon = new Tmapv3.Polygon({
            paths: path,
            fillColor: "#fff00",
            strokeColor: "#FFFFFF",
            strokeWeight: 1,
            map: this.map,
        });

        this.polygons.push(polygon);
    }
}

window.onload = () => {
    new Area();
}
