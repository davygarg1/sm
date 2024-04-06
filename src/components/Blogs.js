import React, { useContext, useEffect } from 'react'
import DATA from '../Context/DATA/data_context'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button } from 'antd';
import BODY from '../Assets/Images/Blog/BODY.png'
import DIGESTIVE from '../Assets/Images/Blog/DIGESTIVE.png'
import GYANAECOLOGICAL from '../Assets/Images/Blog/GYANAECOLOGICAL.png'
import HORMONAL from '../Assets/Images/Blog/HORMONAL.png'
import KIDNEY from '../Assets/Images/Blog/KIDNEY.png'
import LIVER from '../Assets/Images/Blog/LIVER.png'
import NEUROLOGICAL from '../Assets/Images/Blog/NEUROLOGICAL.png'
import RESPIRATORY from '../Assets/Images/Blog/RESPIRATORY.png'
import SKIN from '../Assets/Images/Blog/SKIN.png'
import URINARY from '../Assets/Images/Blog/URINARY.png'
import JOINTS_PAIN from '../Assets/Images/Blog/JOINTS PAIN.png'
import CARDIAC from '../Assets/Images/Blog/CARDIAC.png'
import Male from '../Assets/Images/Blog/Male.png'


function Blogs() {

	let navigate = useNavigate();
	const Contextdata = useContext(DATA);
	const { Blog, get_blog, get_Blog_Data } = Contextdata;

	useEffect(() => {
		get_blog();
	}, [navigate]);

	function DOP(DOP) {
		const utcDOB = new Date(DOP);
		// Specify options for formatting the date
		const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		const DOBDateString = utcDOB.toLocaleDateString('en-GB', options);
		return DOBDateString;
	}

	const photos = {
		"DIGESTIVE": { src: DIGESTIVE },
		"HORMONAL": { src: HORMONAL },
		"GYANAECOLOGICAL": { src: GYANAECOLOGICAL },
		"KIDNEY": { src: KIDNEY },
		"LIVER": { src: LIVER },
		"NEUROLOGICAL": { src: NEUROLOGICAL },
		"RESPIRATORY": { src: RESPIRATORY },
		"SKIN": { src: SKIN },
		"URINARY": { src: URINARY },
		"JOINTS_PAIN": { src: JOINTS_PAIN },
		"CARDIAC": { src: CARDIAC },
		"Male": { src: Male },
	};

	function Photo(index) {
		if (photos[index]) {
			let data = photos[index];
			return data.src;
		} else {
			return BODY;
		}
	}

	function Bloggo( value ) {
		DATA.Blog = value;
		get_Blog_Data(value , 'success');
		navigate('/Blog_info');
	}

	return (
		<>
			<section className='w-screen flex flex-col justify-center items-center py-12'>
				<div className="mx-auto max-w-screen-sm text-center">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">BLOG</h2>
					<p className="mb-8 font-light text-black lg:mb-16 sm:text-xl">Unlocking Knowledge: Dive into Our Blog for Engaging Insights and Inspirational Stories.</p>
				</div>
				<div className='w-5/6 h-auto flex justify-center items-center p-12 bg-gray-800 rounded-xl'>
					<Row gutter={[36, 36]} justify="space-around" align="middle">
						{(Blog.error === "false" && Blog.Blogs.map((Blog) =>
							<Col key={Blog.id}>
								<Card hoverable style={{ width: 240, height: 380 }}
									cover={<img alt="example" className='h-64 overflow-hidden' src={Photo(Blog.url)} />}>
									<div className="w-full flex flex-col justify-center items-center">
										{/* <div className='h-16'>
											<p className='text-lg font-medium text-center'>{Blog.name.toUpperCase()}</p>
											<p className='text-sm font-normal text-center mb-2'>{Blog.description}</p>
										</div> */}
										<Button type='primary' onClick={()=>Bloggo(Blog)} className='bg-sky-800 text-slate-50 h-10 flex items-center '>Read More</Button>
										<div className='w-full flex justify-between items-center mt-4'><p>Publish Date</p><p>{DOP(Blog.createdAt)}</p></div>
									</div>
								</Card>
							</Col>

						)) ||

							(
								<div className="container my-5">
									<h2>Blogs</h2>
								</div>
							)
						}

					</Row>
				</div>
			</section>


		</>
	)
}

export default Blogs