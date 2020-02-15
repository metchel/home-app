import Model from './model.js';
import Controller from './controller.js';
import View from './view.js';

const app = new Controller(new Model(), new View());

app.model.apiGetTodos();

app.model.apiGetFiles();

setTimeout(() => {
	const files = app.model.state['files'];
	console.log(files);

	app.view.addFiles(files, app.model.openFile);
}, 500);
