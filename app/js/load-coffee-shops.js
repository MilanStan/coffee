//Global variables

var latitude;
var longitude;
var caffees;
var intro = document.getElementById("intro");
var output = document.getElementById("content-wrapper");
var coffeeItemsDivs;


$(document).ready(function () {
    //call data
    geoFindMe();

    //call animation
    if ($(window).width() > 768) {
        $("#cup1").addClass("cup1-animation");
        $("#cup2").addClass("cup2-animation");
        $("#intro").addClass("intro-animation");
    }

    //show map
    $(document).on('click', '.map', function () {
        console.log(this);
        $("#map-container").fadeIn(500);
        initMap(this);
    });

    //close map    
    $(".map-close").on('click', function () {
        $("#map-container").fadeOut(500);
    });
    /*$(".map-container").click(function(e){
        if(e.target===$("#map")){
            console.log("jednako");
        }
    });*/
    $("#map-container").click(function (e) {
        $(this).fadeOut(500);
    }).on('click', ".map-wrapper", function (e) {
        e.stopPropagation();
    });
});

//Get user location
function geoFindMe() {
    if (!navigator.geolocation) {
        intro.append("<p>Geolocation is not supported by your browser</p>");
        chooseLocation();
        return;
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

function geoSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    $("#content-wrapper").addClass("loading");
    loadCoffees(buildUrl(latitude, longitude));
    introTransform();
}

function geoError(error) {
    /*switch (error.code) {
        case error.PERMISSION_DENIED:
            intro.innerHTML = '<p style="margin-top:0">You denied the request for Geolocation.<br>' +
                'You must accept the request for geolocation in order to app work.</p>' +
                '<button id="reload" class="button input-lg">Reload</button>';
            $("#reload").on('click', function () {
                location.reload();
            });
            break;
        case error.POSITION_UNAVAILABLE:
            intro.innerHTML = "<p>Location information is unavailable.</p>"
            break;
        case error.TIMEOUT:
            intro.innerHTML = "<p>The request to get user location timed out.</p>"
            break;
        case error.UNKNOWN_ERROR:
            intro.innerHTML = "<p>An unknown error occurred.</p>"
            break;
    }*/
    chooseLocation();
}


//Build url
function buildUrl(latitude, longitude) {
    //variables for building url for foursquare
    var baseUrl = "https://api.foursquare.com/v2/venues/explore?";
    var clientId = "NUWCSVP35BFQ2EGF4SNTU2PCMW23H3OJN1W21P3JXLQO0K1H";
    var clientSecret = "4IA23BBFIS1W5GDJAVSHEJPTY3KLTAX0CJQTRCGDJDUJ3X15";
    var auth = "client_id=" + clientId + "&client_secret=" + clientSecret;
    var section = "section=coffee";
    var ll = "ll=" + latitude + "," + longitude;
    var radius = "radius=1000";
    var version = "v=20170629"
    var photos = "venuePhotos=1";
    var open = "openNow=1";
    var distance = "sortByDistance=1";
    var limit = "limit=20";

    var url = baseUrl + "&" + ll + "&" + radius + "&" + section + "&" + photos + "&" + open + "&" + distance + "&" + "&" + limit + "&" + auth + "&" + version;
    console.log("Url adresa je: " + url);
    return url;
}

//Load coffees
function loadCoffees(url) {
    $.ajax({
        url: url,
        type: "get",
        success: function (response) {

            data = response;
            //get array of objects
            caffees = response.response.groups[0].items;
            $("#content-wrapper").removeClass("loading");

            if (caffees.length > 0) {
                printData(caffees);
            } else {
                output.innerHTML = '<p class="no-coffees">There aren\'t coffees nearby!</p>';
                $("#sort-criteria").attr("disabled", "disabled");
            }
        },
        failure: function () {
            output.innerHTML = '<p class="no-coffees">Something is wrong!<br>Try later!</p>';
            $("#sort-criteria").attr("disabled", "disabled");
            $("#content-wrapper").removeClass("loading");
        },
        error: function (response) {
            output.innerHTML = '<p class="no-coffees">Something is wrong with database connection!<br>Try later!</p>';
            $("#sort-criteria").attr("disabled", "disabled");;
            $("#content-wrapper").removeClass("loading");
        }

    });
}

//Print data
function printData(data) {
    //convert data which is array of objects to object in order to apply mustache
    dataObj = {
        "items": data
    };
    console.log(dataObj);
    var template = $("#item-container").html();
    console.log("template: " + template);
    var htmlContent = Mustache.to_html(template, dataObj);
    console.log(output);
    console.log("htmlcontent: " + htmlContent);
    output.innerHTML = htmlContent;

    imageLoadingAnimation();

    //we get all divs with coffee item in order to animate revealing
    coffeeItemsDivs = $(".item-wrapper");
    coffeeItemsDivs.addClass("invisible");

    //for petlja za svaku promenu veličine bilo kog .item-wrapper div-a osvežava waypoint trigger points
    animateRevealing();
    for (i = 0; i < coffeeItemsDivs.length; i++) {
        $(coffeeItemsDivs[i]).resize(function () {

            console.log("promenjeno" + $(coffeeItemsDivs[i]));
            Waypoint.refreshAll();
        });
    }


    /*setTimeout(function () {
        console.log("Posle broj divova: " + $(".item-wrapper").length);
        console.log("Posle timeout-a" + $("#content-wrapper").height());
        animateRevealing();
    }, 500);*/

    /*
        var printContent = "";
        for (var i = 0; i < data.length; i++) {
            printContent +=
                '<div class="col-md-6 item-wrapper">' +
                getLinkBeginning() +
                '<div class="row item-content">' +
                '<div class="col-sm-5 image-container">' +
                getImage() +
                '<div class="image-icon"><span class="glyphicons glyphicon-coffee-cup"></span></div>'+
                '</div>' +
                '<div class="col-sm-7 data-container">' +
                '<p class="name">' + data[i].venue.name + '</p>' +
                getAddress()+
                getPrice() +
                '<p class="distance"><span class="label">Distance: </span>' + data[i].venue.location.distance + 'm</p>' +
                '</div>' +
                '</div>' +
                getLinkEnd() +
                '</div>';

        }
        function getImage() {
            var photoUrl;
            var altTag;
            if (data[i].venue.featuredPhotos.count > 0) {            
                console.log("ima slike");
                photoUrl = data[i].venue.featuredPhotos.items[0].prefix + "500x500" + data[i].venue.featuredPhotos.items[0].suffix;
                console.log(photoUrl);
                altTag=data[i].venue.name;
            }
            else{
                photoUrl="../img/no-image.jpg";
                altTag="no image";
            }
            var forPrint = '<img src="' + photoUrl + '" alt="' + altTag + '">';
            return forPrint;
        }
        function getPrice() {
            var priceData = '<p class="price"><span class="label">Price: </span>';
            if (data[i].venue.price) {
                for (var a = 0; a < data[i].venue.price.tier; a++) {
                    priceData += '$';
                }
                priceData += ' ' + data[i].venue.price.message;
            }
            else {
                priceData += "No data";
            }
            priceData += '</p>';
            return priceData;
        }
        function getAddress() {
            var address = '<p class="price"><span class="label">Address: </span><br>';
            if (data[i].venue.location.address) {
                address+=data[i].venue.location.address;
            }
            else {
                address += "No data";
            }
            address += '</p>';
            return address;
        }
        function getLinkBeginning() {
            var urlStart;
            if (data[i].venue.url) {
                urlStart = '<a href="' + data[i].venue.url + '">';
            }
            else {
                urlStart = '<a href="#">';
            }
            return urlStart;
        }
        function getLinkEnd() {
            urlEnd = '</a>';
            return urlEnd;
        }
        output.innerHTML = printContent;
    */
}

//Sort caffees
function sortCoffees(sortCriteria) {
    var arrayForPrint;
    if (sortCriteria == "Distance") {
        caffees.sort(function (a, b) {
            return (a.venue.location.distance > b.venue.location.distance) ? 1 : ((b.venue.location.distance > a.venue.location.distance) ? -1 : 0);
        });
        arrayForPrint = caffees;
    } else if (sortCriteria == "Price") {
        var caffeesWithPrice = caffees.slice(0);
        var caffeesNoPrice = [];
        for (var i = 0; i < caffeesWithPrice.length; i++) {
            if (caffeesWithPrice[i].venue.price == undefined) {
                var noPrice = caffeesWithPrice.splice(i, 1);
                caffeesNoPrice.push(noPrice[0]);
            }
        }
        caffeesWithPrice.sort(function (a, b) {
            return (a.venue.price.tier > b.venue.price.tier) ? 1 : ((b.venue.price.tier > a.venue.price.tier) ? -1 : 0);
        });
        arrayForPrint = caffeesWithPrice.concat(caffeesNoPrice);
    }
    console.log("array with price: " + caffeesWithPrice);
    printData(arrayForPrint);
}

$("#sort-criteria").change(function () {
    console.log("Promenjeno je u " + $(this).val());
    var sortCriteria = $(this).val();
    sortCoffees(sortCriteria);
});

function introTransform() {
    $("#intro h1").css("font-size", "24px");
    $("#intro h2").css("display", "none");
    $("#intro p").css("display", "none");
    $("#intro").css({
        "top": "0",
        "transform": "translateY(0)"
    });
    $("header").css({
        "height": "66px",
        "padding": "20px 0"
    });
    $("#background-hover").css("background-color", "rgb(72,28,22)");
    $("header h1").css("margin-bottom", "0px");
    $("#cup1").css("display", "none");
    $("#cup2").css("display", "none");

    $(".main-content-wrapper").css("display", "block");

    //ovo je potrebno jer tranzicija smanjivanja visine headera traje 1500ms koliko treba da se ustale visine elemenata
    setTimeout(function () {
        Waypoint.refreshAll();
    }, 1500);

}

function imageLoadingAnimation() {
    //thumbnails
    $(".image-container img").css("visibility", "hidden");

    $(".image-container img").on('load', function () {

        $(this).css("visibility", "visible");
        $(".image-container a").featherlight();

        //Waypoint.refreshAll();

    });

    //feather lightbox loader
    $(".featherlight-content img").css("visibility", "hidden");

    $(".featherlight-content img").on('load', function () {
        $(this).css("visibility", "visible");
        //$(".image-container").css("background-image", "none");
    });
}

//Animate revealing of coffees
function animateRevealing() {
    for (i = 0; i < coffeeItemsDivs.length; i++) {
        new Waypoint({
            element: coffeeItemsDivs[i],
            handler: function (direction) {
                $(this.element).removeClass("invisible");
            },
            //može 100% jer smo primenili transform: translateY(100px) na element koji se posmatra
            offset: '100%'
        });
    }
}

function initMap(e) { //e parametar pass instance of coffee
    //next row get name and address of current coffee for which we call map
    getMapName(e);

    //calling map directions
    var startPoint = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    };
    console.log(e);
    var endLat = parseFloat($(e).attr("data-latitude"));
    console.log(endLat);
    var endLon = parseFloat($(e).attr("data-longitude"));
    console.log(endLon);
    var endPoint = {
        lat: endLat,
        lng: endLon
    };

    var map = new google.maps.Map(document.getElementById('map'), {
        center: startPoint,
        zoom: 10
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });

    // Set destination, origin and travel mode.
    var request = {
        destination: endPoint,
        origin: startPoint,
        travelMode: 'WALKING'
    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function (response, status) {
        if (status == 'OK') {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
        }
    });
}
//Print name and address of coffee above map
function getMapName(e) {
    var mapCoffeeName = $(e).attr("data-name");
    console.log(mapCoffeeName);
    var mapCoffeeAddress = $(e).attr("data-address");
    console.log(mapCoffeeAddress);
    var mapName = mapCoffeeName + ", " + mapCoffeeAddress;
    $(".map-name").text(mapName);
}


//MAP PICKER DIV
function chooseLocation() {
    $("#map-picker-container").fadeIn('slow', function () {
        $("#map-pick").fadeIn('slow');
        setTimeout(function () {
            $("#place-input-container").addClass("expanded visible");
            //mora ovako da se pozove #place-input jer smo ga dodelili kao google map kontrolu u redu 450
            //Takođe moralo je prvi put da se eksplicitno dodeli klasa expanded nije bilo dovoljno
            //samo izazvati focus događaj verovatno iz istog razloga
            $(searchControl).find("#place-input").focus();
        }, 2000);
    });
    //$("#map-pick").addClass("expanded");

    var myLatlng = new google.maps.LatLng(44.095475, 21.027832);
    var mapOptions = {
        zoom: 7,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map-pick"), mapOptions);

    // Place a draggable marker on the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable: true,
        title: "Drag me!"
    });
    //get lat and long where marker is dragged down
    google.maps.event.addListener(marker, 'dragend', function (event) {
        //console.log(this.getPosition().lat().toFixed(6));
        //console.log(this.getPosition().lng().toFixed(6));
        setCoorLoad();
        console.log("Pomeren je marker");
    });
    //auto complete input text
    var input = document.getElementById('place-input');
    var autocomplete = new google.maps.places.Autocomplete(input);

    //inserting additional element to google map controls
    var searchControl = document.getElementById('place-input-container');
    var latLonSubmit = document.getElementById('lat-lon-submit');
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchControl);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(latLonSubmit);

    //autocomplete.bindTo('bounds', map);
    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        //marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        console.log("Izabrana lokacija");
        setCoorLoad();
    });

    function setCoorLoad() {
        latitude = marker.getPosition().lat().toFixed(6);
        longitude = marker.getPosition().lng().toFixed(6);
        console.log(latitude, longitude);
    }
    setCoorLoad();
}
//submit of location when is manually choosed
$("#lat-lon-submit").click(function () {
    $("#map-picker-container").fadeTo('fast',0, function(){
        setTimeout(function(){
            $("#map-picker-container").css("display", "none");
        },2000);
    });
    $("#content-wrapper").addClass("loading");
    setTimeout(function () {
        introTransform();
        loadCoffees(buildUrl(latitude, longitude));
    }, 1000);

});
//changing width of input field on focusin or focusout
$("#place-input").on('focus', function () {
    if (!$("#place-input-container").hasClass("expanded")) {
        $("#place-input-container").addClass("expanded");
        console.log("focusin");
    }
});
$("#place-input").on('blur', function () {
    if ($("#place-input-container").hasClass("expanded")) {
        $("#place-input-container").removeClass("expanded");
        console.log("focusout");
    }
});