
const request = require('request') 
const foreCast = (latitute , longitute , callback) =>
{
const url = 'http://api.weatherstack.com/current?access_key=2245c45103d4aff7bb04d45561eb74c9&query='+latitute+','+longitute+''
request ({url ,json : true},(error , {body}) => {

    if(error )
    {
       callback("unable to  connect",undefined)
    }
    else if(body.error)
    {
        callback("unable to find loacation",undefined)
    }
    
    
else {
    callback(undefined, 'Weather is '+ body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' It feels like ' + body.current.feelslike+ ' degrees')
}
}
)

}

 

module.exports = foreCast