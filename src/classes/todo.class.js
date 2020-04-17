

export class Todo {

    static fromJson({ id, tarea, completado, creado }) {

        const tempTodo = new Todo(tarea);
        tempTodo.completado = completado;
        tempTodo.id = id;
        tempTodo.creado = creado;

        return tempTodo; 
    }

    constructor(tarea) {

        this.tarea = tarea;
        this.id = new Date().getTime();//128532351
        this.completado = false;
        this.creado = new Date();

    }
}