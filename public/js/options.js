  var attractions = {};
  function makeOptions(attractionType) {
    var select = $(`#${attractionType}-choices`)

    attractions[attractionType].forEach(function(attraction) {
      var option = $(`<option value="${attraction.id}">${attraction.name}</option>`)[0]
      option.attraction = attraction
      option.attraction.place.type = attractionType
      select.append(option)
    })
  }

$(document).ready(function(){

    $.ajax({
        // The URL for the request
        url: "/api/hotels",
     
        // Whether this is a POST or GET request
        type: "GET",
     
        // The type of data we expect back
        //dataType : "json",
        success: function(hotels){
            attractions['hotel'] = hotels;
            makeOptions('hotel');
        },
        error: function(err){
            console.log("errrrror", err)
        }
    })

  $.ajax({
 
        // The URL for the request
        url: "/api/restaurants",
     
        // Whether this is a POST or GET request
        type: "GET",
     
        // The type of data we expect back
        //dataType : "json",
        success: function(restaurants){
            attractions['restaurant'] = restaurants;
            makeOptions('restaurant');
        },
        error: function(err){
            console.log("errrrror", err)
        }
    })


    $.ajax({
 
        // The URL for the request
        url: "/api/activities",
     
        // Whether this is a POST or GET request
        type: "GET",
     
        // The type of data we expect back
        //dataType : "json",
        success: function(activities){
            attractions['activity'] = activities;
            makeOptions('activity');
        },
        error: function(err){
            console.log("errrrror", err)
        }
    })

   

    // $.ajax({url:'/api/days', 
    //         type: 'GET',
    //         success: function (data) {console.log('GET response data', data)},
    //         error: function(err) {console.error.bind(console)}
    //     });
    // // should log an empty array
    // $.ajax({url:'/api/days', 
    //     type: 'POST',
    //     success: function (data) {console.log('POST response data', data)},
    //     error: function (err) {console.error.bind(console)} 
    // });
    // // should log a new day
    // $.ajax({url:'/api/days', 
    //     success: function (data) {console.log('GET response data', data)},
    //     error: function(err){console.error.bind(console) }
    // });
    // should now log an array with the new day in it

})


