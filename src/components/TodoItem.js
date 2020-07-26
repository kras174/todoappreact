import React from "react";

export default function TodoItem({ todo }) {
  return (
    <div className="todoItem-container">
      <ul>
        <li className={todo.isCompleted ? "completed" : "not-completed"}>
          <p>{todo.title}</p>
        </li>
      </ul>
    </div>
  );
}
