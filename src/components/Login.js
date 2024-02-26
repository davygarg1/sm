import React, { useContext, useState, useEffect } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox } from 'antd';
import API from '../Context/API/api_context'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from '../Assets/Images/Logo.png'
import { Carousel } from 'antd';

function Login(props) {

    let navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('token')) {
            navigate('/');
        }

    }, [navigate]);

    const Contextdata = useContext(API);
    const { AlertData, LoginFn } = Contextdata;
    const [api, contextHolder] = AlertData;

    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const onLoginFinish = (values) => {
        LoginFn(values, "success")
    };
    const onLoginFinishFailed = (values) => {
        LoginFn(values, "error")
    };

    return (
        <>

            <div className="w-screen h-screen flex items-center justify-center overflow-x-hidden">

                <div className='h-full w-full flex items-center justify-center'>

                    <div className='w-0 h-0 md:w-3/6 md:h-full overflow-hidden' style={{ "boxShadow": "0px 0px 50px #000000" }}>


                        <Carousel autoplay>
                            <div className="w-full h-full">
                                <img src='https://media.istockphoto.com/id/1305901206/vector/world-health-day-lettering-stethoscope-and-heart-shape.jpg?s=612x612&w=0&k=20&c=DrE4GB7ulmu7FXGaYvZuQOcptEa-NKEQsG1IVcyJ8IY=' className="object-fill w-full h-full" alt="" />
                            </div>
                            <div className="w-full h-full">
                                <img src='https://thumbs.dreamstime.com/z/young-woman-doctor-blank-banner-attractive-female-put-her-hands-points-place-text-32632453.jpg?w=450' className="object-fill w-full h-full" alt="" />
                            </div>
                            <div className="w-full h-full">
                                <img src='https://thumbs.dreamstime.com/z/beautiful-successful-nurse-doctor-healthcare-workers-38296718.jpg?w=400' className="object-fill w-full h-full" alt="" />
                            </div>
                            <div className="w-full h-full">
                                <img src={Logo} className="object-cover w-[90%] h-[90%]" alt="" />
                            </div>
                        </Carousel>

                    </div>

                    <div className='border-2 w-[80%] h-[35rem] md:h-full md:w-3/6 border-808080 flex flex-col items-center justify-center bg-white overflow-y-hidden' style={{ "boxShadow": "0px 0px 50px #000000" }}>

                        <div className='w-full overflow-y-scroll p-10 md:px-20' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                            <h1 className='font-bold mb-12 mt-2 font-mono'>Welcome Back</h1>

                            <Form className='w-68 h-68 overflow-hidden' form={form} layout="vertical" initialValues={{ requiredMarkValue: requiredMark, remember: true, }}
                                onValuesChange={onRequiredTypeChange} requiredMark={requiredMark} onFinish={onLoginFinish} onFinishFailed={onLoginFinishFailed} autoComplete="off">

                                <Form.Item label="Phone" name="Phone" required tooltip="This is a required field" rules={[{ required: true, message: 'Please select your Phone!', },]}>
                                    <Input placeholder="input Your Phone" type='number' maxLength={10} />
                                </Form.Item>

                                <Form.Item label="Password" name="Password" required tooltip={{ title: 'Secure password', icon: <InfoCircleOutlined />, }} rules={[{ required: true, message: 'Please select your Password!', },]}>
                                    <Input.Password placeholder="input Your Password" />
                                </Form.Item>

                                <Form.Item name="remember" valuePropName="checked" >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className='bg-sky-800 h-8 text-slate-50' onClick={props.oncloseLoginDrawer} >Login</Button>
                                </Form.Item>

                            </Form>

                            <h1 className='mt-6 mb-2'>New user <Link to={'/Register'} className='text-blue-600'>signup</Link></h1>

                        </div>

                    </div>

                </div>

                {contextHolder}

            </div>

        </>
    )
}

export default Login