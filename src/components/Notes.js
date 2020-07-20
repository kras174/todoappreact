import React, { useContext } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { AlertContext } from '../context/alert/alertContext'
import TodoList from './TodoList'
import { NavLink } from 'react-router-dom'

export const Notes = ({ notes, onRemove }) => {
	const alert = useContext(AlertContext)

	return (
		<TransitionGroup component="ul" className="list-group">
			{notes.map((note) => (
				<CSSTransition key={note.id} classNames={'note'} timeout={800}>
					<NavLink to={`/todos/${note.id}`} className="note-link">
						<li className="list-group-item note">
							<div>
								<strong>{note.title}</strong>
								<hr />
								<TodoList todos={note.todos} />
								{/* <small>{note.date}</small> */}
							</div>
							<button
								type="button"
								className="btn btn-outline-danger btn-sm"
								onClick={() => {
									alert.show(
										'Заметка удалена успешно!',
										'danger'
									)
									onRemove(note.id)
								}}
							>
								&times;
							</button>
						</li>
					</NavLink>
				</CSSTransition>
			))}
		</TransitionGroup>
	)
}
