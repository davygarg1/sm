import React, { useContext , useEffect } from 'react'
import DATA from '../Context/DATA/data_context'
import { useNavigate } from "react-router-dom";

function Doctor() {

    let navigate = useNavigate();
    const Contextdata = useContext(DATA);
    const { get_staff , staff } = Contextdata;

    useEffect(() => {
        get_staff();
    }, [ navigate ]);


    return (
        <div>Doctor</div>
    )
}

export default Doctor