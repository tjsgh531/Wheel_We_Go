
import { RestApiData } from "./extendsTools/restApiData.js";



class MyPage {

    constructor() {
        this.restApiTool = new RestApiData();
        this.username = this.getCurrentLoginUser();

        this.start();
    }

    getCurrentLoginUser() {
        let userinfo = document.getElementById('user-info');
        let user = userinfo.dataset.username;
        return user;
      }
    
    async start() {
        const userCoin = await this.getUserCoin();
        this.updateCoinInfo(userCoin);
        this.sideBar();
    }

    async getUserCoin() {
        const data = await this.restApiTool.getUserData();
        const userRecord = data.find(record => record.user_id === this.username);
        const userCoin = userRecord ? userRecord.user_coin : 0;
        return userCoin;
    }

    updateCoinInfo(userCoin) {
        const coinPriceElement = document.querySelector('.price'); 
        coinPriceElement.textContent = `${userCoin} `;
    }
    sideBar() {
        const sideBarBtn = document.querySelector('.sideBarBtn');
        const sideBar = document.querySelector('.sideBar');
        const sideBar_cancle = document.querySelector('.sideBar_cancle')

        // 사이드 바 나타내기
        sideBarBtn.addEventListener("click", () => {
            sideBar.classList.toggle('unactive', false);
        });

        sideBar_cancle.addEventListener('click', () => {
            sideBar.classList.toggle('unactive', true);
        });
    }
}

window.onload = () => {
    new MyPage();
}