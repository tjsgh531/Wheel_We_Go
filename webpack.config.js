const path = require('path');
module.exports = {
    mode:"development",
    entry:{
        base :"./js/base.js",
        navi : "./js/navi.js",
        search : "./js/search"
    },
    output:{
        path:path.resolve(__dirname, "static", "js"),
        filename:'[name].js'
    }
}