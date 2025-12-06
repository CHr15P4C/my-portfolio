const locationButton = document.getElementById("get-location-btn");
locationButton.addEventListener("click", getLocation);

function getLocation() {
    const locationElement = document.getElementById("location");

    // Step 1: Check if geolocation is supported
    if (navigator.geolocation) {
        // Step 2: Display a loading message
        locationElement.innerHTML = "Getting location...";

        // Step 3: Get the user's current position
        navigator.geolocation.getCurrentPosition(showPosition, showError);
	    } else {
        // Step 4: Display an error if geolocation is not supported
        locationElement.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const locationElement = document.getElementById("location");

    // Step 1: Display the latitude and longitude
    locationElement.innerHTML = `Latitude: ${position.coords.latitude}<br>Longitude: ${position.coords.longitude}`;
}

function showError(error) {
    const locationElement = document.getElementById("location");

    // Step 1: Handle different error codes
    switch (error.code) {
        case error.PERMISSION_DENIED:
            locationElement.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            locationElement.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            locationElement.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            locationElement.innerHTML = "An unknown error occurred.";
            break;
    }
}

