const express = require('express')
const methodOverride = require("method-override");
const pokemon = require('./models/pokemon');


const app = express()

const port = 3000;

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))

//Index
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { data: pokemon })
})



//New
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs')
})


//Edit
app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit.ejs',
        {
            data: pokemon[req.params.id],
            index: req.params.id,


        })
})

// update
app.put('pokemon/:id', (req, res) => {
    res.render('new.ejs', { data: pokemon[req.params.id] })
    res.redirect('/pokemon')
})

//Create
app.post('/pokemon', (req, res) => {
    pokemon.unshift(req.body)
    res.redirect('/pokemon')
    // console.log(req.body)
})




//Destroy
app.delete("/pokemon/:id", (req, res) => {
    pokemon.splice(req.params.id, 1) //remove the item from the array 1 thing from array
    res.redirect("/pokemon") //redirect back to index route
})


//Show
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', { data: pokemon[req.params.id] });
})

app.listen(port, () => {
    // console.log('hello', port)
})