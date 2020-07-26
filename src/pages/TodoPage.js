import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { FirebaseContext } from "../context/firebase/firebaseContext";
import { AlertContext } from "../context/alert/alertContext";
import { ModalContext } from "../context/modal/modalContext";

import TodoList from "../components/TodoList";
import Modal from "../components/hoc/Modal";
import { Form } from "../components/Form";

export default function TodoPage(props) {
  console.log("Render TodoPage");

  const { notes, removeNote } = useContext(FirebaseContext);
  const alert = useContext(AlertContext);

  console.log(notes);

  let { id } = useParams();

  let currentNote = notes[id];

  const modal = useContext(ModalContext);

  const editHandler = () => {
    modal.show("Редактирование заметки");
  };

  return (
    <>
      <Modal>
        <Form id={id} currentNote={currentNote} />
      </Modal>

      <div className="todo-page">
        <div className="todo-header">
          <button
            type="button"
            className="btn btn-outline-warning btn-sm"
            onClick={() => {
              props.history.push("/");
            }}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              alert.show("Заметка удалена успешно!", "danger");
              removeNote(currentNote.id);
              props.history.push("/");
            }}
          >
            Удалить заметку
          </button>
        </div>
        <div className="todo-body">
          <h1>{currentNote.title}</h1>
          <hr />
          <TodoList todos={currentNote.todos} />
        </div>
        <div className="todo-footer">
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            onClick={editHandler}
          >
            Редактировать заметку
          </button>
        </div>
      </div>
    </>
  );
}
