import React, { useContext, Fragment } from 'react'
import { ModalContext } from '../../context/modal/modalContext'

const Modal = ({ children }) => {
	const { modal, hide } = useContext(ModalContext)

	return (
		<Fragment>
			{modal.visible && (
				<div className="my-modal">
					<div className="modal-container">
						<div className="modal-title-container">
							<h2>
								{modal.title
									? modal.title
									: 'Заголовок модалки'}
							</h2>
						</div>
						{children && (
							<div className="modal-children-container">
								{children}
							</div>
						)}
						<button
							onClick={hide}
							type="button"
							className="close"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-background" onClick={hide}></div>
				</div>
			)}
		</Fragment>
	)
}
export default Modal
