import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import axios from "axios";
import Api from "./api_context";

function API(props) {

	let navigate = useNavigate();
	const [api, contextHolder] = notification.useNotification();
	const AlertData = [api, contextHolder];
	const host = 'https://api.samarpitam.com';
	const [UserData, setUserData] = useState({});

	//  openNotificationWithIcon take four types success info warning error

	const openNotificationWithIcon = (type, Title, des, placement) => {
		api[type]({
			message: Title,
			description: des,
			placement,
		});
	};

	async function RegisterFn(values, bool) {
		try {
			if (bool === "success") {

				//  checking not req fileds

				const { Name , Phone , Email , DOB , Password } = values;
				const NewUser = {"name":Name , "phone":Phone , "password":Password };

				const date = new Date(DOB);
                const options = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                };
                const localizedDateString = date.toLocaleDateString(undefined, options);
                NewUser.DOB = localizedDateString;
				if(Email){NewUser.email = Email.toLowerCase() };
				if(DOB){NewUser.DOB = DOB };
				console.log(NewUser);

				const customConfig = {
					headers: {
						"Content-Type": "application/json",
					},
				};

				const respose = await axios.post(
					`${host}/api/auth/Register`,
					NewUser,
					customConfig
				);
				const json = await respose.data;

				if (json.error === "false") {
					localStorage.setItem('token', json.token);
					openNotificationWithIcon(
						bool,
						"Register",
						"Register succesfully",
						"bottomLeft"
					);
					setTimeout(() => {
						FetchUserFn();
						navigate("/");
					}, 1000);
				}
			} else {
				openNotificationWithIcon(
					"error",
					"Register",
					"Register failed",
					"bottomLeft"
				);
			}
		} catch (error) {
			openNotificationWithIcon("error","Register",error.response.data.msg ? error.response.data.msg : "Server Error","bottomLeft");
		}
	}

	async function LoginFn(values, bool) {
		try {
			if (bool === "success") {

				var data = {
					phone: values.Phone,
					password: values.Password,
				};

				const customConfig = {
					headers: { "Content-Type": "application/json" },
				};

				const respose = await axios.post(
					`${host}/api/auth/Login`,
					data,
					customConfig
				);
				const json = await respose.data;

				if (json.error === "false") {
					localStorage.setItem("token", json.token);
					openNotificationWithIcon(
						bool,
						"Login",
						"Login succesfull",
						"bottomLeft"
					);
					setTimeout(() => {
						FetchUserFn();
						navigate("/");
					}, 1000);
					
				}
			} else {
				openNotificationWithIcon(
					"error",
					"Login",
					"Login failed",
					"bottomLeft"
				);
			}
		} catch (error) {
			openNotificationWithIcon(
				"error",
				"Login",
				error.response.data.msg,
				"bottomLeft"
			);
		}
	}

	async function LogoutFn() {
		try {
			localStorage.clear();
			navigate("/");
			openNotificationWithIcon(
				"success",
				"LogOut",
				"LogOut Succesfully",
				"bottomLeft"
			);
		} catch (error) {
			openNotificationWithIcon(
				"error",
				"LogOut",
				"error in LogOut",
				"bottomLeft"
			);
		}
	}

	async function FetchUserFn() {
		try {
			if (localStorage.getItem("token")) {

				const customConfig = {
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem("token"),
					},
				};

				const respose = await axios.get(
					`${host}/api/auth/authication`,
					customConfig
				);
				const json = await respose.data;

				if (json.error === "false") {
					localStorage.setItem("user", json.user.name);
					localStorage.setItem("user_id", json.user._id);
					setUserData(json.user);
				}
			}
		} catch (error) {
			setUserData({});
			localStorage.clear();
		}
	}

	return (
		<Api.Provider value={{RegisterFn , LoginFn, LogoutFn, FetchUserFn, AlertData , UserData , openNotificationWithIcon }}>
			{props.children}
		</Api.Provider>
	);
}

export default API;
