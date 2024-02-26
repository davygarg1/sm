import React from 'react'
import ModalScreen from './modal_book'
import ModalStatus from './modal_status'

function Dashboard() {

  return (
    <>
      <div className="w-screen h-screen text-3xl font-bold flex justify-center items-center">
        <div>
        Samarpitam <br />  
      <ModalScreen /> <br />
      <ModalStatus />
      </div>
      </div>
    </>
  );
}

export default Dashboard;
