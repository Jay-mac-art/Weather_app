const path = require('path')
const request = require('request')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./foreCast')
const geocode = require('./geoCode')
const port = process.env.PORT || 3000
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const tempPath = path.join(__dirname, '../templates/views')
const partPath = path.join(__dirname, '../templates/partials')
app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', tempPath)
hbs.registerPartials(partPath)
app.get('', (req, res) => {
    res.render('index', {
        name: 'Jayant',
        lastName: 'Bhati'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location = 'India' } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help', (req, res) => {
    res.render('help')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('*', (req, res) => {
    res.render('error')
})


app.listen(port, () => {
    console.log('Server is up on port ', port)
    
})