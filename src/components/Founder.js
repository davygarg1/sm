import React from 'react'
import doctor from '../Assets/Images/Doctor/doctor.png'


function Founder() {


    return (
        <>
            <div className='w-screen overflow-hidden p-4 my-12 flex flex-col items-center justify-center'>

            <p className='w-5/6 md:w-4/6 mt-4 md:mb-12 flex items-center justify-center'>
                    <hr className='w-1/6 border-2 border-black mr-12 hidden md:block' />
                    <p className="text-5xl tracking-tight font-bold">Our Founder</p>
                    <hr className='w-1/6 border-2 border-black ml-12 hidden md:block' />
            </p>
                <div className='w-5/6 flex flex-col items-center justify-center'>
                <p className="md:text-2xl text-lg mt-4 mb-8 text-center">Guiding brilliance with passion and purpose || Visionary leadership shaping tomorrow's innovations.</p>
                </div>

                <div className='md:w-5/6 py-4 overflow-hidden rounded-lg bg-gray-700 border-8 border-solid border-blue-500 shadow-xl'>

                    <div className='w-full h-auto md:px-12 px-4 flex justify-center items-center text-white'>

                        <div className="flex flex-col items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-slate-400 overflow-hidden flex justify-center items-center">
                                <img src={doctor} alt="" className="w-3/4 h-auto" />
                            </div>
                            <p className='md:text-2xl text-sm font-bold mt-4'>A DREAM PROJECT of Mrs. Krishna Devi</p>
                            <p className='text-lg font-semibold mb-4 text-center'>Discover the future of healthcare at your fingertips.</p>
                            <p className='md:mt-8 mt-4 md:leading-10 text-justify'>
                                Dr. Aayushi Khandelwal, the visionary founder of our healthcare initiative, embodies a profound commitment to revolutionizing healthcare accessibility through technology. With unwavering dedication, Dr. Khandelwal pioneers a paradigm shift in healthcare provision, leveraging internet-based teleconsultation to transcend geographical barriers and deliver quality medical assistance at the fingertips of patients.

                                Her pioneering spirit and deep-rooted compassion for enhancing patient well-being drive the core ethos of our project. Dr. Khandelwal's leadership ignites a transformative journey, empowering individuals to seek timely medical guidance and support through phone consultations. Her relentless pursuit of excellence and patient-centric approach resonate at the heart of our endeavor, fostering a culture of innovation and compassion in healthcare delivery.

                                As the architect of our healthcare platform, Dr. Aayushi Khandelwal epitomizes a beacon of hope, bridging the gap between medical expertise and patient care, and shaping a brighter, healthier future for all.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Founder