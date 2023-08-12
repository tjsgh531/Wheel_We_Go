const path = require('path');
module.exports = {
    mode:"development",
    entry:{
        app :"./js/app.js", 
        navi :"./js/navi.js"
    },
    output:{
        path:path.resolve(__dirname, "static", "js"),
        filename:'[name].js'
    }
}