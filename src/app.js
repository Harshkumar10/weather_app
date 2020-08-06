const path=require('path');
const express = require('express');
const hbs = require('hbs');
//console.log(__dirname);
//console.log(path.join(__dirname,'../public'));
const app = express();
const port=process.env.PORT||3000
const publicDirectoryPath=path.join(__dirname,'../public');
//customize the name of view->templates
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
//Using hbs as the default view engine requires just one line 
//of code in your app setup. This will render .hbs files when res.render is called.
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
//set hup handle bars
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve 
app.use(express.static(publicDirectoryPath));

//res.render is used to get .hbs file
//hbs is used for dynamic web page
app.get('',(req,res)=>{
   // res.render('index');
    //automaticallicay calls index.hbs 
    res.render('index',{
        title:'Weather',
        name:'Harsh kumar'
    })
})

app.get('/about',(req,res)=>{
    //res.send('this is project about waetther app');
    res.render('about',{
        title:'About Me',
        name:'Harsh Kumar'
    })
});
app.get('/help',(req,res)=>{
    //res.send('this is project about waetther app');
    res.render('help',{
        helpText:'This is some help full text',
        title:'Help',
        name:'Harsh Kumar'
    })
});

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'No address proided',
        })
    }
    //console.log(req.query.address);
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error});
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error});
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    
});

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'you must provide search'
            
        })
    }
    //console.log(req.query.search)
    res.send({
        products:[]
    })
})
//* is use for the rest of ur
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'harsh kumar',
        errorMessage:'Help doc not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'harsh',
        errorMessage:'Page not found'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port '+port);
});