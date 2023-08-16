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
    
// 업데이트할 유저의 식별자와 업데이트할 데이터를 정의
const userId = 1;  // 업데이트할 유저의 식별자
const updatedUserData = {
    username: 'newUsername',
    email: 'newEmail@example.com',
    // ...
};

// 유저 정보 업데이트 요청 보내기
api.updateUser(userId, updatedUserData)
    .then(responseData => {
        console.log('업데이트 성공:', responseData);
        // 업데이트 성공 후 처리할 내용
    })
    .catch(error => {
        console.error('업데이트 실패:', error);
        // 업데이트 실패 시 처리할 내용
    });