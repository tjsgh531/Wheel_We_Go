import { Navi } from "./navi.js";

export class NaviDataCaution{
    constructor(){
        this.map;
        this.currentLat, this.currentLon;

        this.mode = 0; // 1 -> "데이터 부족" | 2 -> "데이터 애매" | 3 -> "데이터 충분"
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
            console.log(data[1]["kms"]);
            
            const backgroundBlur = document.querySelector(".backgroundBlur");
            const lowData = document.querySelector(".lowData");
            const iffyData = document.querySelector(".iffyData");
            const enoughData = document.querySelector(".enoughData");
            const coin1 = document.querySelector(".coin1");
            const coin2 = document.querySelector(".coin2");
            const coin3 = document.querySelector(".coin3");
            const dataCount1 = document.querySelector(".dataCount1");
            const dataCount2 = document.querySelector(".dataCount2");
            const dataCount3 = document.querySelector(".dataCount3");
            const naviDataCautionBtn_Start1 = document.querySelector(".naviDataCautionBtn_Start1");
            const naviDataCautionBtn_Start2 = document.querySelector(".naviDataCautionBtn_Start2");
            const naviDataCautionBtn_Start3 = document.querySelector(".naviDataCautionBtn_Start3");
       
            backgroundBlur.classList.toggle("unactive", false);
            console.log(data[1]["kms"]);

            // 데이터의 총 km를 기준으로 출력 화면 변화
            if( data[1]["kms"] <= 10) {
                this.mode = 1
                lowData.classList.toggle("unactive", false); // low O
                iffyData.classList.toggle("unactive", true); // iffy X
                enoughData.classList.toggle("unactive", true); // enough X
                
                dataCount1.textContent = `${data[0]["stacks"]}`;
                coin1.textContent = `${this.expectCoin}`;

                naviDataCautionBtn_Start1.addEventListener('click',()=>{
                    this.allUnactive();
                });
                

            }
            else if((10 < data[1]["kms"]) && (data[1]["kms"] < 100)) {
                this.mode = 2
                lowData.classList.toggle("unactive", true); // low X
                iffyData.classList.toggle("unactive", false); // iffy O
                enoughData.classList.toggle("unactive", true); // enough X

                dataCount2.textContent = `${data[1]["stacks"]}`;
                coin2.textContent = `${this.expectCoin}`;

                naviDataCautionBtn_Start2.addEventListener('click',()=>{
                    this.allUnactive();
                });
            }
            else {
                this.mode = 3
                lowData.classList.toggle("unactive", true); // low X
                iffyData.classList.toggle("unactive", true); // iffy X
                enoughData.classList.toggle("unactive", false); // enough O
                
                dataCount3.textContent = `${data[2]["stacks"]}`;
                coin3.textContent = `${this.expectCoin}`;

                naviDataCautionBtn_Start3.addEventListener('click',()=>{
                    this.allUnactive();
                });
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
        const enoughData = document.querySelector(".enoughData");

        backgroundBlur.classList.toggle("unactive", true);
        lowData.classList.toggle("unactive", true);
        iffyData.classList.toggle("unactive", true);
        enoughData.classList.toggle("unactive", true);

    }
}