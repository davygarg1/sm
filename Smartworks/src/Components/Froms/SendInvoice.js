import React, { useContext, useState } from 'react'
import API from '../../Context/API/api_context'
import { Button, Form, Input, InputNumber, TreeSelect, DatePicker } from 'antd';

function Client(props) {

    const Contextdata = useContext(API);
    const { Sendinvoice } = Contextdata;
    const { handleCancel, handleOk, id, email } = props;
    const [Value, setValue] = useState();

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
        Sendinvoice(values, "success", id);

    };
    const onBookingFinishFailed = (values) => {
        Sendinvoice(values, "error", id)
    };

    const onChange = (newValue) => {
        setValue(newValue);
    };


    return (
        <Form {...layout} className='mt-8' name="nest-messages" onFinish={onBookingFinish} onFinishFailed={onBookingFinishFailed} style={{ maxWidth: 400 }}
            validateMessages={validateMessages} initialValues={{ user: { email } }} >

            <Form.Item name={['user', 'email']} label="E-mail" rules={[{ type: 'email', required: true },]}>
                <Input placeholder="Enter additional E-mail" type='string' />
            </Form.Item>

            <Form.Item name={['user', 'treatment']} label="Treatment" rules={[{type: 'string', required: true}]}>
                <Input placeholder="Enter Treatment Provide" type='string' />
            </Form.Item>

            <Form.Item name={['user', 'address']} label="Address" rules={[{type: 'string', required: true}]}>
                <Input placeholder="Enter Address" type='string' />
            </Form.Item>

            <Form.Item name={['user', 'payment']} label="Payment Mode" rules={[{type: 'string', required: true}]}>
                <Input placeholder="Enter Payment Mode" type='string' />
            </Form.Item>

            <Form.Item name={['user', 'amount']} label="Amount" rules={[{ type: 'number', min: 1, required: true },]}>
                <InputNumber placeholder="Enter Amount" style={{ width: '100%' }} maxLength={10} />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8, }}>
                <Button key="back" onClick={handleCancel} classNames='bg-sky-800 text-slate-50 w-24'> Return </Button>
                <Button type="primary" htmlType="submit" onClick={handleOk} className='bg-sky-800 ml-6 text-slate-50 w-24'> Submit </Button>
            </Form.Item>

        </Form>
    )
}

export default Client