import React, { useContext } from 'react'
import DATA from '../Context/DATA/data_context'
import { Button, Form, Input, InputNumber } from 'antd';

function Consultation(props) {

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
        ConsultationFn(values , "success");
    };
    const onBookingFinishFailed = (values) => {
        ConsultationFn(values, "error")
    };


    return (
        <>

            <Form {...layout} name="nest-messages" onFinish={onBookingFinish} onFinishFailed={onBookingFinishFailed} style={{ maxWidth: 600, minWidth:100 }}
                validateMessages={validateMessages}>
                <Form.Item name={['user', 'name' ]} label="Name" rules={[ { required: true, }, ]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'email' ]} label="Email" rules={[ { type: 'email' , }, ]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'phone' ]} label="Phone" rules={[ { type:'number' , min: 100000000, max: 9999999999, required: true, }, ]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={['user', 'age' ]} label="Age" rules={[ { type: 'number' , min: 0, max: 99, required: true, }, ]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={['user', 'introduction' ]} label="Introduction" rules={[ { required: true, }, ]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8, }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </>
    )
}

export default Consultation