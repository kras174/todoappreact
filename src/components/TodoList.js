import React, { Fragment } from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos }) {
  return (
    <Fragment>
      <div className="todoList-container">
        {todos
          ? todos.map((todo, index) => <TodoItem key={index} todo={todo} />)
          : null}
      </div>
    </Fragment>
  );
}
