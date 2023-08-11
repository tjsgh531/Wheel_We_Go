// DOM 요소들 가져오기
const menuTrigger = document.querySelector('.menu-trigger');
const hamContent = document.querySelector('.ham-content');
const hamMenuBack = document.querySelector('.ham-menu-back');
const xTrigger = document.querySelector('.x-trigger');

// 초기에는 메뉴와 검은 배경을 숨김 처리
hamContent.style.transform = 'translateX(100%)';
hamMenuBack.style.opacity = '0';
hamMenuBack.style.display = 'none';

// 햄버거 버튼 클릭 시 메뉴 슬라이드로 나타나고 검은 배경 활성화
menuTrigger.addEventListener('click', () => {
    hamContent.style.transform = 'translateX(0)';
    hamMenuBack.style.opacity = '0.2';
    hamMenuBack.style.display = 'block';
});

// "x" 버튼 클릭 시 메뉴 슬라이드로 사라지고 검은 배경 비활성화
xTrigger.addEventListener('click', () => {
    hamContent.style.transform = 'translateX(100%)';
    hamMenuBack.style.opacity = '0';
    hamMenuBack.style.display = 'none';
});


// 박스클릭시 search page로 이동
document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.querySelector('.searchBox');

    searchBox.addEventListener('click', function() {
        // 클릭 시 검색 페이지로 이동
        window.location.href = 'http://127.0.0.1:8000/search/';
    });
});