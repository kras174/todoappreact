import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FirebaseContext } from "../context/firebase/firebaseContext";
import { AlertContext } from "../context/alert/alertContext";
import { ModalContext } from "../context/modal/modalContext";

import TodoList from "../components/TodoList";
import Modal from "../components/hoc/Modal";
import { Form } from "../components/Form";
import { Loader } from "../components/Loader";

export default function TodoPage(props) {
  const navigate = useNavigate()

  const { notes, removeNote, fetchNotes, loading } = useContext(
    FirebaseContext
  );
  const alert = useContext(AlertContext);
  const modal = useContext(ModalContext);

  let { id } = useParams();
  let currentNote;

  useEffect(() => {
    if (notes.length === 0) {
      fetchNotes();
    }
    // eslint-disable-next-line
  }, []);

  currentNote = notes[id];

  const editHandler = () => {
    modal.show("Редактирование заметки");
  };

  return (
    <>
      <Modal>
        <Form id={id} currentNote={currentNote} />
      </Modal>
      {loading ? (
        <Loader />
      ) : notes.length > 0 ? (
        <div className="todo-page">
          <div className="todo-header">
            <button
              type="button"
              className="btn btn-outline-warning btn-sm"
              onClick={() => {
                navigate(`/`)
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
                navigate(`/`)
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
      ) : (
        <p>Нет такой заметки</p>
      )}
    </>
  );
}
