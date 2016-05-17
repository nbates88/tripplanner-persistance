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
		]	
	})
	.then(function(foundDay){
		res.json(foundDay)
	})
})

router.post('/api/days/:id/hotel', function(req,res,next){
	Day.findOrCreate({
		where: {
			number: +req.params.id
		}
	})
	.then(function(returnedDay){
		returnedDay[0].updateAttributes({
			hotelId: req.body.id
		})
	})
	// .then(function(returnedDay){
	// 		Day.findOne({
	// 		where: {
	// 			number: +req.params.id
	// 		}
	// 	})
	// 	.then(function(updatedDay){
	// 		console.log("updated day", updatedDay)
	// 		res.json(updatedDay)
	// 	})
	// })
})

router.post('/api/days/:id/restaurant', function(req,res,next){
	Day.findOrCreate({
		where: {
			number: +req.params.id
		},
		include: [
			{association: Day.restaurantAssociation}
		]
	})
	.then(function(returnedDay){
		returnedDay[0].addRestaurant(req.body.id)
	})
})

router.post('/api/days/:id/activity', function(req,res,next){
	Day.findOrCreate({
		where: {
			number: +req.params.id
		},
		include: [
			{association: Day.activityAssociation}
		]
	})
	.then(function(returnedDay){
		returnedDay[0].addActivity(req.body.id)
	})
})

router.delete('/api/days/:id', function(req,res,next){

})

router.post('/api/days', function(req,res,next){
	Day.create({number: +req.body.number})
	.then(function(data){
		res.sendStatus(201)
	})
})


module.exports = router;