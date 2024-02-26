import React, { useContext , useEffect } from 'react'
import DATA from '../Context/DATA/data_context'
import { useNavigate } from "react-router-dom";

function Services() {

    let navigate = useNavigate();
    const Contextdata = useContext(DATA);
    const { Services , get_services } = Contextdata;

    useEffect(() => {
        get_services();
    }, [ navigate ]);


    return (
        <div>Services</div>
    )
}

export default Services