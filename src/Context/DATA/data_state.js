import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Data from './data_context'
import axios from "axios";
import API from "../API/api_context";

function DATA(props) {

    let navigate = useNavigate();
    const [staff, setstaff] = useState({});
    const [Services, setServices] = useState({});
    const host = "http://localhost:5000";
    const Contextdata = useContext(API);
    const { openNotificationWithIcon } = Contextdata;

    async function get_staff() {
        try {
            const customConfig = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const respose = await axios.get(
                `${host}/api/Data/staff`,
                customConfig
            );
            const json = await respose.data;
            setstaff(json);

        } catch (error) {
            navigate("/");
            openNotificationWithIcon("error", "Doctor", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
        }
    }

    async function get_services() {
        try {
            const customConfig = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const respose = await axios.get(
                `${host}/api/Data/services`,
                customConfig
            );
            const json = await respose.data;
            setServices(json);

        } catch (error) {
            navigate("/");
            openNotificationWithIcon("error", "Services", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
        }
    }

    async function ConsultationFn(values, bool) {
        try {
            if (bool === "success") {

                //  checking not req fileds

                const { name, phone, email, age, service } = values.user;
                const booking_details = { name, phone,age };
                if (email) { booking_details.email = email.toLowerCase() };
                if (service) { booking_details.service = service };
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
                    // navigate('/status');
                    openNotificationWithIcon( bool, "Consultation Status", "Status got it", "bottomLeft" );
                } else {
                    openNotificationWithIcon( "error", "Consultation Status", json.msg , "bottomLeft");
                }
            } else {
                openNotificationWithIcon( "error", "Consultation Status", "Validation Error", "bottomLeft");
            }
        } catch (error) {
            openNotificationWithIcon("error", "Consultation Status", error.response.data.msg ? error.response.data.msg : "Server Error", "bottomLeft");
        }
    }

    return (
        <Data.Provider
            value={{ get_staff, staff, Services, get_services, ConsultationFn , StatusFn }}>
            {props.children}
        </Data.Provider>
    )
}

export default DATA;