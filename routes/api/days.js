var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../../models')
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Place = models.Place;
var Day = models.Day;

router.get('/api/days', function(req,res,next){
  Day.findAll({})
  .then(function(days){
    res.send(days)
  })
})

router.get('/api/days/:id', function(req,res,next){
	Day.findOne({
		where: {
			number: +req.params.id
		},
		include: [
			Hotel,
			{association:Day.restaurantAssociation},
			{association:Day.activityAssociation}
			// model: Restaurant,
			// model: Activity
		]
		
	})
	.then(function(foundDay){
		console.log("found day ", foundDay)
		res.send(foundDay)
	})
})

router.get('/api/days/:id/hotels', function(req,res,next){

})

router.get('/api/days/:id/restaurants', function(req,res,next){

})

router.get('/api/days/:id/activities', function(req,res,next){

})

router.delete('/api/days', function(req,res,next){

})

router.post('/api/days', function(req,res,next){
	Day.create({number: +req.body.number})
	.then(function(data){
		res.sendStatus(201)
	})
})


module.exports = router;