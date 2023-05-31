import { useState } from "react";
import '../App.css';

const ToDoList = ({ todo, addToDo, deleteToDo }) => {
    console.log(todo)



    const addToDoHandler = () => {

        const inputToDo = document.querySelector('form input[type="text"]');
        addToDo(inputToDo.value);

        document.querySelector('form input[type="text"]').value = ""
    }

    // const deleteInput = index => {
    //     addToDo(oldValues => {
    //         return oldValues.filter((_, i) => i !== index)
    //     })
    // }

    // const deletetest = () => {
    //     console.log("klappt")
    //     deleteToDo()
    // }

    // const deleteInput = (id) => {
    //     console.log(id)
    //     fetch(`http://localhost:3008/todos/${id}`, {
    //         method: "DELETE"
    //     }).then(() => {
    //         deleteToDo(id)
    //     }).catch(error => console.error(error))
    // }

    // delete von farid 
    // const deleteTodo = (index) => {
    //     fetch('http://localhost:3008/todos/' + todo[index].id, {
    //         method: "DELETE"
    //     })
    //     const newTodos = [...todo];
    //     newTodos.splice(index, 1)
    //     setTodos(newTodos)
    // }


    return (
        <section className="containerToDo">
            <article className="container">
                {todo.map((elt, index) => {
                    return (
                        <article className="list" key={index}>
                            <div className="input">
                                <input type="checkbox" name="" id="checkbox" />
                                <p id="checkbox">{elt.todo}</p>
                            </div>
                            <div className="button_container">
                                <input id="delete" type="button" value="x" onClick={deleteToDo} />
                            </div>
                        </article>
                    )
                })}
                <form action="#">
                    <input type="text" name="" id="" placeholder="add to do" />
                    <input type="button" value="Add Todo" onClick={addToDoHandler} className="addButton" />
                </form>
            </article>
        </section>
    );
}
// onClick={() => deleteInput(index)}

export default ToDoList;