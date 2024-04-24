import React from 'react';
import { Col } from 'antd';
import DIGESTIVE from '../Assets/Images/Treatments/DIGESTIVE.png'
import GYNAE from '../Assets/Images/Treatments/GYNAE.png'
import HEART from '../Assets/Images/Treatments/HEART.png'
import HORMONE from '../Assets/Images/Treatments/HORMONE.png'
import JOINTPAIN from '../Assets/Images/Treatments/JOINTPAIN.png'
import KIDNEY from '../Assets/Images/Treatments/KIDNEY.png'
import LIVER from '../Assets/Images/Treatments/LIVER.png'
import NEUROLOGICAL from '../Assets/Images/Treatments/NEUROLOGICAL.png'
import RESPIRATORY from '../Assets/Images/Treatments/RESPIRATORY.png'
import SEXUAL from '../Assets/Images/Treatments/SEXUAL TRANSMITTED.png'
import SKIN from '../Assets/Images/Treatments/SKIN.png'
import URINARY from '../Assets/Images/Treatments/URINARY.png'

function ListServices({ Data, openModal }) {

	const photos = {
		"DIGESTIVE": { src: DIGESTIVE },	
		"GYNAE": { src: GYNAE },	
		"HEART": { src: HEART },	
		"HORMONE": { src: HORMONE },	
		"JOINTPAIN": { src: JOINTPAIN },	
		"KIDNEY": { src: KIDNEY },	
		"LIVER": { src: LIVER },	
		"NEUROLOGICAL": { src: NEUROLOGICAL },	
		"RESPIRATORY": { src: RESPIRATORY },	
		"SEXUAL TRANSMITTED": { src: SEXUAL },	
		"SKIN": { src: SKIN },	
		"URINARY": { src: URINARY },	
	};

	function Photo(index) {
		if (photos[index]) {
			let data = photos[index];
			return data.src;
		} else {
			return photos.SKIN.src;
		}
	}

	return (
		<>
			{(Data.error === "false" && Data.Treatments.map((Treatment) =>

				<Col key={Treatment.id} span={12} md={12} lg={8} xl={6} xxl={4}>
					<div className='cursor-pointer w-auto h-auto p-2 rounded-lg flex justify-center items-center flex-col hover:underline' onClick={() => openModal(Treatment)}>
						<div className="w-16 h-16 mb-2"><img src={Photo(Treatment.name.toUpperCase())} alt="Brain" /></div>
						<p className='text-sm font-medium'>{Treatment.name.toUpperCase()}</p>
					</div>
				</Col>
			))
				||
				(
					<div className="container my-5">
						<h2>Services</h2>
					</div>
				)
			}
		</>
	);
}

export default ListServices;
