import { Todo } from '../classes';
import { todoList } from '../index'


//Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const inputNewTodo = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `


    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

// eventos

inputNewTodo.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && inputNewTodo.value.length > 0) {
        const nuevoTodo = new Todo(inputNewTodo.value);
        todoList.nuevoTodo(nuevoTodo);
        console.log(todoList);

        crearTodoHtml(nuevoTodo);

        inputNewTodo.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');

    if (nombreElemento.includes('input')) {

        todoList.marcaCompletado(todoId);
        todoElement.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElement);
    }
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {

        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }

    }
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    if (!filtro) { return; }



    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {

                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;



        }
    }
})