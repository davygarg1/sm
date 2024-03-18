import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import DATA from '../Context/DATA/data_context'
import Modal_book from './modal_book'
import bg from '../Assets/Images/Blog_info/bg.jpg'
import PCOS  from '../Assets/Images/Blog_info/pcod.png';
import leucorrhea  from '../Assets/Images/Blog_info/leucorrhea.png';
import Kidney  from '../Assets/Images/Blog_info/Kidney stones.png';
import ULCERATIVE  from '../Assets/Images/Blog_info/Ulcerative.png';
import Irritable  from '../Assets/Images/Blog_info/IBS.png';
import Depression  from '../Assets/Images/Blog_info/Depression.png';
import piles  from '../Assets/Images/Blog_info/piles.png';
import Fatty  from '../Assets/Images/Blog_info/fatty liver.png';
import Asthma  from '../Assets/Images/Blog_info/Asthma.png';
import Sinusitis  from '../Assets/Images/Blog_info/Sinusitis.png';
import Migraine  from '../Assets/Images/Blog_info/Migrain.png';
import Thyroid  from '../Assets/Images/Blog_info/Thyroid.png';
import Obesity  from '../Assets/Images/Blog_info/obesity.png';
import Vitiligo  from '../Assets/Images/Blog_info/vitiligo.png';
import Rheumatoid from '../Assets/Images/Blog_info/jointpain.png';
import Psoriasis  from '../Assets/Images/Blog_info/psoriasis.png';
import Urinary  from '../Assets/Images/Blog_info/urinary infection.png';
import Acne  from '../Assets/Images/Blog_info/arthritis.png';
import Diabetes from '../Assets/Images/Blog_info/Diabetes.png';
import Gout from '../Assets/Images/Blog_info/gout.png';
import Osteo from '../Assets/Images/Blog_info/osteoarthritis.png';

import Neuralgia from '../Assets/Images/Blog_info/Neuralgia.jpg';
import Sciatica from '../Assets/Images/Blog_info/Sciatica.jpg';
import Cervical from '../Assets/Images/Blog_info/Cervical.jpg';
import Jaundice  from '../Assets/Images/Blog_info/Jaundice.jpg';
import Hypertension  from '../Assets/Images/Blog_info/Hypertension.jpg';
import Infertility from '../Assets/Images/Blog_info/Infertility.jpg';
import Eczema  from '../Assets/Images/Blog_info/Eczema.jpg';

function Blog_data() {

    let navigate = useNavigate();

    useEffect(() => {
        if (!DATA.Blog_info) {
            navigate('/');
        }
    }, [navigate]);

    const photos = {
		"PCOS": { src: PCOS },
		"leucorrhea": { src: leucorrhea },
		"Kidney stones": { src: Kidney },
		"ULCERATIVE COLITIS": { src: ULCERATIVE },
		"Irritable Bowel Syndromme": { src: Irritable },
		"Depression": { src: Depression },
		"piles": { src: piles },
		"Fatty liver": { src: Fatty },
		"Jaundice": { src: Jaundice },
		"Asthma": { src: Asthma },
		"Sinusitis": { src: Sinusitis },
		"Migraine": { src: Migraine },
		"Thyroid": { src: Thyroid },
		"Obesity": { src: Obesity },
		"Vitiligo": { src: Vitiligo },
		"Psoriasis": { src: Psoriasis },
		"Hypertension": { src: Hypertension },
		"Urinary Tract Infection": { src: Urinary },
		"Acne": { src: Acne },
		"Eczema": { src: Eczema },
		"Neuralgia Pain": { src: Neuralgia },
		"Sciatica Pain": { src: Sciatica },
		"Diabetes": { src: Diabetes },
		"Infertility": { src: Infertility },
		"Gout": { src: Gout },
		"Cervical": { src: Cervical },
		"Rheumatoid Arthritis": { src: Rheumatoid },
		"Osteo Arthritis": { src: Osteo },
	};

    function Photo(index) {
        if (photos[index]) {
            let data = photos[index];
			return data.src;
		} else {
			return bg;
		}
	}

    function DOP(DOP) {
		const utcDOB = new Date(DOP);
		// Specify options for formatting the date
		const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		const DOBDateString = utcDOB.toLocaleDateString('en-GB', options);
		return DOBDateString;
	}


    return (
        <>
            {DATA.Blog &&

                <>
                    <section className='w-screen bg-transparent overflow-hidden'>

                        {/* <div className='flex flex-col items-center justify-center bg-red-400 py-12'> */}
                        <div className='flex flex-col items-center justify-center py-12 min-h-[500px] bg-no-repeat bg-cover'  style={{ "background-image": `url(${Photo(DATA.Blog_info.name)})` ,  "backgroundPosition": 'center'  }}>
                            <p className="md:text-5xl text-3xl text-center font-bold">{DATA.Blog.name.toUpperCase()}</p>
                            <p className="md:w-4/6 w-5/6 md:text-2xl text-lg my-4 text-center">{DATA.Blog.description}</p>
                            <p className="md:w-4/6 w-5/6 md:text-2xl text-lg mb-8 text-center">{DATA.Blog_info.name.toUpperCase()}</p>
                            <Modal_book Footer={true}/>
                        </div>

                        <div className='w-full h-auto flex-row justify-center items-center'>
                            {Object.entries(DATA.Blog_info.description).map(([key, value]) => (
                                <div key={key} className='w-full h-auto overflow-hidden'>
                                    <p className='text-2xl font-bold m-8'>{key.toUpperCase()}</p>

                                    {Array.isArray(value) ? (
                                        <ul className='mx-16 list-disc'>
                                            {value.map((item, index) => (
                                                <li key={index} className='text-justify' >{item}</li>
                                            ))}
                                        </ul>

                                    ) : typeof value === 'object' ? (

                                            <ul className='mx-12 list-decimal'>

                                                {Object.entries(value).map(([subKey, subValue]) => (
                                                    <li key={subKey} className='text-justify'><span className='font-semibold text-sky-800'>{subKey.toUpperCase()}</span>: {subValue}</li>
                                                ))}

                                            </ul>

                                    ) : (
                                        <p className='mx-12 text-justify'>{value}</p>
                                    )}


                                </div>
                            ))}

                            <div className='m-8 flex justify-start items-center'><p className='font-bold'>Publish Date</p><p className='mx-4'>{DOP(DATA.Blog_info.createdAt)}</p></div>

                        </div>
                    </section>
                </>

                ||

                (
                    <div className="w-full h-auto py-8 my-8 bg-sky-200 flex-row items-center border border-black border-solid">
                        <p className=' px-8 text-5xl font-normal leading-tight tracking-widest'>BLOG NOT FOUND</p>
                    </div>
                )
            }

        </>
    )
}

export default Blog_data