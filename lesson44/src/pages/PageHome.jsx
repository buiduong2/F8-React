import HomeHero from '../components/HomeHero'
import HomeClientList from '../components/HomeClientList'
import HomeSkillList from '../components/HomeSkillList'
import HomeBlogList from '../components/HomeBlogList'
import HomeResume from '../components/HomeResume'
import HomeFeedBack from '../components/HomeFeedBack'
import HomeClientList2 from '../components/HomeClientList2'
import HomeContract from '../components/HomeContract'

export default function PageHome() {
	return (
		<>
			<HomeHero />
			<HomeClientList />
			<HomeSkillList />
			<HomeBlogList />
			<HomeResume />
			<HomeFeedBack />
			<HomeClientList2 />
			<HomeContract />
		</>
	)
}
