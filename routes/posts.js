var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

router.use(bodyParser.urlencoded({extended: true}));
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}));

//GET - get all posts
//POST - create a post
router.route('/')
    .get(function(req, res, next){
        mongoose.model('Post').find({}, function(err, posts){
          if(err) { return console.error(err); }
          else {
              res.format({
                  json: function(){
                      res.json(posts)
                  }
              })
          }
        })
    })
    .post(function(req, res){
        var title = req.body.title;
        var content = req.body.content;
        mongoose.model('Post').create({
            title : title,
            content : content
        }, function(err, post){
            if(err) { res.send('error! ' + err); }
            else {
                console.log('NEW POST: ' + post);
                res.format({
                    json: function(){
                        res.json(post);
                    }
                })
            }
        })
    });
//GET - retreive a post
//PUT - update a post
router.route('/:id')
    .get(function(req, res){
        mongoose.model('Post').findById(req.params.id, function(err, post){
           if(err) { res.send(err); }
           else {
               res.json(post);
           }
        });
    })
    .put(function(req, res){
        var title = req.body.title;
        var content = req.body.content;
        mongoose.model('Post').findByIdAndUpdate(req.params.id, {title: title, content: content}, function(err, doc){
          if(err) {
            res.status(500).json(err);
          } else {
            res.json(doc);
          }
        });
    })
    .delete(function(req, res){
      mongoose.model('Post').findByIdAndRemove(req.params.id, function(err, doc){
        if(err){
          res.status(500).json(err);
        } else {
          res.json({message: "deleted success"});
        }
      });
    });

module.exports = router;