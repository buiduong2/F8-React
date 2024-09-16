import HomeHero from '../components/HomeHero'
import HomeClientList from '../components/HomeClientList'
import HomeSkillList from '../components/HomeSkillList'
import HomeBlogList from '../components/HomeBlogList'
import HomeResume from '../components/HomeResume'
import HomeFeedBack from '../components/HomeFeedBack'
import HomeClientListGrayScale from '../components/HomeClientListGrayScale'
import HomeContract from '../components/HomeContract'
import {
	RectangleGroupIcon,
	FingerPrintIcon,
	SwatchIcon,
	HashtagIcon,
	EyeIcon,
	DocumentTextIcon,
	ChartBarIcon,
	PuzzlePieceIcon,
	CursorArrowRaysIcon,
	PhoneIcon,
	EnvelopeIcon,
	TicketIcon
} from '@heroicons/react/24/solid'
export default function PageHome() {
	const logos = [
		'logos/logo-coinbase.svg',
		'logos/logo-spotify.svg',
		'logos/logo-pinterest.svg',
		'logos/logo-google.svg',
		'logos/logo-amazon.svg',
		'logos/logo-netflix.svg'
	]

	const skills = [
		{
			id: 1,
			icon: RectangleGroupIcon,
			title: 'Frontend Web Development:',
			desc: 'Creating beautiful and functional web experiences is my forte. Using the latest technologies and best practices, I design and build websites that captivate and engage users.'
		},
		{
			id: 2,
			icon: FingerPrintIcon,
			title: 'Mobile App Development',
			desc: 'I specialize in creating responsive and intuitive mobile apps that work seamlessly across iOS & Android devices. From concept to deployment, I handle every stage of the development process.'
		},
		{
			id: 3,
			icon: SwatchIcon,
			title: 'Technology Stack',
			desc: "I'm well-versed in the industry's most popular frontend technologies, including HTML5, CSS3, JavaScript, and frameworks like React and React Native."
		},
		{
			id: 4,
			icon: HashtagIcon,
			title: 'Web Optimization',
			desc: 'Performance matters. I optimize websites and apps for speed, ensuring your users enjoy a fast and responsive experience, which in turn boosts user satisfaction and SEO rankings.'
		},
		{
			id: 5,
			icon: EyeIcon,
			title: 'User-Centric Design',
			desc: 'My development goes hand-in-hand with an eye for design. I create user interfaces that are not only functional but also aesthetically pleasing, providing a seamless and enjoyable user journey.'
		},
		{
			id: 6,
			icon: DocumentTextIcon,
			title: 'Testing and Quality Assurance',
			desc: 'I rigorously test and debug applications to guarantee a bug-free and secure environment for users. Your peace of mind is as important to me as the functionality of your project.'
		}
	]

	const blogs = [
		{
			id: 1,
			imgUrl: 'images/blog1.svg',
			title: 'Mobile App Development',
			desc: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
			herf: '#'
		},
		{
			id: 2,
			imgUrl: 'images/blog2.svg',
			title: 'Landing Page Development',
			desc: 'Promotional landing page for a fitness website Summer Campaign. Form development included.',
			herf: '#'
		},

		{
			id: 3,
			imgUrl: 'images/blog3.svg',
			title: 'Landing Page Development',
			desc: 'Promotional landing page for a fitness website Summer Campaign. Form development included.',
			herf: '#'
		},

		{
			id: 4,
			imgUrl: 'images/blog4.svg',
			title: 'E-commerce development',
			desc: 'Ecommerce website offering access to the latest and greatest gadgets and accessories.',
			herf: '#'
		},

		{
			id: 5,
			imgUrl: 'images/blog1.svg',
			title: 'Mobile App Development',
			desc: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
			herf: '#'
		},
		{
			id: 6,
			imgUrl: 'images/blog2.svg',
			title: 'Landing Page Development',
			desc: 'Promotional landing page for a fitness website Summer Campaign. Form development included.',
			herf: '#'
		},

		{
			id: 7,
			imgUrl: 'images/blog3.svg',
			title: 'Landing Page Development',
			desc: 'Promotional landing page for a fitness website Summer Campaign. Form development included.',
			herf: '#'
		},

		{
			id: 8,
			imgUrl: '/images/blog4.svg',
			title: 'E-commerce development',
			desc: 'Ecommerce website offering access to the latest and greatest gadgets and accessories.',
			herf: '#'
		}
	]

	const certs = [
		{
			id: 1,
			label: 'Bachelor of Science in Computer Science',
			icon: ChartBarIcon
		},
		{
			id: 2,
			label: 'Certified Web Developer',
			icon: PuzzlePieceIcon
		},
		{
			id: 3,
			label: 'Frontend Framework Proficiency Certification',
			icon: CursorArrowRaysIcon
		}
	]

	const avatars = [
		{
			id: 1,
			url: 'images/avatar1.jpg'
		},
		{
			id: 2,
			url: 'images/avatar2.jpg'
		},
		{
			id: 3,
			url: 'images/avatar3.jpg'
		}
	]

	const contracts = [
		{ id: 1, icon: PhoneIcon, label: '+1(424) 535 3523' },
		{ id: 2, icon: EnvelopeIcon, label: 'hello@mail.com' },
		{ id: 3, icon: TicketIcon, label: 'Open Support Ticket' }
	]

	const formJobs = [
		{
			id: 1,
			label: 'Design',
			value: '1'
		},
		{
			id: 2,
			label: 'Development',
			value: '2'
		},
		{
			id: 3,
			label: 'Support',
			value: '3'
		},
		{
			id: 4,
			label: 'Other',
			value: '0'
		}
	]

	return (
		<>
			<HomeHero />
			<HomeClientList logos={logos} />
			<HomeSkillList skills={skills} />
			<HomeBlogList blogs={blogs} />
			<HomeResume certs={certs} />
			<HomeFeedBack avatars={avatars} />
			<HomeClientListGrayScale logos={logos} />
			<HomeContract contracts={contracts} formJobs={formJobs} />
		</>
	)
}
