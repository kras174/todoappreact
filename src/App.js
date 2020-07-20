import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import EditTodo from './pages/EditTodo'
import { Navbar } from './components/Navbar'
import { Alert } from './components/Alert'
import { AlertState } from './context/alert/AlertState'
import { FirebaseState } from './context/firebase/FirebaseState'
import { ModalState } from './context/modal/ModalState'

function App() {
	return (
		<FirebaseState>
			<AlertState>
				<ModalState>
					<BrowserRouter>
						<Navbar />
						<div className="main container pt-4">
							<Alert />
							<Switch>
								<Route path={'/'} exact component={Home} />
								<Route path={'/about'} component={About} />
								<Route path={'/:id'} component={EditTodo} />
							</Switch>
						</div>
					</BrowserRouter>
				</ModalState>
			</AlertState>
		</FirebaseState>
	)
}

export default App
