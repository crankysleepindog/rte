/* 
medium article in re firebase/ geofire -- june 13, 2016
https://medium.com/google-cloud/firebase-is-cool-geofire-is-just-awesome-b7f2be5e0f0f

*/


(function() {

   
      // Initialize Firebase
	const config = {
	apiKey: "AIzaSyD3q3jRdaP8gFjNOvZ2mWGPBIOR2GZIFp8",
	authDomain: "readytoeat-f6b26.firebaseapp.com",
	databaseURL: "https://readytoeat-f6b26.firebaseio.com",
	projectId: "readytoeat-f6b26",
	storageBucket: "readytoeat-f6b26.appspot.com",
	messagingSenderId: "598093249049"
	};

	const FILE_STORAGE_REF = 'places';

	firebase.initializeApp(config);
    
  // // Initialize the Firebase SDK
  // firebase.initializeApp({
  //   apiKey: "AIzaSyD3q3jRdaP8gFjNOvZ2mWGPBIOR2GZIFp8",
  //   databaseURL: "https://geofire-9d0de.firebaseio.com"
  // });

  // Generate a random Firebase location
  var firebaseRef = firebase.database().ref().push();
  // const firebaseRef = firebase.database().ref().child(FILE_STORAGE_REF);

  // Create a new GeoFire instance at the random Firebase location
  const geoFire = new GeoFire(firebaseRef);
  let geoQuery;

  $("#addfish").on("submit", function() {
    var lat = parseFloat($("#addlat").val());
    var lon = parseFloat($("#addlon").val());
    var myID = "fish-" + firebaseRef.push().key;

    geoFire.set(myID, [lat, lon]).then(function() {
      log(myID + ": setting position to [" + lat + "," + lon + "]");
    });

    return false;
  });

  $("#queryfish").on("submit", function() {
    var lat = parseFloat($("#querylat").val());
    var lon = parseFloat($("#querylon").val());
    var radius = parseFloat($("#queryradius").val());
    var operation;

    if (typeof geoQuery !== "undefined") {
      operation = "Updating";

      geoQuery.updateCriteria({
        center: [lat, lon],
        radius: radius
      });

    } else {
      operation = "Creating";

      geoQuery = geoFire.query({
        center: [lat, lon],
        radius: radius
      });

      geoQuery.on("key_entered", function(key, location, distance) {
        log(key + " is located at [" + location + "] which is within the query (" + distance.toFixed(2) + " km from center)");
      });

      geoQuery.on("key_exited", function(key, location, distance) {
        console.log(key, location, distance);
        log(key + " is located at [" + location + "] which is no longer within the query (" + distance.toFixed(2) + " km from center)");
      });
    }

    log(operation + " the query: centered at [" + lat + "," + lon + "] with radius of " + radius + "km")

    return false;
  });

  /*************/
  /*  HELPERS  */
  /*************/
  /* Logs to the page instead of the console */
  function log(message) {
    var childDiv = document.createElement("div");
    var textNode = document.createTextNode(message);
    childDiv.appendChild(textNode);
    document.getElementById("log").appendChild(childDiv);
  }
})();