const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Vijayaprabhu'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Vijayaprabhu'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        message:'Some help text',
        name:'Vijayaprabhu'
    })
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address must be provided'
        })
    }
    geocode(req.query.address,(error,{lat,long,location}={})=>{ //destructuring
        if(error){
            return res.send({
                error            
            })
        }
        forecast(lat,long, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            // console.log(location)
            // console.log(forecastData)
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        errormessage:'Help Article not found',
        name:'Vijayaprabhu'
    })
})

app.get('/*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        errormessage:'Not found',
        name:'Vijayaprabhu'
    })
})




app.listen(3000,()=>{
    console.log('Server is up and runnning')
})