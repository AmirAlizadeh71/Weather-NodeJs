const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
    //define path for express config

const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
    //setup handlebars engine

app.set('views', viewsPath)
    //set location for express config --default='views'

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))
    //setup static directory to serve

// root route
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'amir',
    })
})

// weather route
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide the address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { // destructring object ->es6
        // after geocoding process complete, time to execute here
        // callbacks function manually have to argument -> error & data
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                title: 'weather',
                name: 'amir',
                location,
                forecast
            })
        })
    })
})

// help route
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'amir',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'help article not found',
        name: 'amir',
    })
})

// about route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'amir',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'amir',
    })
})

app.listen(3000, () => {
    console.log('server is up on the port 3000')
})