import React, { useContext , useEffect } from 'react'
import DATA from '../Context/DATA/data_context'
import { useNavigate } from "react-router-dom";
import { Card, Row, Col , Button } from 'antd';
import BODY from '../Assets/Images/Blog/BODY.png'
import DIGESTIVE from '../Assets/Images/Blog/DIGESTIVE.png'
import GYANAECOLOGICAL from '../Assets/Images/Blog/GYANAECOLOGICAL.png'
import HORMONAL from '../Assets/Images/Blog/HORMONAL.png'
import KIDNEY from '../Assets/Images/Blog/KIDNEY.png'
import LIVER from '../Assets/Images/Blog/LIVER.png'
import NEUROLOGICAL from '../Assets/Images/Blog/NEUROLOGICAL.png'
import RESPIRATORY from '../Assets/Images/Blog/RESPIRATORY.png'
import SKIN from '../Assets/Images/Blog/SKIN.png'


function Blogs() {

	let navigate = useNavigate();
    const Contextdata = useContext(DATA);
    const { Blog , get_blog } = Contextdata;

    useEffect(() => {
        get_blog();
    }, [ navigate ]);

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
      };

    function Photo(index) {
        if (photos[index]) {
            let data = photos[index];
            return data.src;
        } else {
            return BODY;
        } 
    }

	return (
		<>
			<section className='w-screen flex justify-center items-center py-12'>
				<div className='w-5/6 h-auto flex justify-center items-center py-12 bg-gray-800 rounded-xl'>
					<Row gutter={[36, 36]} justify="space-around" align="middle">
						{(Blog.error === "false" && Blog.Blogs.map((Blog) =>

							<Col key={Blog.id}>
								<Card hoverable	style={{width: 240,}}
									cover={<img alt="example" className='h-64' src={Photo(Blog.url)} />}>
										<div className="w-full flex flex-col justify-center items-center">
											<p className='text-lg font-medium'>{Blog.name.toUpperCase()}</p>
											<p className='text-sm font-normal text-center mb-2'>{Blog.description}</p>
									       <Button type='primary' className='bg-sky-800 text-slate-50 h-10 flex items-center'>Read More</Button>
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