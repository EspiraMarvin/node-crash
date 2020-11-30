const express = require('express');
// morgan - third party middleware
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app instance
const app = express();

// connect to mongodb
const dbURL = "mongodb+srv://marvin:test1234@cluster0.3zn9t.mongodb.net/node-crash?retryWrites=true&w=majority";
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));



// middleware and static files
app.use(express.static('public'));
// middleware 3rd party
app.use(morgan('dev'));
// takes all url encoded data and passes into an object we can use on the request object
app.use(express.urlencoded( {extended: true } ));



// register view engine
app.set('view engine', 'ejs');
// specify the folder where your views are example myviews or sources
// -- views folder is the default name hence no need to specify
// app.set('views', 'views');

app.get('/', (req, res) => {
    res.redirect('/blogs')
});


app.get('/about', (req, res) => {
    res.render('about',  { title: 'About' });
});


// Redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// blog routes
app.use('/blogs',blogRoutes);

// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not Found' });
});
