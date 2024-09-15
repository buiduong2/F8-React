import TheFooter from '../components/TheFooter'
import TheHeader from '../components/TheHeader'

// eslint-disable-next-line react/prop-types
export default function DefaultLayout({ children }) {
	return (
		<>
			<TheHeader />
			<main className="mt-16"> {children}</main>
			<TheFooter />
		</>
	)
}
