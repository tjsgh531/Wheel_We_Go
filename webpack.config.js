const path = require('path');
module.exports = {
    mode:"development",
    entry:{
        mapbase :"./js/mapbase.js",
        navi : "./js/navi.js",
        search_test : "./js/search_test"
    },
    output:{
        path:path.resolve(__dirname, "static", "js"),
        filename:'[name].js'
    }
}