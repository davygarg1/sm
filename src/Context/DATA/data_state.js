import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Data from './data_context'
import axios from "axios";
import API from "../API/api_context";

function DATA(props) {

    let navigate = useNavigate();
    const [Doctor, setDoctor] = useState({});
    const [Treatments, setTreatments] = useState({});
    const [Testimonials, setTestimonials] = useState({});
    const [Blog, setBlog] = useState({});
    const host = process.env.REACT_APP_API_URL;
    const Contextdata = useContext(API);
    const { openNotificationWithIcon } = Contextdata;

    async function get_Doctor() {
        try {
            const customConfig = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const respose = await axios.get(
                `${host}/api/Data/Doctor`,
                customConfig
            );
            const json = await respose.data;
            setDoctor(json);

        } catch (error) {
            navigate("/");
            openNotificationWithIcon("error", "Doctor", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
        }
    }

    async function get_blog() {
        try {
            const customConfig = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const respose = await axios.get(
                `${host}/api/Data/Blog`,
                customConfig
            );
            const json = await respose.data;
            setBlog(json);

        } catch (error) {
            navigate("/");
            openNotificationWithIcon("error", "Blog", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
        }
    }
    
    async function get_Testimonials() {
        try {
            const customConfig = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const respose = await axios.get(
                `${host}/api/Data/Testimonials`,
                customConfig
            );
            const json = await respose.data;
            setTestimonials(json);

        } catch (error) {
            navigate("/");
            openNotificationWithIcon("error", "Testimonials", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
        }
    }

    async function get_Treatments() {
        try {
            const customConfig = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const respose = await axios.get(
                `${host}/api/Data/Treatments`,
                customConfig
            );
            const json = await respose.data;
            setTreatments(json);

        } catch (error) {
            navigate("/");
            openNotificationWithIcon("error", "Services", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
        }
    }

    async function ConsultationFn(values, bool) {
        try {
            if (bool === "success") {

                //  checking not req fileds

                const { name, phone, email, dob , massage } = values.user;
                const { service } = values;
                const booking_details = { name, phone, "DOB":dob };

                const date = new Date(dob);
                const options = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                };
                const localizedDateString = date.toLocaleDateString(undefined, options);
                
                booking_details.DOB = localizedDateString;
                if (email) { booking_details.email = email.toLowerCase() };
                if (service) { booking_details.service = service };
                if (massage) { booking_details.massage = massage };
                if (localStorage.getItem("token") && localStorage.getItem("user_id")) { booking_details.userid = localStorage.getItem("user_id") };

                const customConfig = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const respose = await axios.post(
                    `${host}/api/consultation/Book`,
                    booking_details,
                    customConfig
                );
                const json = await respose.data;

                if (json.error === "false") {
                    Data.bookingData = json.booking_details;
                    navigate('/Status');
                    openNotificationWithIcon(
                        bool,
                        "Consultation",
                        "Booking Initialized",
                        "bottomLeft"
                    );
                }
            } else {
                openNotificationWithIcon(
                    "error",
                    "Consultation",
                    "Booking Initialize failed",
                    "bottomLeft"
                );
            }
        } catch (error) {
            openNotificationWithIcon("error", "Consultation", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
        }
    }

    async function TestimonialsFn(values, bool) {
        try {
            if (bool === "success") {

                //  checking not req fileds

                const { name, star , massage } = values;
                const Testimonial_details = { name , star };
                if (massage) { Testimonial_details.massage = massage };
                if (localStorage.getItem("token") && localStorage.getItem("user_id")) { Testimonial_details.userid = localStorage.getItem("user_id") };

                const customConfig = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const respose = await axios.post(
                    `${host}/api/consultation/Testimonial`,
                    Testimonial_details,
                    customConfig
                );

                const json = await respose.data;
                console.log(json)

                if (json.error === false) {
                    openNotificationWithIcon(
                        bool,
                        "Testimonial",
                        "Testimonial Submitted",
                        "bottomLeft"
                    );
                }
            } else {
                openNotificationWithIcon(
                    "error",
                    "Testimonial",
                    "Testimonial Submission failed",
                    "bottomLeft"
                );
            }
        } catch (error) {
            openNotificationWithIcon("error", "Testimonial", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
        }
    }

    async function StatusFn(values, bool) {
        try {
            if (bool === "success") {
                const customConfig = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const respose = await axios.get(
                    `${host}/api/consultation/status/${values.user.phone}`,
                    customConfig
                );
                const json = await respose.data;

                if (json.error === "false") {
                    Data.bookingData = json.Data[0];
                    navigate('/Status');
                    openNotificationWithIcon( bool, "Consultation Status", "We Got Your Status", "bottomLeft" );
                } else {
                    openNotificationWithIcon( "error", "Consultation Status", json.msg , "bottomLeft");
                }
            } else {
                openNotificationWithIcon( "error", "Consultation Status", "Validation Error", "bottomLeft");
            }
        } catch (error) {
            openNotificationWithIcon("error", "Consultation Status", error.response.data ? error.response.data : "Server Error", "bottomLeft");
        }
    }

    return (
        <Data.Provider
            value={{ get_Doctor, Doctor, Treatments, get_Treatments, ConsultationFn , StatusFn , get_Testimonials , Testimonials , TestimonialsFn , get_blog , Blog }}>
            {props.children}
        </Data.Provider>
    )
}

export default DATA;