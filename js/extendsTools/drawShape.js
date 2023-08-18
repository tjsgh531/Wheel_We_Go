export class DrawShape{
    constructor(){

    }

    setMap(map){
        this.map = map;
    }

    //원
    addCircle(lat, lon, radius){
        const circle = new Tmapv3.Circle({
			center: new Tmapv3.LatLng(lat, lon),
            fillColor : "#027bfc",
			radius: radius,
            strokeColor :"#FFFFFF",
            strokeWeight : 2,
			map: this.map
		});

        return circle;
    }

    //원 위치 변경
    moveCircle(circle, lat, lon){
        console.log(circle);
        const newCircle = new Tmapv3.Circle({
			center: new Tmapv3.LatLng(lat, lon),
			radius: circle._shape_data.radius,
            fillColor : "#027bfc",
            strokeColor :"#FFFFFF",
            strokeWeight : 2,
            map: this.map
		});

        circle.setMap(null);

        return newCircle;
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

    drawPath(coords){
        let pre_position;

        coords.forEach( position => {
            let cur_lat = position[0];
            let cur_lon = position[1];

            if(pre_position){
                let pre_lat = pre_position[0];
                let pre_lon = pre_position[1];

                this.addPolyline(pre_lat, pre_lon, cur_lat, cur_lon);
                pre_position = position;
            }else{
                pre_position = position;
            }
        });
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

	
	
	
	
	