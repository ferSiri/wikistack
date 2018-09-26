const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 



router.get('/:userId', function(req, res, next) {
    var userPromise = User.findById(req.params.userId);
    var pagesPromise = Page.findAll({
      where: {
        authorId: req.params.userId
      }
    });
    Promise.all([
      userPromise, 
      pagesPromise
    ])
    .then(function(values) {
      var user = values[0];
      var pages = values[1];
      res.render('author_pages', { user: user, pages: pages });
    })
    .catch(next);
  });



router.get('/', function(req, res, next){
    User.findAll({})
    .then(function(data){
        res.render('authors', {users:data}); 
    })
});



module.exports = router;