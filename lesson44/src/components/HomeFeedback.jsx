import { Typography } from '@material-tailwind/react'

export default function HomeFeedBack() {
	const avatars = [
		{
			id: 1,
			url: '/images/avatar1.jpg'
		},
		{
			id: 2,
			url: '/images/avatar2.jpg'
		},
		{
			id: 3,
			url: '/images/avatar3.jpg'
		}
	]

	function changeAvatar(event) {
		const avatarSmalls = document.querySelectorAll(
			'[data-class="avatar-small"]'
		)

		avatarSmalls.forEach(avatar => {
			avatar.classList.add('opacity-50')
		})

		event.currentTarget.classList.remove('opacity-50')
		const avatarBig = document.querySelector('[data-id="avatar-big"]')
		avatarBig.src = event.currentTarget.src
	}

	return (
		<section className="mx-8 my-24">
			<div className="container mx-auto max-w-screen-lg">
				<div className="mx-auto mb-20 flex flex-col items-center text-center">
					<Typography variant="h2" color="blue-gray" className="mb-4">
						What Clients Say
					</Typography>
					<Typography variant="lead" color="gray" className="lg:w-2/3">
						Discover what clients have to say about their
						experiences working with me. My client&rsquo;s
						satisfaction is my greatest achievement!
					</Typography>
				</div>

				<div className="mx-6 my-14 gap-10 grid lg:grid-cols-2">
					<div className="flex flex-col justify-center">
						<Typography
							variant="h3"
							color="blue-gray"
							className="mb-4 lg:w-1/2"
						>
							Mobile App Development
						</Typography>
						<Typography
							variant="paragraph"
							color="gray"
							className="mb-3 lg:w-3/4"
						>
							I had the pleasure of working with Lily on a
							critical web development project, and I can
							confidently say that their expertise and
							professionalism exceeded my expectations
						</Typography>
						<Typography
							variant="h6"
							color="blue-gray"
							className="mb-0.5"
						>
							Michael - Technical Manager
						</Typography>
						<Typography
							variant="paragraph"
							color="gray"
							className="mb-5"
						>
							Marketing @ APPLE INC.
						</Typography>

						<ul className="mb-2 flex gap-4">
							{avatars.map((avatar, index) => (
								<li
									key={avatar.id}
									className="relative cursor-pointer"
								>
									<img
										src={avatar.url}
										alt="Spotify"
										data-class="avatar-small"
										className={`size-9 rounded-lg ${index != 0 && 'opacity-50'} hover:opacity-100`}
										onClick={changeAvatar}
									/>
									<div
										className={`absolute -left-2 top-0 h-full w-[0.5px] bg-blue-gray-100 ${index == 0 && 'hidden'}`}
									></div>
								</li>
							))}
						</ul>
					</div>
					<div className="shrink-0 lg:h-[340px] lg:w-[290px]">
						<img
							src={avatars[0].url}
							alt="spotify"
							className="h-full rounded-lg object-cover"
							data-id="avatar-big"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
