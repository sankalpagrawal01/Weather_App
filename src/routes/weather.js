const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config()

router.get('/', function(req, res) {
    res.render('weather', {
        city:null,
        des: null,
        icon: null,
        temp: null
    });
})

router.post("/", async(req, res) => {

    const city = req.body.cityName;
    const apiKey = "ad5fc35b66c4ba8308f9191b955607a8";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;
    
    
    try {
        await fetch(url)
        .then(res => res.json())
        .then(weatherData => {
            if (weatherData.message === 'city not found') {
                res.render('weather', {
                    city: weatherData.message,
                    des: numm,
                    icon: null,
                    temp: null
            })
        } else {
            const city = weatherData.name;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const temp = weatherData.main.temp;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            res.render('weather', {
                city, des, icon, temp
            });
         }
      });

    } catch (err) {
        res.render('weather', {
            city: 'Error! Try Again',
            des: null,
            icon: null,
            temp: null
        })
    } 

})


  module.exports = router;