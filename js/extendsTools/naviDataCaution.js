import { Navi } from "./navi.js";

export class NaviDataCaution{
    constructor(){
        this.map;
        this.currentLat, this.currentLon;

        this.mode = 0; // 0 -> "데이터 부족" | 1 -> "데이터 애매" | 2 -> "데이터 충분"
        this.isNavi = false;
        this.expectCoin;
    }

    setMap(map){
        this.map = map;
    }

    setExpectCoin(coin){
        this.expectCoin = coin;
    }
    
    naviDataCaution(){
        // REST API의 엔드포인트 URL
        const apiUrl = 'http://127.0.0.1:8000/api/regions/?format=json';

        // fetch 함수를 사용하여 데이터 가져오기
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); // JSON 형식의 데이터로 변환
        })
        .then(data => {
            // 가져온 데이터 활용
            console.log(data[0]["kms"]);
            
            const backgroundBlur = document.querySelector(".backgroundBlur");
            const lowData = document.querySelector(".lowData");
            const coin = document.querySelector(".coin");
            const naviDataCautionBtn_Start = document.querySelector(".naviDataCautionBtn_Start");
       

            backgroundBlur.classList.toggle("unactive", false);
            coin.textContent = `${this.expectCoin}`;

            // 데이터의 총 km를 기준으로 출력 화면 변화
            if( data[0]["kms"] <= 10) {
                this.mode = 0
                lowData.classList.toggle("unactive", false);
                
                naviDataCautionBtn_Start.addEventListener('click',()=>{
                    this.allUnactive();
                });
                

            }
            else if((10 < data[0]["kms"]) && (data[0]["kms"] < 100)) {
                this.mode = 1
            }
            else {
                this.mode = 2
            }
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
        });
    }

    allUnactive(){
        const backgroundBlur = document.querySelector(".backgroundBlur");
        const lowData = document.querySelector(".lowData");
        const iffyData = document.querySelector(".iffyData");
        const fullData = document.querySelector(".fullData");

        backgroundBlur.classList.toggle("unactive", true);
        lowData.classList.toggle("unactive", true);
        iffyData.classList.toggle("unactive", true);
        fullData.classList.toggle("unactive", true);

    }
}