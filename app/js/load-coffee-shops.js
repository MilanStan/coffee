//Global variables

var caffees;
var output = document.getElementById("show-data");


$(document).ready(function () {
    geoFindMe();

    $("#dugme1").click(function () {
        sortCoffees("Distance");
    });
    $("#dugme2").click(function () {
        sortCoffees("Price");
    });
    $("#dugme3").click(function () {
        location.reload();
    });
});

//Get user location
function geoFindMe() {
    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

    output.innerHTML = "<p>Locating…</p>";

}
function geoSuccess(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    loadCoffees(buildUrl(latitude, longitude));

    /*
    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
 
    output.appendChild(img);
    */
}

function geoError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            output.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            output.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            output.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            output.innerHTML = "An unknown error occurred."
            break;
    }
}


//Build url
function buildUrl(latitude, longitude) {
    //variables for building url for foursquare
    var baseUrl = "https://api.foursquare.com/v2/venues/explore?";
    var clientId = "NUWCSVP35BFQ2EGF4SNTU2PCMW23H3OJN1W21P3JXLQO0K1H";
    var clientSecret = "4IA23BBFIS1W5GDJAVSHEJPTY3KLTAX0CJQTRCGDJDUJ3X15";
    var auth = "client_id=" + clientId + "&client_secret=" + clientSecret;
    var section = "section=coffee";
    //var ll = "ll=43.313640,21.890734";
    var ll = "ll=" + latitude + "," + longitude;
    var radius = "radius=1000";
    var version = "v=20170629"
    var photos = "venuePhotos=1";
    var open = "openNow=1";
    var distance = "sortByDistance=1";
    var limit = "limit=10";

    var url = baseUrl + "&" + ll + "&" + radius + "&" + section + "&" + photos + "&" + open + "&" + distance + "&" + "&" + limit + "&" + auth + "&" + version;

    return url;
}

//Load coffees
function loadCoffees(url) {
    $.ajax({
        url: url,
        type: "get",
        success: function (response) {

            data = response;
            console.log(data);
           /* console.log(data.response.groups[0].items[0].venue.name);
            console.log(data.response.groups[0].items[0].venue.contact.phone);
            console.log("cena: " + data.response.groups[0].items[0].venue.price.tier);
            console.log("Distance: " + data.response.groups[0].items[0].venue.location.distance);*/


            caffees = response.response.groups[0].items;
            if (caffees.length > 0) {
                printData(caffees);
            }
            else {
                output.innerHTML = "There aren't coffees nearby.";
            }
        },
        failure: function () {
            alert("Something is wrong!");
        },
        error: function (response) {
            alert("Something is wrong with data connection!");

        }

    });
}

//Print data
function printData(data) {

    printContent = "";
    for (var i = 0; i < data.length; i++) {
        printContent += '<div class="coffee-item">';
        printContent += '<p class="name">' + data[i].venue.name + '</p>';
        printContent += '<p class="address">Address: ' + data[i].venue.location.address + ', ' + data[i].venue.location.city + '</p>';
        if (data[i].venue.contact.phone) {
            printContent += '<p class="phone">Phone: ' + data[i].venue.contact.phone + '</p>';
        }
        if (data[i].venue.price) {
            printContent += '<p class="price">Price: ' + data[i].venue.price.tier + '</p>';
        }
        printContent += '<p class="distance">Distance: ' + data[i].venue.location.distance + '</p>';

        if (data[i].venue.url) {
            printContent += '<p class="url">Web: ' + data[i].venue.url + '</p>';
        }

        console.log("Slika: " + data[i].venue.featuredPhotos.count);

        if (data[i].venue.featuredPhotos.count > 0) {
            var photoUrl;
            console.log("ima slike");
            photoUrl = data[i].venue.featuredPhotos.items[0].prefix + "500x500" + data[i].venue.featuredPhotos.items[0].suffix;
            console.log(photoUrl);
            printContent += '<img src="' + photoUrl + '">';
        }
    }
    output.innerHTML = printContent;

}

//Sort caffees
function sortCoffees(sortCriteria) {
    var arrayForPrint;
    if (sortCriteria == "Distance") {
        caffees.sort(function (a, b) {
            return (a.venue.location.distance > b.venue.location.distance) ? 1 : ((b.venue.location.distance > a.venue.location.distance) ? -1 : 0);         
        });
        arrayForPrint=caffees;
    }
    else if (sortCriteria == "Price") {
        var caffeesWithPrice=caffees.slice(0);
        var caffeesNoPrice=[];
        for(var i=0; i<caffeesWithPrice.length; i++){
            if(caffeesWithPrice[i].venue.price==undefined){
                var noPrice=caffeesWithPrice.splice(i,1);
                caffeesNoPrice.push(noPrice[0]);
            }
        }
        caffeesWithPrice.sort(function (a, b) {
            return (a.venue.price.tier > b.venue.price.tier) ? 1 : ((b.venue.price.tier > a.venue.price.tier) ? -1 : 0);
        });
        arrayForPrint=caffeesWithPrice.concat(caffeesNoPrice);
    }
    printData(arrayForPrint);
}

$("#sort-criteria").change(function () {
    console.log("Promenjeno je u " + $(this).val());
    var sortCriteria = $(this).val();
    sortCoffees(sortCriteria);
});