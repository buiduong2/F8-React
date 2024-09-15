import DefaultLayout from './layouts/DefaultLayout'
import './pages/PageHome'
import PageHome from './pages/PageHome'

function App() {
	return (
		<>
			<DefaultLayout>
				<PageHome />
			</DefaultLayout>
		</>
	)
}

export default App
