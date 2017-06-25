// import { getVenues } from './getVenues';


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


// const venues = Object.keys(data.venues);

// need to pass venues array dynamically
const venues = ["4a2dfb47f964a5200e981fe3", "4c5ef77bfff99c74eda954d3", "3fd66200f964a520bce51ee3", "4abaa8bbf964a520518220e3", "57acc558498e036ce8f2b0b4", "53370455498e18d7e6607a1d", "4b300d20f964a5202bf524e3", "3fd66200f964a52010ea1ee3", "4a8ed35af964a520cb1220e3", "4a895649f964a520e60720e3", "5877beb418dc53516ff158fb", "4e4329421f6ec2e19318d0c2", "4b5b7a6ef964a520440129e3", "4a46f2abf964a520aea91fe3", "4a86124ff964a5204e0020e3", "49ea6712f964a5205e661fe3", "57100e41498e0859e821c408", "4b6c20bcf964a5202d252ce3", "4bd37996b221c9b631e2d9d0", "536edffb498e4c73690b7b17", "58bdef6676f2ca579a3da20f", "4af4694df964a5202df221e3", "4f3288e119836c91c7e1412b", "4b679046f964a5206a552be3", "4f32b64b19836c91c7f24af3", "4ea1e36d722ec75ade0d3a17", "4b7dd350f964a52002d72fe3", "4c34fae3452620a1280c260f", "4bfd8d06f61dc9b669309fde", "3fd66200f964a520bae81ee3"];


//
// getVenues()
// .then((venues) => {

// })


for (const venueId of venues) {
	const base_url = 'https://api.foursquare.com/';
	const version = 2;
	const searchType = 'venues';
	const search = 'menu';
	const client_id = 'VZZ1EUDOT0JYITGFDKVVMCLYHB3NURAYK3OHB5SK5N453NFD';
	const client_secret = 'UAA15MIFIWVKZQRH22KPSYVWREIF2EMMH0GQ0ZKIQZC322NZ';
	const mysteryV = 20140806;

	let apiEndpoint = base_url;
	apiEndpoint += 'v' + version + '/'; 
	apiEndpoint += searchType + '/';
	apiEndpoint += venueId + '/';
	apiEndpoint += search + '?';	
	apiEndpoint += 'v=' + mysteryV + '&';
	apiEndpoint += 'client_id=' + client_id + '&';
	apiEndpoint += 'client_secret=' + client_secret;


	GET(apiEndpoint)
		.then((data) => {
			// console.log('data is : &&&&&& ', data)
			const menus = data.response.menu;
			return menus;
		}).then((menus) => {
			let menuItems = {};
			let onMenu = {};
			let venueID = {};
			let data = {};

// do this with recursion >>>>

			console.log('menus : ', menus)

//>>>			
			const count = menus.menus.count
			if (count > 0) {
				const menusTypes = menus.menus.items
				// console.log('menu types : ',menusTypes)
				for (i = 0; i < count; i++) {
					const menusArr = menusTypes[i].entries.items;
					console.log('menusArr : ', menusArr);
					if (menusArr.length > 1) {
						for (j = 0; j < menusArr.length; j++) {
							const menu =  menusArr[j].entries.items;
								// console.log('menu : ', menu)
							for (k = 0; k < menu.length; k++) {
								let menuItem = menu[k];
								// console.log(menuItem.name);
								
								// replaces space with _, removes ""
								// still needs to remove double __, remove (), remove degree circle sign
								menuItem = menuItem.name.replace(/\s+/g, "_").replace(/\W/g, "");
								// console.log('menuItem  : ', menuItem)
								// console.log('menuItem Name : ', menuItem);
								// })
								venueID[menuItem] = true;
							}
								onMenu[venueId] = venueID;
								menuItems = Object.assign({}, menuItems, onMenu);
								data = Object.assign({}, data, {
									menuItems,
								})
								// console.log('1 *****', venueID)
								console.log('1 *****', data)
						}
					} 
					else {
						// menusArr length is only 1.
						const singleMenu = menusArr[0].entries.items; 
						for (k = 0; k < singleMenu.length; k++) {
								let menuItem = singleMenu[k];
								// console.log(menuItem.name);
								
								// replaces space with _, removes ""
								// still needs to remove double __, remove (), remove degree circle sign
								menuItem = menuItem.name.replace(/\s+/g, "_").replace(/\W/g, "");
								// console.log('menuItem : ', menuItem);
								// console.log('menuItem Name: ', menuItem);
								

								venueID[menuItem] = true;
							}	
								onMenu[venueId] = venueID;
								menuItems = Object.assign({}, menuItems, onMenu);
								data = Object.assign({}, data, {
									menuItems,
								})
								// console.log('2 $$$$$$ ', venueID)
								console.log('2 $$$$$$ ', data)
					}
				}
			}
		})
}   // for / of 




