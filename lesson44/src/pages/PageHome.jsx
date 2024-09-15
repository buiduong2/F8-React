import HomeClientList from '../components/HomeClientList'
import HomeHero from '../components/HomeHero'
import HomeProjectList from '../components/HomeProjectList'
import HomeSkillList from '../components/HomeSkillList'

export default function PageHome() {
	return (
		<>
			<HomeHero />
			<HomeClientList />
			<HomeSkillList />
			<HomeProjectList />
		</>
	)
}
