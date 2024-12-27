import React, { useContext } from 'react'
import API from '../../Context/API/api_context'
import { Button, Form, Input, TreeSelect } from 'antd';

function Category(props) {

    const { handleCancel, handleOk, id } = props;
    const Contextdata = useContext(API);
    const { EditDoctor } = Contextdata;

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
        EditDoctor(values, "success", id);
        
    };
    const onBookingFinishFailed = (values) => {
        EditDoctor(values, "error" , id)
    };

    const data = [
        {
            title: 'ACTIVE',
            value: true
        },
        {
            title: 'INACTIVE',
            value: false
        }
      ]

  return (
    <Form {...layout} className='mt-8' name="nest-messages" onFinish={onBookingFinish} onFinishFailed={onBookingFinishFailed} style={{ maxWidth: 400 }}
    validateMessages={validateMessages}>

    <Form.Item name={['user', 'Name']} label="Name">
        <Input placeholder="Enter Your Name" type='string' />
    </Form.Item>

    <Form.Item name={['user', 'description']} label="Description" >
        <Input placeholder="Enter Your Description" type='string' />
    </Form.Item>
    
    <Form.Item name={['user', 'Status']} label="Status" rules={[{ required: true, },]}>
        <TreeSelect treeData={data} placeholder="Select Status" />
    </Form.Item>


    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8, }}>
        <Button key="back" onClick={handleCancel} classNames='bg-sky-800 text-slate-50 w-24'> Return </Button>
        <Button type="primary" htmlType="submit" onClick={handleOk} className='bg-sky-800 ml-6 text-slate-50 w-24'> Submit </Button>
    </Form.Item>

</Form>
  )
}

export default Category