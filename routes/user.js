const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

router.get('/:id', function(req, res, next){
    Page.findAll({
        where: {
          authorId: req.params.id
        }
      }).then(function(data){res.render('author_pages',{pages: data})}).catch(next);
});

router.get('/', function(req, res, next){
    User.findAll({})
    .then(function(data){
        res.render('authors', {users:data}); 
    })
});



module.exports = router;