import React, { useState, useContext } from "react";
import { AlertContext } from "../context/alert/alertContext";
import { ModalContext } from "../context/modal/modalContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export const Form = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);
  const firebase = useContext(FirebaseContext);

  const submitHandler = (event) => {
    event.preventDefault();

    if (name.trim()) {
      if (todos.length > 0) {
        firebase
          .addNote(name.trim(), todos)
          .then(() => {
            alert.show("Заметка создана успешно!", "success");
          })
          .catch(() => {
            alert.show("Что-то пошло не так", "danger");
          });
        modal.hide();
      } else {
        alert.show("Добавьте хотя бы одну задачу!");
      }
    } else {
      alert.show("Введите текст заметки!");
    }
  };

  const addTodoHandler = () => {
    let todo = {};
    if (value.trim()) {
      todo = {
        title: value,
        isCompleted: false,
      };
      setTodos([...todos, todo]);
      setValue("");
    } else {
      alert.show("Введите текст задачи!");
    }
  };

  const deleteTodoHandler = (index) => {
    let todo = [...todos];
    todo.splice(index, 1);
    setTodos(todo);
    alert.show("Задача удалена");
  };

  const changeTodoTitleHandler = (index, e) => {
    let todo = [...todos];
    todo[index].title = e.target.value;
    setTodos(todo);
  };

  const changeTodoStatusHandler = (index) => {
    let todo = [...todos];
    todo[index].isCompleted = !todo[index].isCompleted;
    setTodos(todo);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Введите название заметки"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <hr />
      <TransitionGroup component="div" className="form-group todos-group">
        {todos.length > 0
          ? todos.map((todo, index) => (
              <CSSTransition key={index} classNames={"todo"} timeout={500}>
                <div className="todo-group">
                  <div className="check-control">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={(e) => changeTodoStatusHandler(index)}
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Введите задачу"
                    value={todo.title}
                    onChange={(e) => changeTodoTitleHandler(index, e)}
                  />
                  <input
                    className="btn btn-danger"
                    type="button"
                    value="X"
                    onClick={() => deleteTodoHandler(index)}
                  />
                </div>
              </CSSTransition>
            ))
          : null}
      </TransitionGroup>
      <div className="form-group add-todos-group">
        <input
          type="text"
          className="form-control"
          placeholder="Введите задачу"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          className="btn btn-warning"
          type="button"
          value="+"
          onClick={addTodoHandler}
        />
      </div>

      <div className="form-group">
        <input
          className="btn btn-success"
          type="submit"
          value="Создать заметку"
        />
      </div>
    </form>
  );
};
