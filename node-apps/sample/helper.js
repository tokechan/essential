const fs = require("fs");

const person = {
    name: "Mike",
    age: 20
};

const read = function() {
    fs.readFile("./hello.json", "utf8",function(err, data){
        const person = JSON.parse(data);
        console.log(person.name);
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
