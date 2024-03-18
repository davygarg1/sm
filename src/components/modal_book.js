import React, { useState, useContext } from 'react'
import { Button, Modal, Form, Input, InputNumber, DatePicker, Checkbox } from 'antd';
import DATA from '../Context/DATA/data_context'
import { RightOutlined } from '@ant-design/icons'


function Modal_Screen(props) {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { visible, closeModal, selectedService , Footer } = props;
    const title = `BOOK AN APPOINTMENT ${selectedService? `FOR ${selectedService.name.toUpperCase()} PROBLEM` : ""}`;

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
        Footer ? setOpen(false) : closeModal();
        setOpen(false);
    };

    const Contextdata = useContext(DATA);
    const { ConsultationFn } = Contextdata;

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'Please enter valid E-mail!',
            number: 'Please enter valid number!',
        },
        number: {
            min: 'Please enter vaild ${label}!',
        },
    };
    /* eslint-enable no-template-curly-in-string */

    const onBookingFinish = (values) => {
        if (props.service) {
            values.service = props.service;
        }
        values.service = selectedService ?._id ;
        ConsultationFn(values, "success");
        
    };
    const onBookingFinishFailed = (values) => {
        values.service = selectedService ?._id ;
        ConsultationFn(values, "error")
    };

    return (
        <>
            <Button type="primary" onClick={showModal} className='bg-sky-800 text-slate-50 w-36 h-10 flex items-center'>
                <span>Talk to Doctor</span>
                <RightOutlined />
            </Button>
            <Modal title={title} open={open ? open : visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel} footer={null} >
                <Form {...layout} className='mt-8' name="nest-messages" onFinish={onBookingFinish} onFinishFailed={onBookingFinishFailed} style={{ maxWidth: 400 }}
                    validateMessages={validateMessages}>

                    <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true, },]}>
                        <Input placeholder="Enter Your Name" type='string' />
                    </Form.Item>

                    <Form.Item name={['user', 'email']} label="E-mail" rules={[{ type: 'email', },]}>
                        <Input placeholder="Enter Your E-mail" type='string' />
                    </Form.Item>

                    <Form.Item name={['user', 'phone']} label="Phone" rules={[{ type: 'number', min: 1000000000, required: true, },]}>
                        <InputNumber placeholder="Enter Your Phone" style={{ width: '100%' }} maxLength={10} />
                    </Form.Item>

                    <Form.Item name={['user', 'dob']} label="DOB" rules={[{ type: 'date', required: true, },]}>
                        <DatePicker placeholder="Selet Your DOB" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name={['user', 'massage']} label="Message">
                        <Input.TextArea placeholder='Enter your Message'/>
                    </Form.Item>

                    <Form.Item name={['user', 'check']} valuePropName="checked" rules={[{ type: Checkbox, required: true, },]}>
                            <Checkbox style={{ width: '100%' }}>I Agree with Terms and Conditions</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8, }}>
                        <Button key="back" onClick={handleCancel} classNames='bg-sky-800 text-slate-50 w-24'> Return </Button>
                        <Button type="primary" htmlType="submit" onClick={handleOk} className='bg-sky-800 ml-6 text-slate-50 w-24'> Submit </Button>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}

export default Modal_Screen