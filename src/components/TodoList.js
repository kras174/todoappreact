import React, { Fragment } from 'react'
// import TodoItem from './TodoItem'

export default function TodoList({ todos }) {
	return (
		<Fragment>
			<div className="todoList-container">
				{todos
					? todos.map((todo, index) => (
							<div key={index} className="todoItem-container">
								<div className="form-check">
									<ul>
										{/* <label className="form-check-label">
										<input
											type="checkbox"
											className="form-check-input"
											id="todoCheck"
										/>
										{todo}
									</label> */}

										<li
											className="not-complited"
											key={index}
										>
											{todo}
										</li>
									</ul>
								</div>
							</div>
					  ))
					: null}
			</div>
		</Fragment>
	)
}
