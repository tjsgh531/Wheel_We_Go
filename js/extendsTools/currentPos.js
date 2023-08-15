export class CurrentPos{
    constructor(){
     
    }
    
    watchLocation(success){
        if (navigator.geolocation) {
            const watchid = navigator.geolocation.watchPosition(
                success
                , ()=>{
                    console.error(`ERROR(${err.code}): ${err.message}`);
                }, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                });
            console.log("watch loaction id : ", watchid);
            return watchid;
        }
    }
    
    // const currentLocation = {
    //     latitude : position.coords.latitude,
    //     longitude : position.coords.longitude,  
    // }
    
        
    

    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject(new Error('Geolocation이 지원되지 않는 브라우저입니다.'));
            }
        });
    }
}