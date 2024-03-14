import React, { useContext , useEffect } from 'react'
import DATA from '../Context/DATA/data_context'
import { useNavigate } from "react-router-dom";
import { Row } from 'antd';
import ListServices from './ListServices';


function Services({openModal}) {

    let navigate = useNavigate();
    const Contextdata = useContext(DATA);
    const { Treatments , get_Treatments } = Contextdata;

    useEffect(() => {
        get_Treatments();
    }, [ navigate ]);

    return (
        <>
        <div className='w-screen h-auto p-4 flex items-center justify-center'>
        <div className='h-auto md:w-5/6 mx-4 bg-white rounded-2xl md:p-12 p-6' style={{ "boxShadow": "0px 0px 15px 2px #A19F9E" }}>
             <Row gutter={[36, 36]} justify="space-around" align="middle">
                <ListServices  Data={Treatments} openModal={openModal}></ListServices>
            </Row>
        </div>
        </div>
        </>
    )
}

export default Services