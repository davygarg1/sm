import React, { useContext, useState , useEffect } from 'react'
import API from '../Context/API/api_context'
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons'
import { Link, useNavigate } from "react-router-dom";

function Navbarcom(props) {

	const Contextdata = useContext(API);
	const { EditProfilepwd, AlertData, LogoutFn } = Contextdata;
	const [api, contextHolder] = AlertData;
	let navigate = useNavigate();
	
	useEffect(() => {
		if(!localStorage.getItem("token")){
			navigate('/Login')
		}	
	}, [ navigate ]);

	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const toggleProfile = () => {
		props.setaside(false);
		setIsProfileOpen(!isProfileOpen);
	};

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
		EditProfilepwd(values, "success");

	};
	const onBookingFinishFailed = (values) => {
		EditProfilepwd(values, "error")
	};

	return (
		<>
			<nav className="border-gray-200 bg-gray-900 fixed top-0 w-screen z-20">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<Link href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
						<img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"></img>
						<span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
							SmartWorks
						</span>
					</Link>
					<div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

					{localStorage.getItem("token") ?

						<>


						<button type="button" onClick={toggleProfile}
							className="flex justify-center items-center text-sm bg-white border-2 border-solid border-black w-8 h-8 md:mt-0 mt-[3px]  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
							id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
							data-dropdown-placement="bottom">
							<span className="sr-only">Open user menu</span>
							<UserOutlined className="scale-150" />
							{/* <image className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg"
							alt="user photo"></image> */}
						</button>

						<div className={`my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow fixed
						md:right-24 right-0 top-12 m-0 ${isProfileOpen ? "block" : "hidden"}`} id="user-dropdown">


							<div onClick={showModal} className="px-4 py-3 hover:bg-blue-700 hover:text-white cursor-pointer">
								<span className="block text-lg">
									{localStorage.getItem("user")
										? localStorage.getItem("user").toUpperCase()
										: "Hello"}
								</span>
								<span className="block text-sm">welcome</span>
							</div>
							<ul className="py-2" aria-labelledby="user-menu-button">
								<li>
									<Link to="/"
										className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-white">
										Dashboard
									</Link>
								</li>
								<li>
									<Link to="/" onClick={() => LogoutFn()}
										className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600  hover:text-white">
										Sign out
									</Link>
								</li>
							</ul>
						</div>
						</>

						:

						<button type="button" className="text-white bg-sky-800 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:px-4" onClick={() => navigate("/Login")}>Log IN</button>
						
						}

						<button data-collapse-toggle="navbar-user" type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							onClick={() => props.setaside(!props.aside)}
						>
							<span className="sr-only">Open main menu</span>
							<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
								viewBox="0 0 17 14">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15" />
							</svg>
						</button>
					</div>
				</div>

				<Modal title={"Change Password"} open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel} footer={null} >

				If you encounter any issues or need assistance, please don't hesitate to reach out to us.

					<Form {...layout} className='mt-8' name="nest-messages" onFinish={onBookingFinish} onFinishFailed={onBookingFinishFailed} style={{ maxWidth: 400 }}
						validateMessages={validateMessages}>

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
				</Modal>
			</nav>
			{contextHolder}
		</>
	);
}

export default Navbarcom;
