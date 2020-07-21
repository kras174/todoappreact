import React, { useReducer } from 'react'
import axios from 'axios'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import {
	SHOW_LOADER,
	HIDE_LOADER,
	REMOTE_NOTE,
	ADD_NOTE,
	FETCH_NOTES,
	UPDATE_NOTE,
} from '../types'

const url = process.env.REACT_APP_DB_URL

export const FirebaseState = ({ children }) => {
	const initialState = {
		notes: [],
		loading: false,
	}
	const [state, dispatch] = useReducer(firebaseReducer, initialState)

	const showLoader = () => dispatch({ type: SHOW_LOADER })
	const hideLoader = () => dispatch({ type: HIDE_LOADER })
	const fetchNotes = async () => {
		try {
			showLoader()
			const res = await axios.get(`${url}/notes.json`)
			if (res.data) {
				const payload = Object.keys(res.data).map((key) => {
					return {
						...res.data[key],
						id: key,
					}
				})
				dispatch({ type: FETCH_NOTES, payload })
			} else {
				hideLoader()
			}
		} catch (e) {
			throw new Error(e.message)
		}
	}
	const addNote = async (title, todos) => {
		const note = {
			title,
			todos,
			date: new Date().toJSON(),
		}

		try {
			const res = await axios.post(`${url}/notes.json`, note)
			const payload = {
				...note,
				id: res.data.name,
			}

			dispatch({ type: ADD_NOTE, payload })
			if (state.notes.length === 0) fetchNotes()
		} catch (e) {
			throw new Error(e.message)
		}
	}
	const removeNote = async (id) => {
		try {
			await axios.delete(`${url}/notes/${id}.json`)

			dispatch({ type: REMOTE_NOTE, payload: id })
			if (state.notes.length === 0) fetchNotes()
		} catch (e) {
			throw new Error(e.message)
		}
	}
	const updateNote = async (id, title, todos) => {
		const note = {
			title,
			todos,
		}

		try {
			await axios.patch(`${url}/notes/${id}.json`, note)

			dispatch({ type: UPDATE_NOTE, payload: state.notes })
		} catch (e) {
			throw new Error(e.message)
		}
	}

	return (
		<FirebaseContext.Provider
			value={{
				showLoader,
				addNote,
				removeNote,
				fetchNotes,
				updateNote,
				loading: state.loading,
				notes: state.notes,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	)
}
