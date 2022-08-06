const express = require('express')
const axios = require('axios')

const app = express();

app.get('/data', async function (req,res){
    const data = await axios.get("https://workshop-backend-t22.herokuapp.com")
    console.log(data.data)
    res.send(data.data)
})

    const songs = [
        {
            id: 1,
            title: 'Never Gonna Give You Up',
            artist: 'Rick Astley',
        },
        {
            id: 2,
            title: 'First Times',
            artist: 'Ed Sheeran',
        },
        {
            id: 3,
            title: 'Into The Unknown',
            artist: 'Unknown',
        },
        {
            id: 4,
            title: 'Perfect',
            artist: 'Ed Sheeran',
        },
        {
            id: 5,
            title: 'Pay Phone',
            artist: 'Maroon 5',
        },
    ]

//MIDDLEWARE
app.use((res,req,next) => {
    console.log(new Date().toJSON())
    next()
})

app.use((req,res,next) => {
    req.songs = songs
    next()
})

app.use(express.json())

//CONTROLLERS
const {getTitles} = require('./Controllers/Titles')
const {getArtists} = require('./Controllers/Artists');
const { Router } = require('express');

//ROUTES
app.get('/', (req,res) => {
    res.json(songs)
})

app.get('/titles', getTitles)
app.get('/artists', getArtists)

app.get('/songs', (req, res) =>{
    console.log(req.query)
    const list = songs.filter((ob) => {
        return ob.artist == req.query.artist
    })
    res.json(list)
})

app.get('/songs/:id', (req, res) => {
    console.log(req.params)
    const list = songs.filter((s) =>{
        return s.id == req.params.id
    })
    res.json(list)
})

app.post('/song', (req,res) => {
    console.log(req.body)
    songs.push(req.body)
    res.sendStatus(200)
})

app.patch('/song/:id', (req,res) =>{
    console.log(req.body)
    for(s of songs){
        if(s.id == req.params.id){
            console.log(s);
            s.artist = req.body.artist
            break;
        }
    }
    res.sendStatus(200)
})

app.delete('/song/:id', (req,res) =>{
    for(s of songs){
        if(s.id == req.params.id){
            songs.splice(songs.indexOf(s),1)
            break;
        }
    }
    res.sendStatus(200)
})
app.listen(3000, () => {
    console.log('Listening to port 3000')
})