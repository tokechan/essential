const fs = require("fs");

const person = {
    name: "Mike",
    age: 20
};

const read = function() {
    fs.readFile("./hello.txt", "utf8",function(err, data){
        console.log(data);
    });
};

const write = function () {
    fs.writeFile("hello.json",JSON.stringify(person), function() {
        console.log("done");
    });
};

module.exports = { 
    read: read,
    write: write
};
