export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        const onSuccess = (coords) => {
            resolve(coords);
        }; // onSuccess
        const onFail = (error) => {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    reject("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    reject("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    reject("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    reject("An unknown error occurred.");
                    break;
                default:
                    reject("An unknown error has occurred");
            }
        }; // onFail

        navigator.geolocation.getCurrentPosition(onSuccess, onFail);
    });
}; // getCurrentLocation