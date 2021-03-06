const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000
//define all paths
const staticPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialPaths = path.join(__dirname,'../templates/partials')

//set up handle bars(dynamic templating) and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPaths)

//set up path for static files
app.use(express.static(staticPath))

app.get('/',(req,res)=>{
    res.render('index',{
        title: "Weather",
        name: "fsoc"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About page',
        name: 'fsoc'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: "Welcome to fsociety",
        title: "Help",
        name: "fsoc"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide the address to check the weather'
        })
    }
    geocode(req.query.address,(error, { latitude , longitude , location } = {} )=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, { temperature , feelsLikeTemp, humidity, wind_speed, description } = {})=>{
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                latitude: latitude,
                longitude: longitude,
                temperature: temperature,
                feelsLikeTemp: feelsLikeTemp,
                location: location,
                address: req.query.address,
                humidity: humidity,
                wind_speed: wind_speed,
                description: description,
            })

        })

        })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error404',{
        title: "404",
        name : "fsoc",
        errorMsg : "Help article not found"
    })
})

//Express matches all routes one by one
//if the requested url does not match any route , it will processed by the wildcard(everything is a match) route.
//Hence it should always be last.
app.get('*',(req,res)=>{
    res.render('error404',{
        title: "404",
        name : "fsoc",
        errorMsg: "Page not found"
    })
})

app.listen(port, () => {
    console.log("Server is up on port "+ port)
})