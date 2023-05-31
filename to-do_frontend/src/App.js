import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
// import ToDoList from './components/ToDoList';
import ToDoItem from './components/ToDoItem';

function App() {

  const [todo, setToDo] = useState([]);

  const ROUTES = {
    TODO: "/todos",
  };

  useEffect(() => {
    //Help
    const getData = async () => {
      const result = await fetch("http://localhost:3008/todos", {});
      const data = await result.json();
      setToDo(data);
    };

    getData();
  }, []);

  const addToDo = (todo) => {
    console.log(todo)
    fetch("http://localhost:3008/todos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ todo, done: false })
    }).then(resp => resp.json())
      .then(data => setToDo((prev) => [...prev, data])).catch(error => console.error({ error }));
  };


  const deleteToDo = (id) => {
    console.log(prevToDo => prevToDo.filter(item => item.id !== id))
    console.log(id)
    fetch(`http://localhost:3008/todos/${id}`, {
      method: "DELETE"
    })
      .then(() => {

        setToDo(prevToDo => prevToDo.filter(item =>

          item.id !== id
        ));


      })
      .catch(error => console.error(error));
  };


  return (
    <section className="App">
      <header className="App-header">
        <h1>Website Todo</h1>
      </header>
      <main className="App-Main">
        <ToDoItem todo={todo} addToDo={addToDo} deleteToDo={deleteToDo} />
      </main>
    </section>
  );
}
// deleteToDo={deleteToDo} 

export default App;
