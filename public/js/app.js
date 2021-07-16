
const weather = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weather.addEventListener('submit',(e) =>{
    e.preventDefault()
    const place = search.value
    
    messageOne.textContent = "Loading"

fetch('/weather?address=' + place ).then((response) =>
{
    response.json().then( (data) =>
    {
    if(data.error)
    {
        console.log('Address should not be null')
        messageOne.textContent = "Error Address should not be null"
    }
    else{
   
        console.log(data.location)
        console.log(data.forecast)
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
    }
})
})

})