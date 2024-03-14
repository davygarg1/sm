import React, { useContext, useEffect } from 'react'
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import DATA from '../Context/DATA/data_context'
import { useNavigate } from "react-router-dom";


function Testimonials() {

	let navigate = useNavigate();
	const Contextdata = useContext(DATA);
	const { get_Testimonials, Testimonials } = Contextdata;

	useEffect(() => {
		get_Testimonials();
	}, [navigate]);

	let star = [<StarFilled />, <StarFilled />, <StarFilled />, <StarFilled />, <StarFilled />, <StarOutlined />, <StarOutlined />, <StarOutlined />, <StarOutlined />, <StarOutlined />]

	function StarRating(count) {
		const filledStars = star.slice(0, count);
		const outlinedStars = star.slice(5, 10 - count);
		return filledStars.concat(outlinedStars);
	}


	return (
		<>

			<section className="bg-transparent">

				<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
					<div className="mx-auto max-w-screen-sm">
						<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Testimonials</h2>
						<p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Delve into the sweetness of SAMARPITAM's offerings and share your delectable experiences.</p>
					</div>

					<Carousel autoplay>

						{(Testimonials.error === "false" && Testimonials.Testimonial.map((Testimonials) =>

							<>

								<div className='w-full py-2 flex justify-center items-center text-white bg-gray-900 rounded-2xl overflow-hidden'>

									<section className="bg-transparent dark">
										<div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-12 lg:px-6">
											<figure className="max-w-screen-md mx-auto">
												<svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
												</svg>
												<blockquote>
													<p className="text-2xl font-medium text-gray-900 dark:text-white">{Testimonials.massage}</p>
												</blockquote>
												<figcaption className="flex items-center justify-center mt-6 space-x-3">
													<photo className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" ></photo>
													<div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
														<div className="pr-3 font-medium text-gray-900 dark:text-white">{Testimonials.name}</div>
														<div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">{StarRating(Testimonials.star).map((starComponent, index) => <span key={index}>{starComponent}</span>)}  {Testimonials.star}.0</div>
													</div>
												</figcaption>
											</figure>
										</div>
									</section>

								</div>

							</>

						))
							||
							(
								<div className="container my-5">
									<h2>Testimonials</h2>
								</div>
							)
						}

					</Carousel>


				</div>
			</section>

		</>
	)
}

export default Testimonials