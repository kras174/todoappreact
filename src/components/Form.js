import React, { useState, useContext } from 'react'
import { AlertContext } from '../context/alert/alertContext'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export const Form = () => {
	const [name, setName] = useState('')
	const [value, setValue] = useState('')
	const [todos, setTodos] = useState([])
	const alert = useContext(AlertContext)
	const firebase = useContext(FirebaseContext)

	const submitHandler = (event) => {
		event.preventDefault()

		if (name.trim()) {
			if (todos.length > 0) {
				firebase
					.addNote(name.trim(), todos)
					.then(() => {
						alert.show('Заметка создана успешно!', 'success')
					})
					.catch(() => {
						alert.show('Что-то пошло не так', 'danger')
					})
				setName('')
				setTodos([])
			} else {
				alert.show('Добавьте хотя бы одну задачу!')
			}
		} else {
			alert.show('Введите текст заметки!')
		}
	}

	const addTodo = () => {
		if (value.trim()) {
			setTodos([...todos, value])
			setValue('')
		} else {
			alert.show('Введите текст задачи!')
		}
	}

	return (
		<form onSubmit={submitHandler}>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					placeholder="Введите название заметки"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="form-group todos-group">
				<input
					type="text"
					className="form-control"
					placeholder="Введите задачу"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<input
					className="btn btn-warning"
					type="button"
					value="Добавить задачу"
					onClick={addTodo}
				/>
			</div>
			<div className="form-group">
				<ul>
					{todos.length > 0
						? todos.map((todo, index) => (
								<li key={index}>{todo}</li>
						  ))
						: null}
				</ul>
			</div>
			<div className="form-group">
				<input
					className="btn btn-success"
					type="submit"
					value="Создать заметку"
				/>
			</div>
		</form>
	)
}
