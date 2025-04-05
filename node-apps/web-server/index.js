const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({extended: false}));
//Publicフォルダを静的ファイルとして読み込む
app.use(express.static(path.join(__dirname, "public")))

// app.get('/', (req, res) => {
//     // console.log(req);
//     res.send("<h1>Hello World!!!!!!</h1>" + "<h2>Hello hiratsuka!!!</h2>");
// });

app.post("/api/v1/quiz", function(req, res){
    const answer = req.body.answer;
    if (answer === "2" ){
        // res.send("<h1>正解です!!</h1>");
        res.redirect("/correct.html");
    } else {
        // res.send("<h1>不正解です!!</h1>");
        res.redirect("/wrong.html");
    }
});


// app.get("/about", function(req, res){
//     res.send({
//         name: "hiratsuka",
//         age: 20,
//         email: "hiratsuka@gmail.com"
//     });
// });

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


