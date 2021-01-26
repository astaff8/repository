/*
  This program is designed to give you the distance between two locations. 
  When you enter their latitudes and longitudes as inputs, the output you 
  will get is the distance between the two locations.
  Input URL:
  https://kdbs6.sse.codesandbox.io/?latA=36.168510660593704&lonA=-86.77687530620541&latB=35.95789390101877&lonB=-83.91220039655026
  Location Names: Nashville, Tennessee and Knoxville, Tennessee
  Output distance: 258. 5 km
*/
var http = require("http");
http
  .createServer(function (request, response) {
    // Read the URL used to contact the web service and extract the latitude and longitude values, saving them each to a variable
    var requestUrl = new URL("http://" + request.headers.host + request.url);
    var latA = requestUrl.searchParams.get("latA");
    var lonA = requestUrl.searchParams.get("lonA");
    var latB = requestUrl.searchParams.get("latB");
    var lonB = requestUrl.searchParams.get("lonB");
    // Use the spherical law of cosines formula to calculate distance along the surface of a sphere. It is not the most accurate method for Earth, but it is good enough. Source: https://www.movable-type.co.uk/scripts/latlong.html
    const φ1 = (latA * Math.PI) / 180;
    const φ2 = (latB * Math.PI) / 180;
    const Δλ = ((lonB - lonA) * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const d =
      Math.acos(
        Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)
      ) * R;
    // Output the calculated distance value to the client and complete the execution of the program.
    response.write("{distance: " + d + "}");
    response.end();
  })
  .listen(8080);
