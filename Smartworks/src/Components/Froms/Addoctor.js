import React, { useContext } from 'react'
import API from '../../Context/API/api_context'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, TreeSelect } from 'antd';

function Addoctor(props) {

	const Contextdata = useContext(API);
	const { Addoctor } = Contextdata;
	const { handleCancel, handleOk } = props;

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
		Addoctor(values, "success");

	};
	const onBookingFinishFailed = (values) => {
		Addoctor(values, "error")
	};

	const data = [
		{
			title: 'Active',
			value: true,
		},
		{
			title: 'Inactive',
			value: false,
		},
	]


	return (
		<Form {...layout} className='mt-8' name="nest-messages" onFinish={onBookingFinish} onFinishFailed={onBookingFinishFailed} style={{ maxWidth: 400 }}
			validateMessages={validateMessages}>

			<Form.Item name='name' label="Name" rules={[{ required: true, },]}>
				<Input placeholder="Enter Your Name" type='string' />
			</Form.Item>

			<Form.Item name='email' label="E-mail" rules={[{ required: true, type: 'email', },]}>
				<Input placeholder="Enter Your E-mail" type='string' />
			</Form.Item>

			<Form.Item name='phone' label="Phone" rules={[{ required: true, type: 'number', min: 1000000000, },]}>
				<InputNumber placeholder="Enter Your Phone" style={{ width: '100%' }} maxLength={10} />
			</Form.Item>

			<Form.Item name='star' label="Stars" rules={[{ required: true, type: 'number', min: 1, max: 5, },]}>
				<InputNumber placeholder="Enter Star Rating" style={{ width: '100%' }} maxLength={1} />
			</Form.Item>

			<Form.Item name='experience' label="Experience" rules={[{ required: true, type: 'number', min: 1, max: 10, },]}>
				<InputNumber placeholder="Enter Experience" style={{ width: '100%' }} maxLength={2} />
			</Form.Item>

			<Form.Item name='study' label="Study" rules={[{ required: true, },]}>
				<Input placeholder="Enter Study" type='string' />
			</Form.Item>

			<Form.Item name='url' label="Pic Name" rules={[{ required: true, },]}>
				<Input placeholder="Enter name in small caps" type='string' />
			</Form.Item>

			<Form.Item name='status' label="Status" rules={[{ required: true, },]}>
				<TreeSelect treeData={data} placeholder="Select Status" />
			</Form.Item>

			<Form.Item name='description' label="Description" rules={[{ required: true, },]}>
				<Input.TextArea placeholder='Enter your Description'/>
			</Form.Item>

			<Form.Item name="password" label="Password" tooltip={{ title: 'Secure password', icon: <InfoCircleOutlined />, }} rules={[ { required: true, message: 'Please input your password!' , }, ]}
				hasFeedback>
				<Input.Password placeholder='Enter your Password'/>
			</Form.Item>

			<Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback tooltip={{ title: 'Secure password', icon: <InfoCircleOutlined />, }} rules={[ { required: true,
				message: 'Please confirm your password!' , }, ({ getFieldValue })=> ({
				validator(_, value) {  if (!value || getFieldValue('password') === value) { return Promise.resolve(); }
				return Promise.reject(new Error('The new password that you entered do not match!')); }, }), ]} >
				<Input.Password placeholder='Confirm Password'/>
			</Form.Item>


			<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8, }}>
				<Button key="back" onClick={handleCancel} classNames='bg-sky-800 text-slate-50 w-24'> Return </Button>
				<Button type="primary" htmlType="submit" onClick={handleOk} className='bg-sky-800 ml-6 text-slate-50 w-24'> Submit </Button>
			</Form.Item>

		</Form>
	)
}

export default Addoctor