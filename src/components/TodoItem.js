import React from 'react'

export default function TodoItem({ todo }) {
	return (
		<div className="todoItem-container">
			<input type="checkbox" />
			{todo}
		</div>
	)
}
