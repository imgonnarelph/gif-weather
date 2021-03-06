
function getLocation() {
  navigator.geolocation.getCurrentPosition(weather, function(error){ console.log(error) });
}

function weather(position) {
  var apiKey = '62973e50ea4774b9d61cbd226eac21f5';
  var url = 'https://api.forecast.io/forecast/';
  var data;
  // console.log(position);
  $.getJSON(url + apiKey + "/" + position.coords.latitude + "," + position.coords.longitude + "?callback=?", function(data) {

    $('.js-current-temp').html(Math.floor(data.currently.temperature) + '&#176;');
    $('.js-current-icon').html(data.currently.summary);

    gif(data.currently.icon)
    city(position.coords.latitude + "," + position.coords.longitude)

  });
}

function city(latlng) {
  var apiKey = '&key=AIzaSyCiFoZaSWCX5KwcCDbnmmrQv-9NxipZb6c';
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

  $.getJSON(url + latlng + apiKey, function(results) {
    console.log(results)
    $('.js-current-location').html(results.results[3].address_components[1].long_name);
  });
}

function gif(status) {
  var apiKey = '&api_key=dc6zaTOxFJmzC';
  var url = 'https://api.giphy.com/v1/gifs/search?q=';
  var query = status;
  $.getJSON(url + query + apiKey, function(data) {
    // console.log(data);
    var randomIndex = Math.floor(Math.random() * data.data.length);
    $('body').css('background-image', 'url(' + data.data[randomIndex].images.downsized_large.url + ')');
  });
}

getLocation();
