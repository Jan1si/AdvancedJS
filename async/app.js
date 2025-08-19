'use strict';

const url = 'https://jsonplaceholder.typicode.com/todos';
const data  = JSON.stringify({userId: 2132, id: 40345345, title: "totasadasdjahskdasidhiuashdiuhasdm atque quo nesciunt", completed: false});

const getTodoBtn = document.querySelector('.get-todo-btn');

function checkNetworkError(method, request){
    request.onerror = function() {
        console.error(`${method}: Сетевая ошибка. Проверьте подключение к сети.`)
    }
}

function showTodo(todos){
    const todoList = document.querySelector('.todo-list');
    if (!todoList){
        console.error('Элемнт не найден');
        return;
    }
    todoList.innerHTML = '';
    todos.forEach((element,index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
        <p class="todo-el todo-p" "id=title-${index}">${element.title}</p>
        <input class="todo-el todo-checkbox" checked=${element.completed} type="checkbox" name="completed" id="completed-${index}">
        <input class="todo-el todo-put-btn" type="button" id="put-btn-${index}" value="put" onclick="click()">
        <input class="todo-el todo-del-btn" type="button" id="del-btn-${index}" value="del">`;
    todoList.appendChild(li);
    });
}

function click(){
    console.log('ok');
}

function getData(){
    const request = new XMLHttpRequest();
    const method = 'GET';
    request.open(method, url, true);
    request.send();
    request.onload = function(){
        if (this.status >= 200 && this.status < 300) {
            try{
                // console.log('GET: \n' + JSON.parse(JSON.stringify(this.responseText)));
                const todos = JSON.parse(this.responseText);
                showTodo(todos);
            } catch(error){
                console.error('GET: Ошибка парсинга JSON ', error);
            }
        } else {
            console.error(`GET: Ошибка ${this.status}: ${this.statusText}`);
        }
    }
    checkNetworkError(method, request);
}

function postData(data){
    const request = new XMLHttpRequest();
    const method = 'POST'
    request.open(method, url, true)
    request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    request.onload = function(){
        if (this.status >= 200 && this.status < 300 || this.status === 304){
            try {
                // alert('Запись добалена!');
                console.log('POST: ' + this.responseText);    
            } catch (error) {
                // alert('Запись добалена!');
                console.log(`POST: Ошибка ${this.status} : ${this.statusText} - ${error}`);    
            }
        } else {
            console.error(`POST: Ошибка ${this.status} : ${this.statusText}`);
        }
    }
    checkNetworkError(method, request);
    request.send(data);
}

function putData(id, data){
    const request = new XMLHttpRequest();
    const method = 'PUT';
    request.open(method, url + `/${id}`, true);
    request.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    request.onload = function(){
        if (this.status >= 200 && this.status < 300 || this.status === 304) {
            try{
                console.log('PUT: ' + this.responseText);
            }catch(error){
                console.error(`PUT: Ошибка ${this.status} : ${this.statusText} - ${error}`)
            }
        }
    }
    checkNetworkError(method, request);
    request.send(data);
}

function patchData(id, data){
    const request = new XMLHttpRequest();
    const method = 'PATCH';
    request.open(method, url + `/${id}`, true);
    request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    request.onload = function(){
        if (this.status >= 200 && this.status < 300){
            console.log('PATCH: ' + this.responseText);
        }
    }
    checkNetworkError(method, request);
    request.send(data);
}

function deleteData(id){
    const request = new XMLHttpRequest();
    const method = 'DELETE';
    request.open(method, url + `/${id}`, true);
    request.onload = function(){
        if (this.status >= 200 && this.status < 300){
            console.log('DELETE: Status - ' + this.status);
        }
    }
    checkNetworkError(method, request);
    request.send();
}

getData();
postData(data);
putData(1, data);
deleteData(1);
patchData(2, JSON.stringify({id: 102, title: 'abvgd', userId: '999'}));



getTodoBtn.addEventListener('click', getData);

