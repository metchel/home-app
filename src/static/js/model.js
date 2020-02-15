import Http from './http.js';

class Model {
	constructor() {
		this.state = {};
		this.host = 'http://192.168.0.106:5000';
	}

	getTodos() {
		return this.state['todos'];
	}

	async apiGetTodos() {
		return await Http.get(this.host + '/todos', {}, {})
			.then(todos => todos.json())
			.then(todos => { this.state['todos'] = todos })
			.then(todos => { return todos; });
	}

	async apiPostTodos(todo) {
		return await Http.post(this.host + 'todos', {}, {}, JSON.stringify(todo))
			.then(todos => { this.state['todos'] = todos })
			.then(todos => { return todos; });
	}

	async apiGetFiles() {
		return await Http.get(this.host + '/files', {}, {})
			.then(files => files.json())
			.then(files => { this.state['files'] = files })
			.then(files => { return files });
	}

	async apiPostFiles(files) {
		return await Http.post(this.host + '/files', {}, {}, files)
			.then();
	}

	async openFile(filename) {
		return await window.open('http://192.168.0.106:5000/files/' + filename, '_blank');
	}
}

export default Model;
