const request = require('request')

const forecast = (lat,long,callback)=>{
    const url= 'http://api.weatherstack.com/current?access_key=80ce07f0b9eef00ca9eb739a7cf18bf2&query='+lat+','+long+'&units=f'
    request({ url, json:true },(error,{body} )=>{

        if(error){
            callback('Unable to connect to weather services',undefined)
        }else if(body.error){
            callback('unable to find the location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' out.')
        }
        
    })
}

module.exports=forecast