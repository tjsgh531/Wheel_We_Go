export class DrawShape{
    constructor(map){
        this.map = map;
    }

    //원
    addCircle(lat, lon, radius, strokeWeight, color){
        const circle = new Tmapv3.Circle({
			center: new Tmapv3.LatLng(lat, lon),
			radius: radius,
			strokeWeight : strokeWeight,
			fillColor: color,
			map: this.map
		});

        return circle;
    }

    //원 위치 변경
    moveCircle(circle, lat, lon){
        circle._shape_data.center._lat = lat;
        circle._shape_data.center._lng = lon;

        return circle;
    }

    //선
	addPolyline(startLat, startLon, endLat, endLon, strokeWeight, color){
		const polyline = new Tmapv3.Polyline({
			path: [new Tmapv3.LatLng(startLat, startLon),	// 선의 꼭짓점 좌표
				new Tmapv3.LatLng(endLat, endLon),	// 선의 꼭짓점 좌표
            ],
			strokeColor: color,
			strokeWeight: strokeWeight,
			map: this.map
		});
        

        return polyline
    }

    //선 지우기
    deletePolyline(polyline){
        polyline.setMap(null);
    }
    
    //사각형
	addRectangle(maxLat, maxLon, minLat, minLon, strokeWeight, color){
		const rect = new Tmapv3.Rectangle({
            bounds: new Tmapv3.LatLngBounds(new Tmapv3.LatLng(minLat, minLon), new Tmapv3.LatLng(maxLat, maxLon)),
            fillColor: color,
            strokeWeight : strokeWeight,
            map: this.map
		});

        return rect;
	}

    //다각형
	addPolygon(pointArray, strokeWeight, color){
        //pointArray: [(위도1, 경도1), (위도2, 경도2) ...]
        let newpaths = [];
        pointArray.forEach(ele => {
            const pointLat = ele[0];
            const pointLon = ele[1];
            const newPoint = new Tmapv3.LatLng(pointLat, pointLon);

            newpaths.push(newPoint);
        });

		const polygon = new Tmapv3.Polygon({
			paths: newpaths,
		    fillColor: color,
		    strokeWeight: strokeWeight,
		    map: this.map
		});

        return polygon
	}
}

	
	
	
	
	