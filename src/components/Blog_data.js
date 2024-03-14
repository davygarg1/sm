import React, { useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import DATA from '../Context/DATA/data_context'
import Modal_book from './modal_book'

function Blog_data() {

    let navigate = useNavigate();
    const Contextdata = useContext(DATA);
    const { Blog_data } = Contextdata;

    useEffect(() => {
        if (!DATA.Blog_info) {
            navigate('/');
        }
    }, [navigate]);

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
                        <div className='flex flex-col items-center justify-center py-12 bg-no-repeat bg-cover'  style={{ "background-image": `url(https://i.pinimg.com/736x/c5/16/ff/c516ff9163fefeaa5974fc7c8855cd02.jpg)` }}>
                            <p className="md:text-5xl text-3xl text-center tracking-tight font-bold">{DATA.Blog.name.toUpperCase()}</p>
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
                                                    <li key={subKey} className='text-justify'><span className='font-semibold'>{subKey.toUpperCase()}</span>: {subValue}</li>
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