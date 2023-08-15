const path = require('path');
module.exports = {
    mode:"development",
    entry:{
        base :"./js/base.js",
        service: "./js/service.js",
    },
    output:{
        path:path.resolve(__dirname, "static", "js"),
        filename:'[name].js'
    }
}