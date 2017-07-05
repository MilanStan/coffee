//Global variables

var caffees;
var intro=document.getElementById("intro");
var output = document.getElementById("content-wrapper");


$(document).ready(function () {
    //call data
    geoFindMe();

    //call animation
    $("#cup1").addClass("cup1-animation");
    $("#cup2").addClass("cup2-animation");
    $("#intro").addClass("intro-animation");
});

//Get user location
function geoFindMe() {
    if (!navigator.geolocation) {
        intro.append("<p>Geolocation is not supported by your browser</p>");
        return;
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}
function geoSuccess(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

introTransform();
    loadCoffees(buildUrl(latitude, longitude));
}

function geoError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            intro.innerHTML = '<p style="margin-top:0">You denied the request for Geolocation.<br>'+
            'You must accept the request for geolocation in order to app work.</p>'+
            '<button id="reload" class="button input-lg">Reload</button>';
            $("#reload").on('click',function () {
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
    var ll = "ll=" + latitude + "," + longitude;
    var radius = "radius=1000";
    var version = "v=20170629"
    var photos = "venuePhotos=1";
    var open = "openNow=1";
    var distance = "sortByDistance=1";
    var limit = "limit=10";

    var url = baseUrl + "&" + ll + "&" + radius + "&" + section + "&" + photos + "&" + open + "&" + distance + "&" + "&" + limit + "&" + auth + "&" + version;
    console.log("Url adresa je: "+ url);
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
            
            if (caffees.length > 0) {
                printData(caffees);
            }
            else {
                output.innerHTML = '<p class="no-coffees">There aren\'t coffees nearby!</p>';
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
    //convert data which is array of objects to object in order to apply mustache
    dataObj={"items":data};
    console.log(dataObj);
    var template=$("#item-container").html();
    console.log("template: "+template);
    var htmlContent = Mustache.to_html(template, dataObj);
    console.log(output);
    console.log("htmlcontent: "+htmlContent);
    output.innerHTML=htmlContent;
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
    }
    else if (sortCriteria == "Price") {
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
    console.log("array with price: "+caffeesWithPrice);
    printData(arrayForPrint);
}

$("#sort-criteria").change(function () {
    console.log("Promenjeno je u " + $(this).val());
    var sortCriteria = $(this).val();
    sortCoffees(sortCriteria);
});

function introTransform(){
    $(".main-content-wrapper").css("display","block");
    $("#intro h1").css("font-size","24px");
    $("#intro h2").css("display","none");
    $("#intro p").css("display","none");
    $("header").css({"height":"8vh", "min-height":"50px","background-color":"rgb(72,28,22)","background-image":"none"});
    $("header h1").css("margin-bottom","0px");
    $("#cup1").css("display", "none");
    $("#cup2").css("display", "none");
}