import { RestApiData } from "./restApiData.js";


class SectionManager {
  constructor() {
    this.sections = document.querySelectorAll('.section');
    this.nextButtons = document.querySelectorAll('.next-button');
    this.prevButtons = document.querySelectorAll('.prev-button');
    this.currentSectionIndex = 0;

    this.init();
  }

  init() {
    this.nextButtons.forEach((button, index) => {
      button.addEventListener('click', () => this.moveToNextSection(index));
    });

    this.prevButtons.forEach((button, index) => {
      button.addEventListener('click', () => this.moveToPrevSection(index));
    });

    this.updateButtonVisibility();
  }

  moveToNextSection(index) {
    this.sections[this.currentSectionIndex].classList.remove('active');
    this.currentSectionIndex = index + 1;
    this.sections[this.currentSectionIndex].classList.add('active');
    this.updateButtonVisibility();
  }

  moveToPrevSection(index) {
    this.sections[this.currentSectionIndex].classList.remove('active');
    this.currentSectionIndex = index;
    this.sections[this.currentSectionIndex].classList.add('active');
    this.updateButtonVisibility();
  }

  updateButtonVisibility() {
    this.prevButtons.forEach(button => {
      button.style.display = this.currentSectionIndex === 0 ? 'none' : 'inline-block';
    });

    this.nextButtons.forEach(button => {
      button.style.display = this.currentSectionIndex === this.sections.length - 1 ? 'none' : 'inline-block';
    });
  }
}

// Initialize the SectionManager
const sectionManager = new SectionManager();


// 데이터불러오기
const api = new RestApiData();
    
// 유저 정보 받아오기 
const userInfo = document.getElementById('user-info')
const user= userInfo.dataset.usernmae

// 유저의 모든 레코드 가져오기
api.getRecordData().then(data => {
  // 유저 데이터만 필터링
  const userRecords = data.filter(data=>data.user_id===user);
  const recordsList = document.querySelector('.records-list');  
  userRecords.forEach(record => {
    const li = document.createElement('li');
    li.textContent = `일시: ${record.record_date}, 이동시간: ${record.TIME}, 거리: ${record.km}, 코인: ${record.coin}`;
    recordsList.appendChild(li);
  });
})

import { RestApiData } from "./extendsTools/restApiData.js";
import { NaviResult } from "./extendsTools/naviResult.js";
class MyData{
  //흐름
  constructor(){

    this.restApiTool = new RestApiData();
    this.naviResultTool = new NaviResult();

    this.getUserRecordsData();

    this.createUserRecordsData();
  }

  //
  getUserRecordsData(){
    this.restApiTool.getRecordData().then(

    )
  }

  //
  createUserRecordsData(){
    const data ;
    const 

    data.addEventListener("click", ()=>{

        this.naviResultTool.createResultBoard();
    })
  }

  createCircleChart(){

  }


}

window.onload = ()=>{
  new MyData();
}