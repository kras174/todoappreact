import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import TodoList from "./TodoList";
import { Link } from "react-router-dom";

export const Notes = ({ notes, onRemove }) => {
  return (
    <TransitionGroup component="ul" className="list-group">
      {notes.map((note) => (
        <CSSTransition key={note.id} classNames={"note"} timeout={800}>
          <Link to={`/note=${note.id}`} className="note-link">
            <li className="list-group-item note">
              <div>
                <strong>{note.title}</strong>
                <hr />
                <TodoList todos={note.todos} />
              </div>
            </li>
          </Link>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
