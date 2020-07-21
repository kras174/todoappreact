import React, { useContext } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { AlertContext } from '../context/alert/alertContext'
import TodoList from './TodoList'
import { Link } from 'react-router-dom'

export const Notes = ({ notes, onRemove }) => {
	const alert = useContext(AlertContext)

	return (
		<TransitionGroup component="ul" className="list-group">
			{notes.map((note) => (
				<CSSTransition key={note.id} classNames={'note'} timeout={800}>
					<Link to={`/${note.id}`} className="note-link">
						<li className="list-group-item note">
							<div>
								<strong>{note.title}</strong>
								<hr />
								<TodoList todos={note.todos} />
								{/* <small>{note.date}</small> */}
							</div>
						</li>
					</Link>
				</CSSTransition>
			))}
		</TransitionGroup>
	)
}
