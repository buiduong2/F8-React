import Board from './components/Board'

function App() {
	return (
		<div className="h-full bg-pink-550">
			<header className="flex h-[10%] items-center justify-center border-b border-b-slate-300 bg-pink-800/50 p-6 text-lg font-bold text-white">
				MY TODO
			</header>
			<Board />
		</div>
	)
}

export default App
