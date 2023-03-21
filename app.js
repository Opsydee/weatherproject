const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
        });
        app.post("/", function(req, res){
    
             const querry = req.body.cityName;
    const apiKey = "26d19fa8c96ef3cebda493090735dbe4";
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ querry +"&appid="+ apiKey +"&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData =JSON.parse(data)
               const temp = weatherData.main.temp
            console.log(temp);
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL ="http://openweathermap.org/img/wn/"+ icon +"@2x.png"

            res.write("<p>The weather is currently" + weatherDescription + "</p>");
            res.write("The temperature in "+ querry +" is " + temp + "degree celsius.");
            res.write("<img src=" + imageURL +">");
            res.send() 
    })
    
}) 
        })
      
app.listen(30000, function(){
    console.log("server is running on port 30000");
})