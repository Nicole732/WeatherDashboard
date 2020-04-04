$(document).ready(function () {
  var APIKey = "68872cd0166b535d960a63dbd5cd369e";
  var currentDate = moment().format("dddd, MMMM Do YYYY");
  var cityDivGrab = $("#citieslisting");

  var cityName = "";

  function cityWeather(cityName) {
    console.log(cityName);
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      APIKey;
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // cityDivGrab.append($('<div class="card">'));
      // cityDivGrab.append($('<div class="card-body">'));
      var card = $('<div class="card">');
      var cardBody = $('<div class="card-body">');

      cityDivGrab.prepend(card); //put as a parent in HTML
      card.append(cardBody);

      var farTemperature = (response.main.temp_min - 273.15) * 1.8 + 32;

      // if (farTemperature >=  cloud?) then icon 1 else icon 2
      var iconcode = response.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

      cardBody.append(
        $(
          '<h5 class="card-title">' +
            response.name +
            " (" +
            currentDate +
            ") " +
            "<img src='" +
            iconurl +
            "'>" +
            "</h5>"
        )
      );
      cardBody.append(
        $(
          '<p class="card-text">' +
            "Temperature: " +
            farTemperature.toFixed(0) +
            "</p>"
        )
      );
      cardBody.append(
        $(
          '<p class="card-text">' +
            "Humidity: " +
            response.main.humidity +
            "</p>"
        )
      );
      cardBody.append(
        $(
          '<p class="card-text">' +
            "Wind Speed: " +
            response.wind.speed +
            "</p>"
        )
      );
      //displayUvIndex(response.coord.lat, response.coord.lon);
    });
  }

  // grab the city name on click of search button
  $("#btnclick").on("click", function (event) {
    event.preventDefault();

    var cityN = $("#cityInput").val().trim();
    // forces user to enter a city name
    if (cityN === "") {
      return;
    }
    console.log(cityN);
    cityWeather(cityN);
  });
});
