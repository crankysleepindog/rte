

const FSAPI = {}

FSAPI.urlbase = 'https://api.foursquare.com';
FSAPI.version = 2;

FSAPI.getUrlBase = () => {
	    const {urlBase, version} = FSAPI;
	    return urlBase + '/v' + version + '/';
}; 

