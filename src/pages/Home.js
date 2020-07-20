import React, { Fragment, useContext, useEffect } from 'react'
import { Form } from '../components/Form'
import { Notes } from '../components/Notes'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { Loader } from '../components/Loader'
import Modal from '../components/hoc/Modal'
import { ModalContext } from '../context/modal/modalContext'

export const Home = () => {
	const { loading, notes, fetchNotes, removeNote } = useContext(
		FirebaseContext
	)

	const modal = useContext(ModalContext)

	useEffect(() => {
		fetchNotes()
		// eslint-disable-next-line
	}, [])

	const modalHandler = () => {
		modal.show('Создание новой заметки')
	}

	return (
		<Fragment>
			<Modal>
				<Form />
			</Modal>

			<button className="btn btn-primary" onClick={modalHandler}>
				Создать заметку
			</button>
			<hr />
			{loading ? (
				<Loader />
			) : (
				<Notes notes={notes} onRemove={removeNote} />
			)}
		</Fragment>
	)
}
