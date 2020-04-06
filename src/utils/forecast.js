const request=require('request');

const forecast = (lat,long,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&APPID=419ec6f9ac4ca98cf85a37c7533dfec2&units=metric';
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect weather service',undefined);
        }else if( response.body.cod==='400')
        {
            callback('not valid',undefined);
        }
        else{
            callback(undefined,"There is "+response.body.weather[0].description+'. It is currently '+response.body.main.temp+" degree celcius.  There is "+response.body.main.humidity+"% humidity.");
        }
    }) 
}

module.exports = forecast;