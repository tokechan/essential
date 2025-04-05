const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // console.log(req);
    res.send("<h1>Hello World!!!!!!</h1>" + "<h2>Hello hiratsuka!!!</h2>");
});

app.get("/about", function(req, res){
    res.send({
        name: "hiratsuka",
        age: 20,
        email: "hiratsuka@gmail.com"
    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


