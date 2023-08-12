export class Search {
    constructor() {
        this.clickSearchResult();
    }

    getList(lat, lng, search_word){
        let searchKeyword = search_word;
        let headers = {};
        headers["appKey"]="l7xxed2c734830ae4364975ef11e67a76e81";
        
        $.ajax({
            method:"GET",
            headers : headers,
            url:"https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result",
            async:false,
            data:{
                "searchKeyword" : searchKeyword,
                "centerLat" : lat,
                "centerLon" : lng,
                "resCoordType" : "EPSG3857",
                "reqCoordType" : "WGS84GEO",
                "count" : 10
            },
            success:function(response){
                let resultpoisData = response.searchPoiInfo.pois.poi;
                let search_list =[];
                let search_coords = []
                
                for(let k in resultpoisData){
                    
                    console.log(resultpoisData[k]);
                    let noorLat = Number(resultpoisData[k].noorLat);
                    let noorLon = Number(resultpoisData[k].noorLon);
                    let name = resultpoisData[k].name;

                    search_list.push(name);
                    search_coords.push((noorLat, noorLon));
                }

                const result = {
                    name_list : search_list,
                    coords : search_coords
                };
                
                return result;
            },
            error:function(request,status,error){
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                const result = {
                    name_list : [],
                    coords : []
                };
                return result;
            }
        });
      
    }

    clickSearchResult(){
        const searchBlocks = document.querySelectorAll('.searchBlock');
        
        searchBlocks.forEach(ele => {
            ele.addEventListener("click", this.clickSearchBlock.bind(this, ));
        });
    }

    clickSearchBlock(lat, lng, name){
        /*test data */
        this.displayMark(lat, lng);
        this.displayStoreInfo();
    }

    displayMark(){

    }

    displayStoreInfo(){

    }
}