import { RestApiData } from "./extendsTools/restApiData.js";
import { NaviResult } from "./extendsTools/naviResult.js";
import { InitMap } from "./extendsTools/initmap.js";
import { DrawShape } from "./extendsTools/drawShape.js";

import Chart from 'chart.js/auto';


class MyData {
  constructor() {
    this.restApiTool = new RestApiData();
    this.naviResultTool = new NaviResult();
    this.naviResult = new NaviResult();
    this.maptool = new InitMap();
    this.drawtool = new DrawShape();

    this.username = this.getCurrentLoginUser();
    this.PrintUserRecordsAllData();
    this.chart();

    this.createMap();
  }

  createMap(){
    this.maptool.createTmap(37.468478, 127.039257).then((map)=>{
      console.log("맵 완성");
      this.map = map;
      this.drawtool.setMap(map);
    })
  }

  getCurrentLoginUser() {
    let userinfo = document.getElementById('user-info');
    let user = userinfo.dataset.username;
    return user;
  }

  async PrintUserRecordsAllData() {
    const data = await this.restApiTool.getsaveRecordsData();
    const userRecords = data.filter(record => record.user_id === this.username);
    userRecords.sort((a, b) => a.info.date.localeCompare(b.info.date));
  
    const startNameFilter = document.getElementById('startNameFilter');
    const dateFilter = document.getElementById('dateRangeFilter');
    const sortOption = document.getElementById('sortOption');
  
    // 동 별 필터링 옵션 처리
    const startNameOptions = new Set(userRecords.map(record => record.info.startName.split(' ').slice(0, 2).join(' ')));
    startNameOptions.add(""); // Add an empty option for "All"
    startNameOptions.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option || "전체";
      startNameFilter.appendChild(optionElement);
    });
  
    const applyFiltersAndSort = () => {
      const selectedStartName = startNameFilter.value;
      const selectedRange = dateFilter.value;
      const selectedSort = sortOption.value;
  
      let filteredRecords = userRecords;
  
      if (selectedStartName !== "") {
        filteredRecords = userRecords.filter(record => {
          const startName = record.info.startName.split(' ').slice(0, 2).join(' ');
          return startName === selectedStartName;
        });
      }
  
      if (selectedRange !== "0") {
        const today = new Date();
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - selectedRange);
  
        filteredRecords = filteredRecords.filter(record => {
          const recordDate = new Date(record.info.date.replace(/\./g, '-'));
          return recordDate >= oneMonthAgo && recordDate <= today;
        });
      }
  
      if (selectedSort === 'latest') {
        filteredRecords.sort((a, b) => b.info.date.localeCompare(a.info.date));
      } else if (selectedSort === 'oldest') {
        filteredRecords.sort((a, b) => a.info.date.localeCompare(b.info.date));
      }
  
      this.displayRecords(filteredRecords);
    };
  
    startNameFilter.addEventListener('change', applyFiltersAndSort);
    dateFilter.addEventListener('change', applyFiltersAndSort);
    sortOption.addEventListener('change', applyFiltersAndSort);
  
    applyFiltersAndSort();
  }

  filterAndDisplayRecords(records, selectedStartName) {
    const filteredRecords = selectedStartName
      ? records.filter(record => {
          const startName = record.info.startName.split(' ').slice(0, 2).join(' ');
          return startName === selectedStartName;
        })
      : records;

    this.displayRecords(filteredRecords);
  }

  filterAndDisplayDateRange(records, selectedRange) {
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - selectedRange);

    const filteredRecords = records.filter(record => {
      const recordDate = new Date(record.info.date.replace(/\./g, '-'));
      return recordDate >= oneMonthAgo && recordDate <= today;
    });

    this.displayRecords(filteredRecords);
  }

  sortAndDisplayRecords(records, selectedSort) {
    if (selectedSort === 'latest') {
      records.sort((a, b) => b.info.date.localeCompare(a.info.date));
    } else if (selectedSort === 'oldest') {
      records.sort((a, b) => a.info.date.localeCompare(b.info.date));
    }
    console.log("????");
    this.displayRecords(records);
  }

  // 데이터 표시 함수
  displayRecords(records) {
    const recordsList = document.querySelector('.records-list');
    recordsList.innerHTML = '';


    records.forEach(infoData => {

      console.log("???? : ", infoData);
      const recordDate = new Date(infoData.info.date.replace(/\./g, '-'));
      const start = infoData.info.startName;
      const end = infoData.info.endName;
      const time = infoData.info.AtTime;
      const km = infoData.info.distance;
      const credit = infoData.earnedCoin;
      const valid_check = infoData.data_valid;
      
      const markers = infoData.info.markings; 
      const markerStr = infoData.info.markingStr;
      const coords = infoData.info.coords;
      
      const listItem = document.createElement('li');
      listItem.style.listStyle = 'none';
      listItem.innerHTML = `
      <div class= "li_box">
      <div class="route-data-time">${recordDate.toLocaleDateString()}</div>
      <div class="circle-route-etc">
          <div class="circle-container">
              <span class="circle-${valid_check}"></span>
          </div>
      
          <div class="route">
              <div class='start_location'>${start}</div> -> <div class='end_location'>${end}</div>
          </div>
      
          <div class="etc-data">
              <div>
                  <img src="../static/img/시간.png" alt="시간">
                  <div class='take_time'>${time}분</div>
              </div>
              <div>
                  <img src="../static/img/거리.png" alt="거리">
                  <div class='kms'>${km}km</div>
              </div>
              <div>
                  <img src="../static/img/코인.png" alt="코인">
                  <div class='coins'>${credit}</div>
              </div>
          </div>
      </div>
  
      <div class="line"></div>
      `;
      recordsList.appendChild(listItem);

      console.log("여긴 실행 뙜어?");
      listItem.addEventListener("click",this.clickDataBox.bind(this, time, km, credit, markers, markerStr, coords));
    });
  }


  async getFilteredDataCount(selectedStartName) {
    const data = await this.restApiTool.getsaveRecordsData();
    
    const totalDataCount = data.length;

    // 필터링된 데이터 개수 계산
    const filteredData = data.filter(record =>
      selectedStartName === "전체" || record.info.startName.includes(selectedStartName)
    );
    const userFilteredData = filteredData.filter(record => record.user_id === this.username);
    const errorUserFilteredData = userFilteredData.filter(record => record.info.data_valid === 2);

    const filteredDataCount = filteredData.length;
    const userFilteredDataCount = userFilteredData.length;
    const errorUserFilteredDataCount = errorUserFilteredData.length;

    return [filteredDataCount, userFilteredDataCount, errorUserFilteredDataCount];
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////                  도넛차트                    /////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////
  async chart() {
    const canvas = document.getElementById("doughnutChartCanvas");
    const [filteredDataCount, userFilteredDataCount, errorUserFilteredDataCount] = await this.getFilteredDataCount("전체");
    
    const totalFilteredDataCount = filteredDataCount - userFilteredDataCount - errorUserFilteredDataCount;
    const userpercent = ((userFilteredDataCount / filteredDataCount) * 100).toFixed(1);
    
    const data = {
      labels: [`'${this.username}' 님 데이터`, "오류 데이터", "나머지 데이터"],
      datasets: [
        {
          data: [
            (userFilteredDataCount / filteredDataCount) * 100,
            (errorUserFilteredDataCount / filteredDataCount) * 100,
            (totalFilteredDataCount / filteredDataCount) * 100,
          ],
          backgroundColor: ["#FFC573", "#FF0000", "#D27C00"],
          borderWidth: 0,
        },
      ],
    };
      
    const options = {
      cutout: '70%',
      hover: { model: null },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    };
    
    // 도넛 차트 생성
    const doughnutChartCanvas = document.getElementById("doughnutChartCanvas");
    const doughnutChartCtx = doughnutChartCanvas.getContext("2d");
    const doughnutChart = new Chart(doughnutChartCtx, {
      type: "doughnut",
      data: data,
      options: options,
    });
  
    // 텍스트와 퍼센트 값을 추가할 요소 생성
    const chartContainer = document.querySelector(".chart-container");
    const chartTextContainer = document.createElement("div");
    chartTextContainer.classList.add("chart-text-container");
    
    const chartText = document.createElement("div");
    chartText.textContent = "내 데이터 기여도";
    chartText.classList.add("chart-text");
    
    const chartPercentText = document.createElement("div");
    chartPercentText.textContent = `${userpercent}%`;
    chartPercentText.classList.add("chart-percent");
    
    chartTextContainer.appendChild(chartText);
    chartTextContainer.appendChild(chartPercentText);
    chartContainer.appendChild(chartTextContainer);
  }


  // 데이터 박스 클릭시 다음 페이지 넘어가는 코드
  clickDataBox(time, dist, coin, markers, markerStr, coords){
    console.log("데이터 박스 클릭 : ", time, dist, coin, markers, markerStr, coords);
    const page01 = document.querySelector(".mydata-page-01");
    const page02 = document.querySelector(".mydata-page-02");

    console.log(page02);
    console.log(page02.classList)
   
    page02.classList.toggle("unactive", false);

    page01.classList.toggle("unactive", true);
    

    // 파라미터 속성 : data 유효성(true/false), 시간, 거리, 코인
    this.naviResult.createResultSummaryBoard(true, time, dist, coin);
  
    // 마커 내용 나오는 것
    this.naviResult.createResultContentBoard(markers);
    const markString = markerStr.split("|");
    this.naviResult.setmarkString(markString);
    this.naviResult.writeTextinStateDiv();

    //맵 그리기
    this.createDataMap(coords, markers);
  }

  // 데이터 결과 맵 만들기
  createDataMap(coords, markers){
    //길 그리기
    this.drawtool.drawPath(coords);

    //마커 그리기
    markers.forEach(ele => {
      let mark_lat = ele[0];
      let mark_lon = ele[1];

      this.maptool.createMark(this.map, mark_lat, mark_lon);
    });

    //map 중심
    const start_lat = coords[0][0];
    const start_lon = coords[0][1];
    this.maptool.setMapCenter(this.map, start_lat, start_lon);
  }
}


window.onload = () => {
  new MyData();
}