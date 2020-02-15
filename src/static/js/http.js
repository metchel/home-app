class Http {
	constructor() {}
	
	static async get(url, header) {
		const request = new Request(url, {method: 'GET', mode: 'no-cors'});
		return fetch(request)
			.then(response => response);
	}

	static async post(url, query, header, body) {
		const request = new Request(url, {method: 'POST', mode: 'no-cors', body: body});
		return fetch(request)
			.then(response => response);
	}
}

export default Http;
