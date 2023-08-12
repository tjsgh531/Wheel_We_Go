import { InitMap } from "./extendsTools/initmap.js";
import { DrawShape } from "./extendsTools/drawShape.js";
import { CurrentPos } from "./extendsTools/currentPos.js";

class MapBase{
    constructor(){
        this.maptool = new InitMap();
        this.currentPos = new CurrentPos();
        this.drawShape = new DrawShape();

        this.map;
        this.currentLat, this.currentLon;
        this.centerCircle;
        
        this.start();
    }

    start(){
        this.initSetMap();
    }

    update(position){
        console.log(position);
        console.log(this);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const newPosition = new Tmapv3.LatLng(latitude, longitude);
        
        this.map.setCenter(newPosition);

        this.drawShape.setMap(this.map);

        if(this.centerCircle){
           this.centerCircle = this.drawShape.moveCircle(this.centerCircle, latitude, longitude);
        }
        else{
            this.centerCircle = this.drawShape.addCircle(latitude, longitude, 4);
        }
        
    }

    initSetMap(){
        this.currentPos.getCurrentLocation().then((position)=>{
            this.currentLat = position.coords.latitude;
            this.currentLon = position.coords.longitude;
            
            this.map = this.maptool.createTmap(this.currentLat, this.currentLon);

            this.map.on('ConfigLoad', function(){
                
                console.log("Map이 제대로 로드 됐을까? : ", this.map);
                this.drawShape.setMap(this.map);
                this.currentPos.watchLocation(this.update.bind(this));
            });
            console.log(this.map);
            this.drawShape.setMap(this.map);
            this.watchMapId = this.currentPos.watchLocation(this.update.bind(this));
       
        });
    }
}

window.onload = ()=>{
    new MapBase();
}