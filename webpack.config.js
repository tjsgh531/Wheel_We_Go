const path = require('path');
module.exports = {
    mode: "development",
    entry: {
        base: "./js/base.js",
        service: "./js/service.js",
        mydata: "./js/mydata.js",
        shopping: "./js/shopping.js",
        mypage: "./js/mypage.js",
        firstpage: "./js/first.js",
    },
    output: {
        path: path.resolve(__dirname, "static", "js"),
        filename: '[name].js'
    }
}

