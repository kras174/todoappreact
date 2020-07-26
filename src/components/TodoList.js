import React, { Fragment } from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, editPage }) {
  return (
    <Fragment>
      <div className="todoList-container">
        {todos
          ? todos.map((todo, index) => (
              <TodoItem key={index} todo={todo} editPage={editPage} />
            ))
          : null}
      </div>
    </Fragment>
  );
}
