import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { AlertContext } from '../context/alert/alertContext'
import TodoList from '../components/TodoList'

export default function EditTodo(props) {
	const { notes, removeNote } = useContext(FirebaseContext)
	const alert = useContext(AlertContext)

	let { id } = useParams()

	let currentNote = notes.filter((note) => note.id === id)[0]

	return (
		<div className="todo-page">
			<h1>{currentNote.title}</h1>
			<TodoList todos={currentNote.todos} />
			<button
				type="button"
				className="btn btn-outline-danger btn-sm"
				onClick={() => {
					alert.show('Заметка удалена успешно!', 'danger')
					removeNote(currentNote.id)
					props.history.push('/')
				}}
			>
				&times;
			</button>
		</div>
	)
}
