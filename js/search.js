class Search {
    constructor() {
        this.getData();

        this.searchLog = document.querySelector('.search_log');
        this.logdata.forEach(e => {
            const newSearchBlock = this.createSearchBlock(e.search_word, e.date);
            this.searchLog.appendChild(newSearchBlock);
        });
    }

    getData() {
        this.logdata = [
            {
                "search_word": "진주역(고속철도)",
                "date": "08.02"
            },
            {
                "search_word": "홈리스 타코",
                "date": "08.03"
            },
            {
                "search_word": "월포 해수욕장",
                "date": "08.06"
            }
        ];
    }

    createSearchBlock(word, date) {
        const searchBlock = document.createElement('div');
        searchBlock.classList.add("searchblock");

        const wordBlock = document.createElement('div');
        wordBlock.classList.add("word-block");
        wordBlock.textContent = word;

        const dateBlock = document.createElement('div');
        dateBlock.classList.add("date-block");
        dateBlock.textContent = date;

        const cancle = document.createElement('div');
        cancle.classList.add("cancle");
        cancle.textContent = "Delete";

        searchBlock.appendChild(wordBlock);
        searchBlock.appendChild(dateBlock);
        searchBlock.appendChild(cancle);

        return searchBlock;
    }
}

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    const cancelButton = document.querySelector('.cancleBtn'); // 취소 버튼
    const searchBox = document.querySelector('.searchBox'); // 검색 입력 필드

    cancelButton.addEventListener('click', () => {
        searchBox.value = ''; // 검색 입력 필드 내용 초기화
    });
});


window.onload = () => {
    new Search();
};
