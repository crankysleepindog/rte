const argToString = (args) => {
	return Object.keys(args || {}).reduce((_arr, key) => {
		const val = args[key];
		_arr.push([key, val].join('='));
		return _arr;
	}, []).join('&');
}

const promisify = (func) => {
	return (...args) => {
		return new Promise((resolve, reject) => {
			args.push(function(data) {
				resolve(data)
			});

			func(...args);
		})
	}
}

export const GET = promisify(function(endpoint,args,callback) {
	const url = endpoint + '?' + argToString(args);
	const http = new XMLHttpRequest();

	http.onload = (e) => {
		callback(e.target.responseText)
	}

	http.onerror = (e) => {
		console.log('error. failed attempt')
	}

	http.open('GET', url);
	http.send();
})