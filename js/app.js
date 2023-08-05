import { InitMap } from "./initmap.js";

class App{
    constructor(){
        this.map = new InitMap();
    }
}

window.onload = ()=>{
    new App()
}