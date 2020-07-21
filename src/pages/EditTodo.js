import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { AlertContext } from '../context/alert/alertContext'
import TodoList from '../components/TodoList'

export default function EditTodo(props) {
	const { notes, updateNote, removeNote } = useContext(FirebaseContext)
	const alert = useContext(AlertContext)

	const [title, setTitle] = useState('')
	const [titleEdit, setTitleEdit] = useState(false)

	let { id } = useParams()

	let currentNote = notes.filter((note) => note.id === id)[0]

	const editTitleHandler = () => {
		setTitleEdit(true)
		setTitle(currentNote.title)
	}

	return (
		<div className="todo-page">
			<div className="todo-header">
				{!titleEdit ? (
					<>
						<h1>{currentNote.title}</h1>
						<span
							className="editTitle-Button"
							onClick={editTitleHandler}
						>
							ред
						</span>
					</>
				) : (
					<input
						type="text"
						className="form-control"
						placeholder="Введите название заметки"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				)}
			</div>
			<div className="todo-body">
				<TodoList todos={currentNote.todos} />
			</div>
			<div className="todo-footer">
				<button
					type="button"
					className="btn btn-outline-success btn-sm"
					onClick={() => {
						alert.show('Заметка успешно сохранена!', 'success')
						if (title) currentNote.title = title
						else {
							alert.show(
								'Поле с именем заметки не может быть пустым!',
								'warning'
							)
							return
						}

						updateNote(
							currentNote.id,
							currentNote.title,
							currentNote.todos
						)
						props.history.push('/')
					}}
				>
					Сохранить
				</button>
				<button
					type="button"
					className="btn btn-outline-warning btn-sm"
					onClick={() => {
						props.history.push('/')
					}}
				>
					Отменить
				</button>
				<button
					type="button"
					className="btn btn-outline-danger btn-sm"
					onClick={() => {
						alert.show('Заметка удалена успешно!', 'danger')
						removeNote(currentNote.id)
						props.history.push('/')
					}}
				>
					Удалить
				</button>
			</div>
		</div>
	)
}
