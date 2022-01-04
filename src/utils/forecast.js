const request = require('request')

const forecast = (lat,long,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=b5ec22874a337b024364e906212fbc2b&query="+lat+","+long
    request({ url, json:true }, (error,{ body }) => {   //using destructuring to only get the body property
        if(error){
            callback("Cannot access the service")
        }
        else if(body.error){
            callback("Probably something wrong with the request")
        }
        else{
            callback(undefined,{
                location: body.location.name,
                temperature: body.current.temperature,
                feelsLikeTemp: body.current.feelslike
            })
        }
    })
}

module.exports = forecast