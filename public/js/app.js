const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

 

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()   //stops tha console text from vanishing
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''

    fetch("/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = 'Your location '+data.location + ". A short description -> " + data.description
            messageTwo.textContent = 'Temperature right now -> '+data.temperature + " and it feels like " + data.feelsLikeTemp + ". Humidity is " + data.humidity + " and wind speed is -> " + data.wind_speed 
        }
    })
})
})