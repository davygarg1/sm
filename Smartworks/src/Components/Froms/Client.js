import React, { useContext , useState } from 'react'
import API from '../../Context/API/api_context'
import { Button, Form, Input, InputNumber, TreeSelect , DatePicker } from 'antd';

function Client(props) {

    const Contextdata = useContext(API);
    const { Editclient } = Contextdata;
    const { handleCancel, handleOk , id } = props;
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
        Editclient(values, "success", id);
        
    };
    const onBookingFinishFailed = (values) => {
        Editclient(values, "error", id)
    };

    const data = [
        {
            title: 'booking intialized',
            value: '1',
        },
        {
            title: 'Payment Received',
            value: '2',
        },
        {
            title: 'Slot confirmed',
            value: '3',
        },
        {
            title: 'Consultations completed',
            value: '4',
        },
    ]

    const onChange = (newValue) => {
        setValue(newValue);
      };


  return (
    <Form {...layout} className='mt-8' name="nest-messages" onFinish={onBookingFinish} onFinishFailed={onBookingFinishFailed} style={{ maxWidth: 400 }}
    validateMessages={validateMessages}>

    <Form.Item name={['user', 'name']} label="Name" >
        <Input placeholder="Enter Your Name" type='string' />
    </Form.Item>

    <Form.Item name={['user', 'email']} label="E-mail" rules={[{ type: 'email', },]}>
        <Input placeholder="Enter Your E-mail" type='string' />
    </Form.Item>

    <Form.Item name={['user', 'phone']} label="Phone" rules={[{ type: 'number', min: 1000000000, },]}>
        <InputNumber placeholder="Enter Your Phone" style={{ width: '100%' }} maxLength={10} />
    </Form.Item>

    <Form.Item name={['user', 'treatment']} label="Req Treatment" >
        <Input placeholder="Enter Treatment" type='string' />
    </Form.Item>

    { Value == '3' ? <>
    
    <Form.Item name={['user', 'slot']} label="SLOT" rules={[{ type: 'date', required: true, },]}>
        <DatePicker showTime needConfirm={false} />
    </Form.Item>

    </> : ""
    
    }

    <Form.Item name={['user', 'Status']} label="Status" rules={[{ required: true, },]}>
        <TreeSelect treeData={data} onChange={onChange} placeholder="Select Status" />
    </Form.Item>


    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8, }}>
        <Button key="back" onClick={handleCancel} classNames='bg-sky-800 text-slate-50 w-24'> Return </Button>
        <Button type="primary" htmlType="submit" onClick={handleOk} className='bg-sky-800 ml-6 text-slate-50 w-24'> Submit </Button>
    </Form.Item>

</Form>
  )
}

export default Client