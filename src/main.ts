require("./main.css");
require("./nav.css");
require("./index.html");
require("./app");

var a = async () => {
   await console.log(`Environment is ${process.env.NODE_ENV}`);
}

a();