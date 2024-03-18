import React, { useState } from 'react'
import ModalScreen from './modal_book'
import { Link } from "react-router-dom";
import Treatments from './Treatments'
import Doctor from './Doctor';
import Founder from './Founder';
import Testimonials from './Testimonials'
import { Carousel } from 'antd';
import { SolutionOutlined, WhatsAppOutlined, TeamOutlined, ScheduleOutlined } from '@ant-design/icons'
import logo from '../Assets/Images/Home.png'
import Slide1 from '../Assets/Images/Slides/Slide1.png'
import Slide2 from '../Assets/Images/Slides/Slide2.png'
import Slide3 from '../Assets/Images/Slides/Slide3.png'

function Dashboard() {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const openModal = (service) => {
        setSelectedService(service);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedService(null);
    };

    return (
        <>

            <section>
                <Carousel autoplay>
                    
                    <div className="w-full h-[250px] md:h-[400px]">
                        <div className="w-full h-full flex justify-center items-center">
                            <img src={Slide2} className="object-fill w-5/6 h-4/6 rounded-3xl" alt="" />
                        </div>
                    </div>
                    <div className="w-full h-[250px] md:h-[400px]">
                        <div className="w-full h-full flex justify-center items-center">
                            <img src={Slide3} className="object-fill w-5/6 h-4/6 rounded-3xl" alt="" />
                        </div>
                    </div>
                    <div className="w-full h-[250px] md:h-[400px]">
                        <div className="w-full h-full flex justify-center items-center">
                            <img src={Slide1} className="object-fill w-5/6 h-4/6 rounded-3xl" alt="" />
                        </div>
                    </div>
                 
                </Carousel>
            </section>


            <div className="w-screen h-[30vh] flex justify-center">

                <div className="w-4/6 md:3/6 ml-4 h-full flex flex-col justify-center items-center bg-transparent">
                    <p>
                        <p className='text-lg md:text-2xl font-bold md:font-extrabold '>Consult Specialist Doctors Online</p>
                        <p className='text-sm md:text-xl mb-4 font-semibold  md:font-bold'>Expert Guidance, Always Online</p>
                        <p className='text-xs md:text-sm mb-8 font-normal md:font-semibold'>Your Wellness, Our Priority - Virtual Care, Real Results</p>
                    </p>
                    <ModalScreen visible={modalVisible} closeModal={closeModal} Footer={false} selectedService={selectedService} />
                </div>

                <div className='w-3/6 h-full flex justify-center items-center'>
                    <img src={logo} className='h-[85%] w-[300px]' alt="" />
                </div>

            </div>

            <Treatments openModal={openModal} />

            <section className='w-screen bg-transparent mt-8 py-8 overflow-hidden'>

                <div className='flex flex-col items-center justify-center'>
                    <p className="md:text-5xl text-3xl text-center tracking-tight font-bold">Steps to Get Your Doctor Consultation</p>
                    <p className="md:w-4/6 w-5/6 md:text-2xl text-lg my-4 mb-8 text-center">No two Individual are alike.Samarpitam examine patients and diseases with the aim to diagnose root causes, offer personalized treatment, and provide individualized care.</p>
                </div>

                <div className='w-full h-4/6 flex flex-col md:flex-row justify-center items-center text-center'>
                    <div className="w-full h-2/6 md:h-full md:w-2/6 flex items-center justify-center">
                        <Link to="https://wa.me/9815209389">
                        <div className='w-full h-full flex flex-col items-center'>
                            <span className='p-6 bg-gray-700 rounded-lg'><WhatsAppOutlined className='scale-150 text-white' /></span>
                            <p className='pt-4 text-2xl font-bold'>Connect</p>
                            <p className='p-4 text-sm font-normal'>Call, Message <br /> or Chat</p>
                            {/* <p className='text-sm font-semibold p-2 text-blue-500 border border-solid border-white rounded-md hover:text-white cursor-pointer'>Support@samarpitam.com</p> */}
                        </div>
                        </Link>
                    </div>
                    <div className="w-full h-2/6 md:h-full md:w-2/6 flex items-center justify-center">
                        <div className='w-full h-full flex flex-col items-center'>
                            <span className='p-6 bg-gray-700 rounded-lg'><SolutionOutlined className='scale-150 text-white' /></span>
                            <p className='pt-4 text-2xl font-bold'>Health Coach</p>
                            <p className='p-4 text-sm font-normal'>Health Coach will be Assigned to you.</p>
                            {/* <p className='text-sm font-semibold p-2 text-blue-500 border border-solid border-white rounded-md hover:text-white cursor-pointer'>9815209389</p> */}
                        </div>
                    </div>
                    <div className="w-full h-2/6 md:h-full md:w-2/6 flex items-center justify-center">
                        <div className='w-full h-full flex flex-col items-center'>
                            <span className='p-6 bg-gray-700 rounded-lg'><ScheduleOutlined className='scale-150 text-white' /></span>
                            <p className='pt-4 text-2xl font-bold'>Appointment</p>
                            <p className='p-4 text-sm font-normal'>At your convenient time with Samarpitam.</p>
                            {/* <p className='text-sm font-semibold p-2 text-blue-500 border border-solid border-white rounded-md hover:text-white cursor-pointer'>9815209389</p> */}
                        </div>
                    </div>
                    <div className="w-full h-2/6 md:h-full md:w-2/6 flex items-center justify-center">
                        <div className='w-full h-full flex flex-col items-center'>
                            <span className='p-6 bg-gray-700 rounded-lg'><TeamOutlined className='scale-150 text-white' /></span>
                            <p className='pt-4 text-2xl font-bold'>Consult</p>
                            <p className='p-4 text-sm font-normal'>Receive Personalised Doctor Consultation.</p>
                            {/* <Link to={"https://wa.me/9815209389"} ><p className='text-sm font-semibold p-2 text-blue-500 border border-solid border-white  rounded-md hover:text-white cursor-pointer'>Chat on Whatsapp</p></Link> */}
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-transparent">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">OUR AIM</h2>
                        <p className="mb-8 font-light text-gray-900 lg:mb-16 sm:text-xl dark:text-gray-400">"स्वास्थस्य स्वास्थ्य रक्षणं आतुरस्य विकार प्रशमनं च"</p>
                    </div>
                    <div className='w-full py-2 flex justify-center items-center text-white bg-gray-900 rounded-2xl overflow-hidden'>

                        <section className="bg-transparent dark">
                            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-12 lg:px-6">
                                <figure className="max-w-screen-md mx-auto">

                                    <blockquote>
                                        <p className="text-2xl font-medium text-gray-900 dark:text-white text-justify mx-4">Ayurveda is not about only treatment, It is about how to live .So, our mission is to provide the best information about lifestyle and how to prevent disease & keep ourselves healthy. We hold sacred the physician patient relationship that’s based on trust, dignity and mutual respect.</p>
                                    </blockquote>

                                </figure>
                            </div>
                        </section>

                    </div>
                </div>
            </section>


            <section className="bg-transparent">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm">
                        <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">OUR PERSPECTIVE</h2>
                        <p className="mb-8 font-light text-black lg:mb-16 sm:text-xl dark:text-gray-400">"हम समर्पित हैं साझेदारी में, मरीजों की जरूरतों पर ध्यान केंद्रित करते हैं। स्वास्थ्य को बेहतर बनाने के साथ-साथ, हम सेहत सेवा के अच्छे अनुभव को भी प्राथमिकता देते हैं।"</p>
                    </div>
                    <div className='w-full py-2 flex justify-center items-center text-white bg-gray-900 rounded-2xl overflow-hidden'>

                        <section className="bg-transparent dark">
                            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-12 lg:px-6">
                                <figure className="max-w-screen-md mx-auto">

                                    <blockquote>
                                        <p className="text-2xl font-medium text-gray-900 dark:text-white text-justify mx-4">We believe in team work and focusing on patient’s needs. We treat every patient in a way as we would want ourselves or our family members to be treated. We provide not just better health outcome but also a better healthcare experience.</p>
                                    </blockquote>

                                </figure>
                            </div>
                        </section>

                    </div>
                </div>
            </section>


            <Doctor />
            <Founder />
            <Testimonials />

        </>
    );
}

export default Dashboard;
