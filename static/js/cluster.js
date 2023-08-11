function initTmap() {
    map = new Tmapv3.Map("map_div", {
        center: new Tmapv3.LatLng(37.56520450, 126.98702028),
        width: "100%",
        height: "100vh",
        zoom: 10
    });

    map.on("ConfigLoad", function () {
        startLoadFile();
    });
}

function startLoadFile() {
    $.ajax({
        url: 'seoul_coordinates_end.geojson',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var data = data.features;
            var coordinates = [];
            var name = '';
            
            for (let i = 0; i < data.length; i++) {
                coordinates = data[i].geometry.coordinates;
                name = data[i].properties.temp;
                displayArea(coordinates, name);
            }            
        }
    });    
}

var polygons = [];

function displayArea(coordinates) {
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

                path.push(new Tmapv3.LatLng(points[0],points[1]));
            }
            
        }
    }

    var polygon = new Tmapv3.Polygon({
        paths: path,
        fillColor: "#fff00",
        strokeColor: "#FFFFFF",
        strokeWeight: 1,
        map: map,
    });

    polygons.push(polygon);

}