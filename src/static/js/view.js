class View {
	constructor() {
		this.app = this.getElement('#root');
		
		this.title = this.createElement('h1');
		this.title.textContent = 'Home App';

		this.form = this.createElement('form');
		
		this.input = this.createElement('input');
		this.input.type = 'text';
		this.input.placeholder = 'File Search';
		this.input.name = 'q';

		this.submitButton = this.createElement('button');
		this.submitButton.textContent = 'Search';

		this.todoList = this.createElement('ul', 'todo-list');
		this.filesList = this.createElement('ul', 'files-list');

		this.form.append(this.input, this.submitButton);
		
		this.app.append(this.title, this.form, this.todoList, this.filesList);
	}

	createElement(tag, className) {
		const element = document.createElement(tag);
		if (className) element.classList.add(className);
		
		return element;
	}

	getElement(selector) {
		const element = document.querySelector(selector);

		return element;
	}

	addFiles(files, clickHandler) {
		files.forEach(f => {
			const li = this.createElement('li');
			const button = this.createElement('button');
			button.onclick = () => clickHandler(f);
			li.textContent = f;
			li.append(button)
			
			this.filesList.append(li);
		});
	}
}

export default View;
