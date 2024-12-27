import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { Link } from "react-router-dom";
import DATA from '../Context/DATA/data_context'
import API from '../Context/API/api_context'
import { useNavigate } from "react-router-dom";

function Status() {

    let navigate = useNavigate();

    const Demo =  {
        "name": "Samarpitam",
        "phone": 7009820681,
        "DOB": "2024-03-12T18:30:00.000Z",
        "service": "65dc1d2a8a37c222fb9ce53c",
        "slot": "2024-03-02T11:14:36.145Z",
        "massage": "Not Fill",
        "status": "booking intialized",
      }

    const Booking_data = DATA.bookingData || API.bookingData || Demo;

    useEffect(() => {
        if (Booking_data.name === "Samarpitam") {
            navigate('/');  
        }
    }, [ navigate ]);

    const DOB = Booking_data?.DOB;
    const utcDOB = new Date(DOB);

    // Specify options for formatting the date
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const DOBDateString = utcDOB.toLocaleDateString('en-GB', options);

    function Slot(date) {
        var slot = date;
        console.log(date)
        var formattedSlot = slot === "1970-01-01T00:00:00.000+00:00" ? "Not Booked" : new Date(slot).toLocaleString();
        return formattedSlot
    }


    return (
        <>
            <Result
                status="success"
                title="Success! You're booked an Appointment on Samarpitam!"
                subTitle="Thank you! Your consultation appointment on Samarpitam is confirmed. Our assistant will contact you shortly for further information please wait."
                extra={[
                    <div className='flex justify-center items-center'>
                        <div className="bg-black w-full md:w-3/6 shadow-md rounded-lg overflow-hidden mb-4 text-white">
                            <div className="px-4 py-4 text-center">
                                <h2 className="mx-auto text-3xl my-4 font-semibold">{Booking_data.name.toUpperCase()}</h2>
                                <p className="text-sm mt-1"><span className='text-sm'>Email: </span>{Booking_data.email ? Booking_data.email.toUpperCase() : "Email Not Found"}</p>
                                <p className="text-sm mt-1"><span className='text-lg'>Phone: </span>{Booking_data.phone}</p>
                                <p className="text-sm mt-1"><span className='text-lg'>DOB: </span>{DOBDateString}</p>
                                { Booking_data.servicename ? 
                                <p className="text-sm mt-1"><span className='text-lg'>Treatment: </span>{Booking_data.servicename}</p>
                                : "" }
                                <p className="text-sm mt-1"><span className='text-lg'>Slot: </span>{Booking_data.slot ? Slot(Booking_data.slot) : "Not Booked"}</p>
                                <p className="text-sm mt-1"><span className='text-lg'>Booked at: </span>{new Date(Booking_data.createdAt).toLocaleString()}</p>
                                <p className="text-sm mt-1"><span className='text-lg'>Status: </span>{Booking_data.status.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>,
                    <Link to={'/'}><Button type="primary" key="console" className="bg-sky-800 border-4 h-10 text-slate-50 w-28 m-4"> Go Home </Button></Link>,
                    <Link to={"https://wa.me/7814817888"} > <Button type="primary" key="console" className="bg-sky-800 border-4 h-10 text-slate-50 w-36 m-4"> Chat on Whatsapp </Button></Link>,
                ]}
            />



        </>
    )
}

export default Status