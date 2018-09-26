const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const models = require('./models');


const app= express();

app.use(morgan('tiny'));

app.use(express.static(__dirname+ '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen('3000', function(){console.log('listening at 3000')});
    })
.catch(console.error);


nunjucks.configure('views', { noCache: true });

app.set('view engine', 'html');

app.engine('html', nunjucks.render);

app.use('/', routes);

nunjucks.render('index.html');