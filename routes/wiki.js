const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

function generateUrlTitle (title) {
    if (title) {
      return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      return Math.random().toString(36).substring(2, 7);
    }
  }

router.post('/*', function(req, res, next) {
    User.findOrCreate({
        where: {
          name: req.body.name,
          email: req.body.email
        }
      })
      .then(function (values) {
        var user = values[0];
        var page = Page.build({
          title: req.body.title,
          content: req.body.content
        });
        return page.save().then(function (page) {
          return page.setAuthor(user);
        });
      })
      .then(function (page) {
        res.redirect('/wiki/'+page.urlTitle);
      })
      .catch(next);
});

router.get('/add', function(req, res, next){
    res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next){
    Page.findOne({
        where: {
          urlTitle: req.params.urlTitle
        }
      }).then(function(data){res.render('wikipage',{data: data})}).catch(next);
});

router.get('/', function(req, res, next){
    Page.findAll({})
    .then(function(data){
        res.render('index', {data:data}); 
    })
});



module.exports = router;