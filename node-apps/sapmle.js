const fs = require("fs");
console.log("start");
// fs.writeFile("hello.txt", "Hello World", function() {
//     console.log("done");
// });

fs.readFile("./hello.txt", "utf8",function(err, data){
    console.log(data);
});
console.log("end");
