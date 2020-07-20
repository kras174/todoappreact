import React, { useReducer } from 'react'
import { ModalContext } from './modalContext'
import { modalReducer } from './modalReducer'
import { SHOW_MODAL, HIDE_MODAL } from '../types'

export const ModalState = ({ children }) => {
	const [state, dispatch] = useReducer(modalReducer, { visible: false })

	const show = (title) => {
		dispatch({
			type: SHOW_MODAL,
			payload: { title },
		})
	}

	const hide = () => dispatch({ type: HIDE_MODAL })

	return (
		<ModalContext.Provider value={{ show, hide, modal: state }}>
			{children}
		</ModalContext.Provider>
	)
}
