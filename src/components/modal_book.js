import React, { useState, useContext } from 'react'
import { Button, Modal, Form, Input, InputNumber } from 'antd';
import DATA from '../Context/DATA/data_context'

function Modal_Screen(props) {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
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
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */

    const onBookingFinish = (values) => {
        if (props.service) {
            values.service = props.service;
        }
        ConsultationFn(values, "success");
    };
    const onBookingFinishFailed = (values) => {
        ConsultationFn(values, "error")
    };

    return (
        <>
            <Button type="primary" onClick={showModal} className='bg-sky-800 h-10 text-slate-50 w-36'>
                Book Consultation
            </Button>
            <Modal title="BOOK AN APPOINTMENT" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel} footer={null} >
                <Form {...layout} name="nest-messages" onFinish={onBookingFinish} onFinishFailed={onBookingFinishFailed} style={{ maxWidth: 600 }}
                    validateMessages={validateMessages}>
                    <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true, },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'phone']} label="Phone" rules={[{ type: 'number', required: true, },]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99, required: true, },]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Introduction">
                        <Input.TextArea />
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