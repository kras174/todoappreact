import React, { useReducer } from 'react'
import axios from 'axios'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { SHOW_LOADER, REMOTE_NOTE, ADD_NOTE, FETCH_NOTES } from '../types'

const url = process.env.REACT_APP_DB_URL

export const FirebaseState = ({ children }) => {
	const initialState = {
		notes: [],
		loading: false,
	}
	const [state, dispatch] = useReducer(firebaseReducer, initialState)

	const showLoader = () => dispatch({ type: SHOW_LOADER })
	const fetchNotes = async () => {
		showLoader()
		try {
			const res = await axios.get(`${url}/notes.json`)
			console.log(res)
			if (res.data) {
				const payload = Object.keys(res.data).map((key) => {
					return {
						...res.data[key],
						id: key,
					}
				})
				dispatch({ type: FETCH_NOTES, payload })
			} else {
				//TODO: придумать что то если заметок нет
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
		} catch (e) {
			throw new Error(e.message)
		}
	}
	const removeNote = async (id) => {
		try {
			await axios.delete(`${url}/notes/${id}.json`)

			dispatch({ type: REMOTE_NOTE, payload: id })
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
				loading: state.loading,
				notes: state.notes,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	)
}
