import React from 'react';
import { Col } from 'antd';

function ListServices({ Data , openModal }) {

  return (
      <>
        {(Data.error === "false" && Data.Treatments.map((Treatment) =>

          <Col key={Treatment.id} span={12} md={12} lg={8} xl={6} xxl={4}>
            <div className='cursor-pointer w-auto h-auto p-2 rounded-lg flex justify-center items-center flex-col hover:underline' onClick={() => openModal(Treatment)}>
                <div className="w-16 h-16 mb-2"><img src={Treatment.url} alt="Brain" /></div>
                <p className='text-sm font-medium'>{Treatment.name.toUpperCase()}</p>
            </div>
          </Col>
        ))
          ||
          (
            <div className="container my-5">
              <h2>Services</h2>
            </div>
          )
        }
      </>
  );
}

export default ListServices;
