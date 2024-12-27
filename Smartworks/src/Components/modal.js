import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import { useLocation } from "react-router-dom";
import Doctor from './Froms/Doctor'
import Client from './Froms/Client'
import Addoctor from './Froms/Addoctor'
import SendInvoice from './Froms/SendInvoice'

function Modal_Screen(props) {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visible, setvisible] = useState(false);
    let location = useLocation();
    const type = location.pathname.toUpperCase().replace("/", "");
    const title = props.Addoctor ? `ADD ${type}` : `UPDATE ${type}`;

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 1000);
    };
    const handleCancel = () => {
        setOpen(false);
        setvisible(false);
    };

    return (
        <>
            <Button onClick={showModal} className='bg-sky-800 w-20 text-slate-50 md:ml-4 md:mt-0' type="primary">{ props.Addoctor ? 'ADD' : props.SendInvoice ? 'Invoice' : 'Update' }</Button>
            <Modal title={title} open={open ? open : visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel} footer={null} >
                {type === "DOCTORS" && !props.Addoctor ? <Doctor handleOk={handleOk} id={props.id} handleCancel={handleCancel} /> : type === "DOCTORS" && <Addoctor handleOk={handleOk} handleCancel={handleCancel} />}
                {type === "CLIENTS" && !props.SendInvoice ? <Client handleOk={handleOk} id={props.id} handleCancel={handleCancel} /> : type === "CLIENTS" && <SendInvoice id={props.id} email={props.email} handleOk={handleOk} handleCancel={handleCancel} /> }
            </Modal>
        </>
    )
}

export default Modal_Screen