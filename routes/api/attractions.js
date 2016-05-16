var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../../models')
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Place = models.Place;

// OR, with ES6, you can do:
//
//   var {Hotel, Restaurant, Activity, Place} = models;
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

router.get('/api/hotels', function (req, res, next) {
  Hotel.findAll({include: Place})
  .then(function(hotels){
    res.send(hotels)
  })
});

router.get('/api/restaurants', function (req, res, next) {
  Restaurant.findAll({include: Place})
  .then(function(restaurants){
    res.send(restaurants)
  })
});


router.get('/api/activities', function (req, res, next) {
  Activity.findAll({include: Place})
  .then(function(activities){
    res.send(activities)
  })
});


module.exports = router;
