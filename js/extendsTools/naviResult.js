import { RestApiData } from "./restApiData.js";

export class NaviResult{
    constructor(){
        this.dataTool = new RestApiData();
        
        this.markString = [];

        /* ---------- 마킹 지역 만들때 사용 ------------- */
        this.allPageNum = [];

        /* ---------- 테스트 코드 ------------- */
        // const markers = ["1", "2", "3", "4", "5"];
        // this.createResultSummaryBoard(true, 16, 2.4, 24);
        // this.createResultContentBoard(markers);

    }

    initResultPage(){
        this.markString = [];
        this.allPageNum = [];

        const marking_state = document.querySelector(".marking_state");
        const marking_state_page = document.querySelector(".marking_state_page");

        marking_state.innerHTML = "";
        marking_state_page.innerHTML ="";

    }

    // map 위치 설정
    settingMapPosition(){

    }

    // Summary 결과창 만드는 것
    createResultSummaryBoard(data_valid, time, distance, coin){
        console.log("여기 안되남...");
        const data_valid_item = document.querySelector('.data_valid_item');
        const data_time_item = document.querySelector('.data_time_item');
        const data_distance_item = document.querySelector('.data_distance_item');
        const data_coin_item = document.querySelector('.data_coin_item');

        //data_valid가 true 이면 정상 false 오류
        if(data_valid){
            data_valid_item.textContent = "정상";
        }else{
            data_valid_item.textContent = "오류";
        }

        // 시간 데이터
        data_time_item.textContent = `${time}`;

        // 이동 거리
        data_distance_item.textContent = `${distance}`;

        //코인
        data_coin_item.textContent = `${coin}`;
    }

    //result content 창
    createResultContentBoard(markers){
        const marking_state = document.querySelector('.marking_state');
        let pageNum = 0;
        let marking_group;

        const marker_length = markers.length;

        for(let i = 0; i < marker_length; i++){
            this.markString.push("");
            if(i % 4 == 0){
                if(marking_group){
                    marking_state.appendChild(marking_group);
                    pageNum++;
                }

                marking_group = document.createElement("div");
                marking_group.classList.add("marking_group");
                           
            }

            const newMarkItem = this.createMarkDiv(i+1);
            marking_group.appendChild(newMarkItem);
        }

        if(marker_length % 4 != 0){
            marking_state.appendChild(marking_group);
            pageNum++;
        }

        marking_state.style.width = `${pageNum * 100}vw`;
        
        //page표시 만들기
        const marking_state_page = document.querySelector(".marking_state_page");
        for(let i = 1; i <= pageNum; i++){
            const newPageNum = this.createPageNumDiv(i);
            this.allPageNum.push(newPageNum);
            marking_state_page.appendChild(newPageNum);
        }
        this.allPageNum[0].classList.add("page_num_div_active");
        
    }

    createPageNumDiv(num){
        const pageNumDiv = document.createElement("div");
        pageNumDiv.classList.add("page_num_div");

        pageNumDiv.textContent = `${num}`;

        const marking_state = document.querySelector('.marking_state');
        
        //번호 클릭
        pageNumDiv.addEventListener("click", ()=>{
            marking_state.style.transform = `translateX(${(num-1)*-100}vw)`;
            
            this.allPageNum.forEach(element => {
                element.classList.toggle("page_num_div_active", false);
            });
            pageNumDiv.classList.add("page_num_div_active");
        });

        return pageNumDiv;
    }

    createMarkDiv(num){
        const markingDiv = document.createElement('div');
        const number = document.createElement('div');
        const pin = document.createElement('div');
        const state = document.createElement('div');
        const writeStateBtn = document.createElement('div');

        markingDiv.classList.add('marking_div');
        number.classList.add("number_div");
        pin.classList.add("pin_div");
        state.classList.add("state_div");
        writeStateBtn.classList.add("write_state_btn");

        writeStateBtn.textContent = "사유작성";
        number.textContent = `${num}`;
        pin.innerHTML = "<i class='fa-solid fa-thumbtack'></i>";

        markingDiv.appendChild(number);
        markingDiv.appendChild(pin);
        markingDiv.appendChild(state);
        markingDiv.appendChild(writeStateBtn);

        writeStateBtn.addEventListener("click", ()=>{
            this.writeMarkingBoard(num);
        })

        return markingDiv;
    }

    // Markin 보드 활성화
    writeMarkingBoard(num){
        // 사유작성 클릭시
        const title = document.querySelector(".marking_write_title");
        const resultBoard = document.querySelector(".resultBoard");
        const marking_write_board = document.querySelector(".marking_write_board");
        
        resultBoard.classList.toggle("unactive", true);
        marking_write_board.classList.toggle("unactive", false);
        title.textContent =`${num}번 마커`;

        this.clickMarkWriteBtns(num);
    }

    clickMarkWriteBtns(num){
        
        const cancleBtn = document.querySelector(".marking_write_cancle_btn");
        const submitBtn = document.querySelector(".marking_write_submit_btn");
        const marking_write_content = document.querySelector(".marking_write_content");
        
        const marking_write_board = document.querySelector(".marking_write_board");
        const resultBoard = document.querySelector(".resultBoard");

        marking_write_content.value = this.markString[num-1];

        cancleBtn.addEventListener("click", ()=>{
            marking_write_content.value = "";
            marking_write_board.classList.toggle("unactive", true);
            resultBoard.classList.toggle("unactive", false);
        });

        submitBtn.addEventListener("click", ()=>{
            console.log("제출 버튼 클릭");
            console.log(marking_write_content.value);
            this.markString[num-1] = marking_write_content.value;
            this.writeTextinStateDiv();

            
            marking_write_board.classList.toggle("unactive", true);
            resultBoard.classList.toggle("unactive", false);
            marking_write_content.value = "";
        });
    }

    writeTextinStateDiv(){
        const all_state_div = document.querySelectorAll(".state_div");
        for(let i = 0; i < all_state_div.length; i++){
            all_state_div[i].textContent = `${this.markString[i]}`;
        }
    }
}