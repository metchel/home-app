import os
import json
import uuid
from flask import Flask
from flask import render_template, request, send_from_directory

DB_FOLDER = 'db'
UPLOAD_FOLDER = 'uploads'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 * 1024

@app.route('/')
def index():
        return render_template('index.html')

@app.route('/login')
def login():
        return render_template('login.html')

@app.route('/files', methods=['GET', 'POST'])
def files():
        if request.method == 'POST':
                uploads = set()
                files = request.files
                for f in files:
                        file = files[f]
                        filename = files[f].filename
                        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                        uploads.add(filename)

                return json.dumps([f for f in uploads]) 
        else:
                return json.dumps(sorted(os.listdir(os.path.join(app.config['UPLOAD_FOLDER']))))

@app.route('/files/<name>', methods=['GET'])
def file(name):
        if name in os.listdir(os.path.join(app.config['UPLOAD_FOLDER'])):
                return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER']), name)
        return json.dumps({})

@app.route('/todos', methods=['GET', 'POST'])
def todo():
        todos = None

        with open(os.path.join(DB_FOLDER, 'todos.json'), 'r') as todosJson:
                todos = todosJson.read()

        if request.method == 'POST' and request.json:
                todoId = str(uuid.uuid1())
                todosDict = json.loads(todos)
                todosDict[todoId] = request.json

                with open(os.path.join(DB_FOLDER, 'todos.json'), 'w') as todosJson:
                        todosJson.write(json.dumps(todosDict))

                return json.dumps(todosDict)
        else:
                return todos

if __name__ == '__main__':
        app.run(debug=False, host='0.0.0.0')
