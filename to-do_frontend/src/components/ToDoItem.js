import ToDoList from "./ToDoList";

const ToDoItem = ({ todo, addToDo, deleteToDo }) => {
    return (
        <ToDoList todo={todo} addToDo={addToDo} deleteToDo={deleteToDo} />
    );
}

export default ToDoItem;