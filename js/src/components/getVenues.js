// consider using superagent

function GET(url) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', url);
			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			};
			request.onerror = (err) => {
				reject(err)
			};
			request.send();
		});
} // GET

const base_url = 'https://api.foursquare.com/';
const version = 2;
const searchType = 'venues';
const search = 'search';
const client_id = 'VZZ1EUDOT0JYITGFDKVVMCLYHB3NURAYK3OHB5SK5N453NFD';
const client_secret = 'UAA15MIFIWVKZQRH22KPSYVWREIF2EMMH0GQ0ZKIQZC322NZ'
const mysteryV = 20140806
const city = 'New+York,+NY';
const query = 'pasta';
let data = {};

let apiEndpoint = base_url;
apiEndpoint += 'v' + version + '/';
apiEndpoint += searchType + '/';
apiEndpoint += search + '?';
apiEndpoint += 'v=' + mysteryV + '&';
apiEndpoint += 'near=' + city + '&';
apiEndpoint += 'query=' + query + '&';
apiEndpoint += 'client_id=' + client_id + '&';
apiEndpoint += 'client_secret=' + client_secret;


// export getVenues() {

	GET(apiEndpoint)
		.then((data) => {
			const venueArr = data.response.venues
			console.log(venueArr)
			return venueArr;
		}).then((venueArr) => {
			let venues = {};

			for (const venue of venueArr) {
				// console.log('################', venue)
				// console.log(venue.id, venue.name, venue.location.formattedAddress[0], venue.location.formattedAddress[1], venue.location.distance);

				let savedVenue = {}
				savedVenue[venue.id] = [venue.location.lat, venue.location.lng]
				
				venues = Object.assign({}, venues, savedVenue);
				data = Object.assign({}, data, {
					venues,
				})

			}
				console.log('venues : ', venues);
				console.log('data *&*&*&*&*&*& ', data);
				return data;

	})
// }

	//venueArr returns an array of 30 venue objects for that query

