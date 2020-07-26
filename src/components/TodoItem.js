import React, { useState } from "react";

export default function TodoItem({ todo, editPage }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoTitleEdit, setTodoTitleEdit] = useState(false);

  const editTodoHandler = () => {
    setTodoTitleEdit(true);
    // setTodoTitle(todo.title);
  };

  const saveTodoHandler = () => {};

  const deleteTodoHandler = () => {};

  return (
    <div className="todoItem-container">
      <div className="form-check">
        <ul>
          <li className={todo.isCompleted ? "completed" : "not-completed"}>
            {!todoTitleEdit && <p>{todo.title}</p>}
            {editPage && (
              <>
                {todoTitleEdit ? (
                  <>
                    <input type="checkbox" className="form-check-input" />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Введите название задачи"
                      onChange={(e) => setTodoTitle(e.target.value)}
                      defaultValue={todo.title}
                    />
                    <span className="editButton" onClick={saveTodoHandler}>
                      Сохранить задачу
                    </span>
                  </>
                ) : (
                  <span className="editButton" onClick={editTodoHandler}>
                    Редактировать задачу
                  </span>
                )}
                <span className="deleteButton" onClick={deleteTodoHandler}>
                  Удалть задачу
                </span>
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
