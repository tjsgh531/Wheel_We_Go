export class Search {
    constructor() {
        this.currentLat, this.currentLon;
        this.map;
      
        this.focusSearchBox();
    }

    setMap(map){
        this.map = map;
    }

    setPosition(lat, lon){
        this.currentLat = lat;
        this.currentLon = lon;
    }
   

    getList(lat, lng, search_word){
        return new Promise((resolve, reject)=>{     
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
                    "resCoordType" : "WGS84GEO",
                    "reqCoordType" : "WGS84GEO",
                    "count" : 10
                },
                success:function(response){
                    let resultpoisData = response.searchPoiInfo.pois.poi;
                    let search_list =[];
                    let search_coords = [];
                    let search_tel = [];
                    let search_addr = [];
                    
                    for(let k in resultpoisData){
                        
                        console.log(resultpoisData[k]);
                        let noorLat = Number(resultpoisData[k].noorLat);
                        let noorLon = Number(resultpoisData[k].noorLon);
                        let coords = {
                            latitude : noorLat,
                            longitude : noorLon,
                        };
                        
                        let name = resultpoisData[k].name;

                        let address = resultpoisData[k].middleAddrName +resultpoisData[k].lowerAddrName + resultpoisData[k].roadName;
                        
                        let tel = resultpoisData[k].telNo;

                        search_list.push(name);
                        search_coords.push(coords);
                        search_addr.push(address);
                        search_tel.push(tel);
                    }

                    const result = {
                        name_list : search_list,
                        coords : search_coords,
                        addr : search_addr,
                        tel : search_tel,
                    };
                    
                    resolve(result);
                },
                error:function(request,status,error){
                    console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    const result = {
                        name_list : [],
                        coords : [],
                        addr : [],
                        tel : [],
                    };
                    resolve(result);
                }
            });
        });
      
    
    }

    focusSearchBox(){
        const searchBox = document.querySelector('.searchBox');
        
        const searchIcon = document.querySelector('.searchIcon');
        const search_cancle = document.querySelector('.search_cancle');
        const sideBarBtn = document.querySelector('.sideBarBtn');
        const search_result = document.querySelector('.search_result');

        const gnb = document.querySelector('.gnb');

        // 검색 창 활성화
        searchBox.addEventListener('focus', (ele)=>{
            sideBarBtn.classList.add("unactive");
            searchIcon.classList.add('unactive');
            search_cancle.classList.remove("unactive");
            search_result.classList.remove("unactive");

            gnb.classList.add("search_gnb");

        });

        // 검색 취소 버튼 클릭
        search_cancle.addEventListener('click',()=>{
            sideBarBtn.classList.remove("unactive");
            searchIcon.classList.remove('unactive');
            search_cancle.classList.add("unactive");
            search_result.classList.add("unactive");

            gnb.classList.remove("search_gnb");

            searchBox.value="";
            search_result.innerHTML = ""; //내용 제거
        });


        // 검색어 입력시
        this.preSearchWord="";
        this.searchtime;
        searchBox.addEventListener('input', (ele)=>{
            
            const value = searchBox.value;

             // 3초간 입력된 글자가 바뀌지 않은 경우 검색 시작
            if(this.searchtime){
                clearTimeout(this.searchtime);
            }
             
            this.searchtime = setTimeout(()=>{
                this.getList(this.currentLat, this.currentLon, value)
                .then((result)=>{
                    const newresult = result;

                    search_result.innerHTML = ""; //내용 제거
                    console.log("검색 결과 : ", newresult);

                    for(let i in newresult.name_list){
                        const store_name = newresult.name_list[i];
                        const store_latitude = newresult.coords[i].latitude;
                        const store_longitude = newresult.coords[i].longitude;
                        const store_addr = newresult.addr[i];
                        const store_tel = newresult.tel[i]

                        const searchBlock = document.createElement('div');
                        searchBlock.classList.add("searchBlock");
                        searchBlock.textContent = `${store_name}`;

                        search_result.appendChild(searchBlock);

                        // 검색 결과를 클릭 한 경우
                        searchBlock.addEventListener('click',()=>{
                            sideBarBtn.classList.remove("unactive");
                            searchIcon.classList.remove('unactive');
                            search_cancle.classList.add("unactive");
                            search_result.classList.add("unactive");
                
                            gnb.classList.remove("search_gnb");

                            this.clickSearchBlock(store_latitude, store_longitude, store_name, store_addr, store_tel);
                        });
                    }
                });
            },1000);

        });
    }

    clickSearchBlock(lat, lng, name, addr, tel){
        console.log("여기 ㅙ 안돼?");
        console.log(lat, lng, name, addr, tel);

        /*test data */
        this.displayMark(lat, lng);
        this.displayStoreInfo(name);
    }
    
    // Mark 지도 상에 찍기
    displayMark(lat, lng){
        const marker = new Tmapv3.Marker({
            position : new Tmapv3.LatLng(lat,lng),
            map : this.map
        });
    }

    displayStoreInfo(name){
        document.querySelector(".placeInfoDetail").textContent = `${name}`;
    }
}